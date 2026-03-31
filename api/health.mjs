import { jsonResponse, methodNotAllowed } from './_lib/http.mjs'

export default {
  async fetch(request) {
    if (request.method !== 'GET') {
      return methodNotAllowed(['GET'])
    }

    return jsonResponse({ ok: true })
  },
}
