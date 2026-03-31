import { normalizeField } from './_lib/auth.mjs'
import { jsonResponse, methodNotAllowed, readJsonBody } from './_lib/http.mjs'
import { createMessage, isValidEmail, saveMessage } from './_lib/messages.mjs'

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return methodNotAllowed(['POST'])
    }

    const body = await readJsonBody(request)
    const message = createMessage(body, normalizeField)

    if (!message.name || !message.email || !message.message) {
      return jsonResponse({ message: 'Please fill in all required fields.' }, { status: 400 })
    }

    if (!isValidEmail(message.email)) {
      return jsonResponse({ message: 'Please enter a valid email address.' }, { status: 400 })
    }

    try {
      await saveMessage(message)
    } catch (error) {
      console.error('Failed to save message', error)
      return jsonResponse({ message: 'Failed to store message.' }, { status: 500 })
    }

    return jsonResponse({ message: 'Message sent successfully.' }, { status: 201 })
  },
}
