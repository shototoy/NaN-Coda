import { jsonResponse, methodNotAllowed } from './_lib/http.mjs'
import { listProductPhotoUrls } from './_lib/product-photos.mjs'

export default {
  async fetch(request) {
    if (request.method !== 'GET') {
      return methodNotAllowed(['GET'])
    }

    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const photos = await listProductPhotoUrls(slug)

    return jsonResponse({ photos })
  },
}
