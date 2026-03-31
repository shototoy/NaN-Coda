import { normalizeField, requireAuth, requireConfiguredServer } from '../_lib/auth.mjs'
import { jsonResponse, methodNotAllowed } from '../_lib/http.mjs'
import { deleteMessage, getMessageStorageInfo, listMessages } from '../_lib/messages.mjs'

export default {
  async fetch(request) {
    const configError = requireConfiguredServer()

    if (configError) {
      return configError
    }

    const auth = requireAuth(request)

    if (auth.response) {
      return auth.response
    }

    if (request.method === 'GET') {
      try {
        const messages = await listMessages()
        const storage = getMessageStorageInfo()

        return jsonResponse({
          messages,
          total: messages.length,
          storageLabel: storage.label,
          storageDescription: storage.description,
        })
      } catch (error) {
        console.error('Failed to load messages', error)
        return jsonResponse({ message: 'Failed to load messages.' }, { status: 500 })
      }
    }

    if (request.method === 'DELETE') {
      const url = new URL(request.url)
      const messageId = normalizeField(url.searchParams.get('id'), 120)

      if (!messageId) {
        return jsonResponse({ message: 'Message ID is required.' }, { status: 400 })
      }

      try {
        const deleted = await deleteMessage(messageId)

        if (!deleted) {
          return jsonResponse({ message: 'Message not found.' }, { status: 404 })
        }

        return new Response(null, { status: 204 })
      } catch (error) {
        console.error('Failed to delete message', error)
        return jsonResponse({ message: 'Failed to delete message.' }, { status: 500 })
      }
    }

    return methodNotAllowed(['GET', 'DELETE'])
  },
}
