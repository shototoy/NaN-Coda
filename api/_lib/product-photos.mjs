import fsPromises from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const photoRoots = [
  path.join(rootDir, 'public', 'assets', 'photos'),
  path.join(rootDir, 'dist', 'assets', 'photos'),
]

function normalizeProductSlug(value) {
  const slug = String(value || '').trim().toLowerCase()
  return /^[a-z0-9-]+$/.test(slug) ? slug : ''
}

async function findPhotoDirectory(productSlug) {
  for (const photoRoot of photoRoots) {
    const candidate = path.join(photoRoot, productSlug)

    try {
      const stats = await fsPromises.stat(candidate)

      if (stats.isDirectory()) {
        return candidate
      }
    } catch (error) {
      continue
    }
  }

  return null
}

function sortPhotos(left, right) {
  if (left === 'banner.png') {
    return -1
  }

  if (right === 'banner.png') {
    return 1
  }

  return left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' })
}

function isGalleryPhoto(filename) {
  return filename.toLowerCase().endsWith('.png') && !/^partner\d+\.png$/i.test(filename)
}

export async function listProductPhotoUrls(slugValue) {
  const productSlug = normalizeProductSlug(slugValue)

  if (!productSlug) {
    return []
  }

  const photoDirectory = await findPhotoDirectory(productSlug)

  if (!photoDirectory) {
    return []
  }

  const directoryEntries = await fsPromises.readdir(photoDirectory, { withFileTypes: true })

  return directoryEntries
    .filter((entry) => entry.isFile() && isGalleryPhoto(entry.name))
    .map((entry) => entry.name)
    .sort(sortPhotos)
    .map((filename) => `/assets/photos/${productSlug}/${filename}`)
}
