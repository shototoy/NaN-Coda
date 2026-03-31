export function jsonResponse(data, init = {}) {
  const headers = new Headers(init.headers || {})

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  return new Response(JSON.stringify(data), {
    ...init,
    headers,
  })
}

export function methodNotAllowed(allowedMethods) {
  return jsonResponse(
    { message: 'Method not allowed.' },
    {
      status: 405,
      headers: {
        Allow: allowedMethods.join(', '),
      },
    }
  )
}

export async function readJsonBody(request) {
  try {
    return await request.json()
  } catch (error) {
    return null
  }
}
