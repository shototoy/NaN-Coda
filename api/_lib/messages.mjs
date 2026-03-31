import crypto from 'node:crypto'
import fsPromises from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { del, get, list, put } from '@vercel/blob'

const blobMessagesPrefix = 'messages/'
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const dataDir = path.join(rootDir, 'data')
const messagesFile = path.join(dataDir, 'messages.json')
let writeQueue = Promise.resolve()

function getBlobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN
}

export function isBlobStorageEnabled() {
  return Boolean(getBlobToken())
}

export function getMessageStorageInfo() {
  if (isBlobStorageEnabled()) {
    return {
      label: 'Private Vercel Blob',
      description: 'Each submission is stored as its own private JSON blob behind admin auth.',
    }
  }

  return {
    label: 'Protected JSON (local)',
    description: 'Messages are stored in the local JSON file for local development.',
  }
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function createBlobPathname(messageId) {
  return `${blobMessagesPrefix}${messageId}.json`
}

async function ensureMessagesFile() {
  await fsPromises.mkdir(dataDir, { recursive: true })

  try {
    await fsPromises.access(messagesFile)
  } catch (error) {
    await fsPromises.writeFile(messagesFile, '[]\n', 'utf8')
  }
}

async function readLocalMessages() {
  await ensureMessagesFile()
  const raw = await fsPromises.readFile(messagesFile, 'utf8')

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    return []
  }
}

function queueLocalWrite(task) {
  writeQueue = writeQueue.then(task, task)
  return writeQueue
}

async function appendLocalMessage(message) {
  return queueLocalWrite(async () => {
    const messages = await readLocalMessages()
    messages.unshift(message)
    await fsPromises.writeFile(messagesFile, `${JSON.stringify(messages, null, 2)}\n`, 'utf8')
  })
}

async function deleteLocalMessage(messageId) {
  return queueLocalWrite(async () => {
    const messages = await readLocalMessages()
    const nextMessages = messages.filter((message) => message.id !== messageId)
    const deleted = nextMessages.length !== messages.length

    if (deleted) {
      await fsPromises.writeFile(messagesFile, `${JSON.stringify(nextMessages, null, 2)}\n`, 'utf8')
    }

    return deleted
  })
}

async function listPrivateMessageBlobs() {
  const blobs = []
  let cursor

  while (true) {
    const page = await list({
      prefix: blobMessagesPrefix,
      token: getBlobToken(),
      ...(cursor ? { cursor } : {}),
    })

    blobs.push(...(page.blobs || []))

    if (!page.hasMore || !page.cursor) {
      break
    }

    cursor = page.cursor
  }

  return blobs
}

async function readPrivateMessageBlob(blob) {
  const details = await get(blob.pathname, {
    access: 'private',
    token: getBlobToken(),
  })

  if (!details?.stream) {
    return null
  }

  const parsed = await new Response(details.stream).json()

  if (!parsed || typeof parsed !== 'object') {
    return null
  }

  return {
    ...parsed,
    submittedAt: parsed.submittedAt || blob.uploadedAt || new Date().toISOString(),
  }
}

function sortMessagesNewestFirst(left, right) {
  const leftTime = Date.parse(left?.submittedAt || '') || 0
  const rightTime = Date.parse(right?.submittedAt || '') || 0
  return rightTime - leftTime
}

async function readBlobMessages() {
  const blobs = await listPrivateMessageBlobs()
  const results = await Promise.allSettled(blobs.map((blob) => readPrivateMessageBlob(blob)))

  return results
    .filter((result) => result.status === 'fulfilled' && result.value)
    .map((result) => result.value)
    .sort(sortMessagesNewestFirst)
}

async function saveBlobMessage(message) {
  await put(createBlobPathname(message.id), JSON.stringify(message, null, 2), {
    access: 'private',
    addRandomSuffix: false,
    contentType: 'application/json',
    token: getBlobToken(),
  })
}

async function deleteBlobMessage(messageId) {
  const pathname = createBlobPathname(messageId)
  const page = await list({
    prefix: pathname,
    token: getBlobToken(),
  })

  const exists = (page.blobs || []).some((blob) => blob.pathname === pathname)

  if (!exists) {
    return false
  }

  await del(pathname, { token: getBlobToken() })
  return true
}

export function createMessage(payload, normalizeField) {
  return {
    id: crypto.randomUUID(),
    name: normalizeField(payload?.name, 120),
    email: normalizeField(payload?.email, 160).toLowerCase(),
    company: normalizeField(payload?.company, 160),
    message: normalizeField(payload?.message, 4000),
    submittedAt: new Date().toISOString(),
  }
}

export async function listMessages() {
  if (isBlobStorageEnabled()) {
    return readBlobMessages()
  }

  return readLocalMessages()
}

export async function saveMessage(message) {
  if (isBlobStorageEnabled()) {
    await saveBlobMessage(message)
    return
  }

  await appendLocalMessage(message)
}

export async function deleteMessage(messageId) {
  if (isBlobStorageEnabled()) {
    return deleteBlobMessage(messageId)
  }

  return deleteLocalMessage(messageId)
}
