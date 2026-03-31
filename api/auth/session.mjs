import { getSessionFromRequest, requireConfiguredServer } from '../_lib/auth.mjs'
import { jsonResponse, methodNotAllowed } from '../_lib/http.mjs'

export default {
  async fetch(request) {
    if (request.method !== 'GET') {
      return methodNotAllowed(['GET'])
    }

    const configError = requireConfiguredServer()

    if (configError) {
      return configError
    }

    const session = getSessionFromRequest(request)

    if (!session) {
      return jsonResponse({ authenticated: false })
    }

    return jsonResponse({
      authenticated: true,
      username: session.username,
    })
  },
}
