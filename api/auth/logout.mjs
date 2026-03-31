import { createClearedSessionCookie } from '../_lib/auth.mjs'
import { methodNotAllowed } from '../_lib/http.mjs'

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return methodNotAllowed(['POST'])
    }

    return new Response(null, {
      status: 204,
      headers: {
        'Set-Cookie': createClearedSessionCookie(),
      },
    })
  },
}
