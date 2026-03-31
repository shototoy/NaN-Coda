export async function apiRequest(url, options = {}) {
  const init = {
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  }

  if (init.body && !init.headers['Content-Type']) {
    init.headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(url, init)
  const contentType = response.headers.get('content-type') || ''
  let data = null

  if (contentType.includes('application/json')) {
    data = await response.json()
  } else if (response.status !== 204) {
    const text = await response.text()
    data = text ? { message: text } : null
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed.')
  }

  return data
}
