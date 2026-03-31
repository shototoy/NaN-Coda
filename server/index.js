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
let writeQueue = Promise.resolve()

app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

function getEnvConfig() {
  return {
    adminUsername: process.env.ADMIN_USERNAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    sessionSecret: process.env.SESSION_SECRET,
    port: Number(process.env.PORT || 3001),
    isProduction: process.env.NODE_ENV === 'production',
  }
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

async function readMessages() {
  await ensureMessagesFile()
  const raw = await fsPromises.readFile(messagesFile, 'utf8')

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    return []
  }
}

function queueMessageWrite(message) {
  writeQueue = writeQueue.then(async () => {
    const messages = await readMessages()
    messages.unshift(message)
    await fsPromises.writeFile(messagesFile, `${JSON.stringify(messages, null, 2)}\n`, 'utf8')
  })

  return writeQueue
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

  await queueMessageWrite(message)

  return res.status(201).json({ message: 'Message sent successfully.' })
})

app.get('/api/admin/messages', requireConfiguredServer, requireAuth, async (req, res) => {
  const messages = await readMessages()

  return res.json({
    messages,
    total: messages.length,
  })
})

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))

  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next()
    }

    return res.sendFile(path.join(distDir, 'index.html'))
  })
}

const { port } = getEnvConfig()

app.listen(port, async () => {
  await ensureMessagesFile()
  console.log(`NaN Coda server listening on http://localhost:${port}`)
})
