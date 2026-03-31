import crypto from 'node:crypto'
import { jsonResponse } from './http.mjs'

const sessionCookieName = 'nan_coda_admin'
const sessionTtlSeconds = 60 * 60 * 8

export function getEnvConfig() {
  return {
    adminUsername: process.env.ADMIN_USERNAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    sessionSecret: process.env.SESSION_SECRET,
    isProduction: process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production',
  }
}

export function validateServerConfig() {
  const { adminUsername, adminPassword, sessionSecret } = getEnvConfig()
  return Boolean(adminUsername && adminPassword && sessionSecret)
}

export function requireConfiguredServer() {
  if (!validateServerConfig()) {
    return jsonResponse(
      { message: 'Server is missing ADMIN_USERNAME, ADMIN_PASSWORD, or SESSION_SECRET.' },
      { status: 500 }
    )
  }

  return null
}

export function normalizeField(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength)
}

export function safeCompare(left = '', right = '') {
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
    expiresAt: Date.now() + sessionTtlSeconds * 1000,
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

function parseCookies(cookieHeader = '') {
  return cookieHeader
    .split(';')
    .map((cookie) => cookie.trim())
    .filter(Boolean)
    .reduce((accumulator, entry) => {
      const separatorIndex = entry.indexOf('=')

      if (separatorIndex === -1) {
        return accumulator
      }

      const key = entry.slice(0, separatorIndex).trim()
      const value = entry.slice(separatorIndex + 1).trim()

      accumulator[key] = decodeURIComponent(value)
      return accumulator
    }, {})
}

function serializeCookie(name, value, options = {}) {
  const attributes = [`${name}=${encodeURIComponent(value)}`]

  if (options.maxAge !== undefined) {
    attributes.push(`Max-Age=${options.maxAge}`)
  }

  if (options.path) {
    attributes.push(`Path=${options.path}`)
  }

  if (options.httpOnly) {
    attributes.push('HttpOnly')
  }

  if (options.sameSite) {
    attributes.push(`SameSite=${options.sameSite}`)
  }

  if (options.secure) {
    attributes.push('Secure')
  }

  return attributes.join('; ')
}

export function createSessionCookie(username) {
  const { sessionSecret, isProduction } = getEnvConfig()
  const token = createSessionToken(username, sessionSecret)

  return serializeCookie(sessionCookieName, token, {
    httpOnly: true,
    maxAge: sessionTtlSeconds,
    path: '/',
    sameSite: 'Lax',
    secure: isProduction,
  })
}

export function createClearedSessionCookie() {
  return serializeCookie(sessionCookieName, '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
    sameSite: 'Lax',
    secure: getEnvConfig().isProduction,
  })
}

export function getSessionFromRequest(request) {
  const cookies = parseCookies(request.headers.get('cookie') || '')
  const { sessionSecret } = getEnvConfig()
  return verifySessionToken(cookies[sessionCookieName], sessionSecret)
}

export function requireAuth(request) {
  const session = getSessionFromRequest(request)

  if (!session) {
    return {
      session: null,
      response: jsonResponse({ message: 'Unauthorized' }, { status: 401 }),
    }
  }

  return { session, response: null }
}
