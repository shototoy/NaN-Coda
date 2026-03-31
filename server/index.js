const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const express = require('express')
const crypto = require('crypto')
const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path')

dotenv.config({ quiet: true })

const app = express()
const rootDir = path.resolve(__dirname, '..')
const dataDir = path.join(rootDir, 'data')
const messagesFile = path.join(dataDir, 'messages.json')
const distDir = path.join(rootDir, 'dist')
const sessionCookieName = 'nan_coda_admin'
const sessionTtlMs = 1000 * 60 * 60 * 8
const runtimeMode =
  process.argv[2] === 'start' || process.env.NODE_ENV === 'production'
    ? 'production'
    : 'development'
const blobMessagesPrefix = 'messages/'
let writeQueue = Promise.resolve()
let blobSdkPromise = null

app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

function getEnvConfig() {
  return {
    adminUsername: process.env.ADMIN_USERNAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    sessionSecret: process.env.SESSION_SECRET,
    blobReadWriteToken: process.env.BLOB_READ_WRITE_TOKEN,
    port: Number(process.env.PORT || 3000),
    isProduction: runtimeMode === 'production',
  }
}

function isBlobStorageEnabled() {
  return Boolean(getEnvConfig().blobReadWriteToken)
}

function getMessageStorageInfo() {
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

async function getBlobSdk() {
  if (!blobSdkPromise) {
    blobSdkPromise = import('@vercel/blob')
  }

  return blobSdkPromise
}

function createBlobPathname(messageId) {
  return `${blobMessagesPrefix}${messageId}.json`
}

function safeCompare(left = '', right = '') {
  const leftBuffer = Buffer.from(String(left))
  const rightBuffer = Buffer.from(String(right))

  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer)
}

function signValue(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url')
}

function createSessionToken(username, secret) {
  const payload = {
    username,
    expiresAt: Date.now() + sessionTtlMs,
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = signValue(encodedPayload, secret)
  return `${encodedPayload}.${signature}`
}

function verifySessionToken(token, secret) {
  if (!token || !secret) {
    return null
  }

  const [encodedPayload, signature] = token.split('.')
  if (!encodedPayload || !signature) {
    return null
  }

  const expectedSignature = signValue(encodedPayload, secret)
  if (!safeCompare(signature, expectedSignature)) {
    return null
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'))
    if (!payload?.username || payload.expiresAt <= Date.now()) {
      return null
    }
    return payload
  } catch (error) {
    return null
  }
}

function validateServerConfig() {
  const { adminUsername, adminPassword, sessionSecret } = getEnvConfig()
  return Boolean(adminUsername && adminPassword && sessionSecret)
}

function setSessionCookie(res, username) {
  const { sessionSecret, isProduction } = getEnvConfig()
  const token = createSessionToken(username, sessionSecret)

  res.cookie(sessionCookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction,
    maxAge: sessionTtlMs,
    path: '/',
  })
}

function clearSessionCookie(res) {
  res.clearCookie(sessionCookieName, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  })
}

function getSessionFromRequest(req) {
  const { sessionSecret } = getEnvConfig()
  return verifySessionToken(req.cookies?.[sessionCookieName], sessionSecret)
}

function requireConfiguredServer(req, res, next) {
  if (!validateServerConfig()) {
    return res.status(500).json({
      message: 'Server is missing ADMIN_USERNAME, ADMIN_PASSWORD, or SESSION_SECRET.',
    })
  }

  return next()
}

