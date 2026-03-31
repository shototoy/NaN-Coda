import {
  createSessionCookie,
  getEnvConfig,
  normalizeField,
  requireConfiguredServer,
  safeCompare,
} from '../_lib/auth.mjs'
import { jsonResponse, methodNotAllowed, readJsonBody } from '../_lib/http.mjs'

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return methodNotAllowed(['POST'])
    }

    const configError = requireConfiguredServer()

    if (configError) {
      return configError
    }

    const body = await readJsonBody(request)
    const username = normalizeField(body?.username, 120)
    const password = String(body?.password || '')
    const { adminUsername, adminPassword } = getEnvConfig()

    if (!username || !password) {
      return jsonResponse({ message: 'Username and password are required.' }, { status: 400 })
    }

    if (!safeCompare(username, adminUsername) || !safeCompare(password, adminPassword)) {
      return jsonResponse({ message: 'Invalid credentials.' }, { status: 401 })
    }

    return jsonResponse(
      {
        message: 'Login successful.',
        username: adminUsername,
      },
      {
        headers: {
          'Set-Cookie': createSessionCookie(adminUsername),
        },
      }
    )
  },
}