function requireAuth(req, res, next) {
  const session = getSessionFromRequest(req)

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  req.adminSession = session
  return next()
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

function runLocalWrite(task) {
  writeQueue = writeQueue.then(task, task)
  return writeQueue
}

function appendLocalMessage(message) {
  return runLocalWrite(async () => {
    const messages = await readLocalMessages()
    messages.unshift(message)
    await fsPromises.writeFile(messagesFile, `${JSON.stringify(messages, null, 2)}\n`, 'utf8')
  })
}

function deleteLocalMessage(messageId) {
  return runLocalWrite(async () => {
    const messages = await readLocalMessages()
    const nextMessages = messages.filter((item) => item.id !== messageId)
    const deleted = nextMessages.length !== messages.length

    if (deleted) {
      await fsPromises.writeFile(messagesFile, `${JSON.stringify(nextMessages, null, 2)}\n`, 'utf8')
    }

    return deleted
  })
}

async function listPrivateMessageBlobs() {
  const { list } = await getBlobSdk()
  const blobs = []
  let cursor

  while (true) {
    const page = await list({
      prefix: blobMessagesPrefix,
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
  const { get } = await getBlobSdk()
  const details = await get(blob.pathname, { access: 'private' })

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
  const { put } = await getBlobSdk()
  await put(createBlobPathname(message.id), JSON.stringify(message, null, 2), {
    access: 'private',
    addRandomSuffix: false,
    contentType: 'application/json',
  })
}

async function privateMessageBlobExists(messageId) {
  const { list } = await getBlobSdk()
  const pathname = createBlobPathname(messageId)
  const page = await list({ prefix: pathname })
  return (page.blobs || []).some((blob) => blob.pathname === pathname)
}

async function deleteBlobMessage(messageId) {
  const exists = await privateMessageBlobExists(messageId)

  if (!exists) {
    return false
  }

  const { del } = await getBlobSdk()
  await del(createBlobPathname(messageId))
  return true
}

async function readMessages() {
  if (isBlobStorageEnabled()) {
    return readBlobMessages()
  }

  return readLocalMessages()
}

async function saveMessage(message) {
  if (isBlobStorageEnabled()) {
    await saveBlobMessage(message)
    return
  }

  await appendLocalMessage(message)
}

async function deleteMessage(messageId) {
  if (isBlobStorageEnabled()) {
    return deleteBlobMessage(messageId)
  }

  return deleteLocalMessage(messageId)
}

function normalizeField(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength)
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.get('/api/auth/session', requireConfiguredServer, (req, res) => {
  const session = getSessionFromRequest(req)

  if (!session) {
    return res.json({ authenticated: false })
  }

  return res.json({
    authenticated: true,
    username: session.username,
  })
})

app.post('/api/auth/login', requireConfiguredServer, async (req, res) => {
  const { adminUsername, adminPassword } = getEnvConfig()
  const username = normalizeField(req.body?.username, 120)
  const password = String(req.body?.password || '')

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' })
  }

  if (!safeCompare(username, adminUsername) || !safeCompare(password, adminPassword)) {
    return res.status(401).json({ message: 'Invalid credentials.' })
  }

  setSessionCookie(res, adminUsername)

  return res.json({
    message: 'Login successful.',
    username: adminUsername,
  })
})

app.post('/api/auth/logout', (req, res) => {
  clearSessionCookie(res)
  res.status(204).end()
})

app.post('/api/contact', async (req, res) => {
  const message = {
    id: crypto.randomUUID(),
    name: normalizeField(req.body?.name, 120),
    email: normalizeField(req.body?.email, 160).toLowerCase(),
    company: normalizeField(req.body?.company, 160),
    message: normalizeField(req.body?.message, 4000),
    submittedAt: new Date().toISOString(),
  }

  if (!message.name || !message.email || !message.message) {
    return res.status(400).json({ message: 'Please fill in all required fields.' })
  }

  if (!isValidEmail(message.email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' })
  }

  try {
    await saveMessage(message)
  } catch (error) {
    console.error('Failed to save message', error)
    return res.status(500).json({ message: 'Failed to store message.' })
  }

  return res.status(201).json({ message: 'Message sent successfully.' })
})

app.get('/api/admin/messages', requireConfiguredServer, requireAuth, async (req, res) => {
  try {
    const messages = await readMessages()
    const storage = getMessageStorageInfo()

    return res.json({
      messages,
      total: messages.length,
      storageLabel: storage.label,
      storageDescription: storage.description,
    })
  } catch (error) {
    console.error('Failed to load messages', error)
    return res.status(500).json({ message: 'Failed to load messages.' })
  }
})

app.delete('/api/admin/messages/:messageId', requireConfiguredServer, requireAuth, async (req, res) => {
  const messageId = normalizeField(req.params?.messageId, 120)

  if (!messageId) {
    return res.status(400).json({ message: 'Message ID is required.' })
  }

  try {
    const deleted = await deleteMessage(messageId)

    if (!deleted) {
      return res.status(404).json({ message: 'Message not found.' })
    }

    return res.status(204).end()
  } catch (error) {
    console.error('Failed to delete message', error)
    return res.status(500).json({ message: 'Failed to delete message.' })
  }
})

async function registerFrontend() {
  if (runtimeMode === 'production') {
    if (!fs.existsSync(distDir)) {
      throw new Error('Build output not found. Run "npm run build" before "npm start".')
    }

    app.use(express.static(distDir))
    app.use((req, res, next) => {
      if (req.path.startsWith('/api')) {
        return next()
      }

      return res.sendFile(path.join(distDir, 'index.html'))
    })

    return
  }

  const { createServer } = await import('vite')
  const vite = await createServer({
    server: {
      middlewareMode: true,
    },
    appType: 'spa',
  })

  app.use(vite.middlewares)

  app.use(async (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next()
    }

    try {
      const htmlPath = path.join(rootDir, 'index.html')
      const template = await fsPromises.readFile(htmlPath, 'utf8')
      const html = await vite.transformIndexHtml(req.originalUrl, template)
      return res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (error) {
      vite.ssrFixStacktrace(error)
      return next(error)
    }
  })
}

async function startServer() {
  if (!isBlobStorageEnabled()) {
    await ensureMessagesFile()
  }

  await registerFrontend()

  const { port } = getEnvConfig()

  app.listen(port, () => {
    console.log(`NaN Coda ${runtimeMode} server listening on http://localhost:${port}`)
  })
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

module.exports = app
module.exports.startServer = startServer
