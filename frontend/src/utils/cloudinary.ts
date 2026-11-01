// Cloudinary images are optimised when they're delivered: settings added to the URL right after /upload/ make
// Cloudinary resize, crop and convert the image on the fly. The stored URLs and the original files never change.

const UPLOAD = '/image/upload/'

// Cloudinary's URL parameter names (the part before "_", e.g. "w" in "w_480"), used to recognise a URL that
// already has transformations
const PARAMS = new Set(['a', 'ac', 'af', 'ar', 'b', 'bo', 'br', 'c', 'co', 'cs', 'd', 'dl', 'dn', 'dpr', 'du', 'e', 'eo', 'f', 'fl', 'fn', 'g', 'h', 'ki', 'l', 'o', 'p', 'pg', 'q', 'r', 'so', 't', 'u', 'vc', 'w', 'x', 'y', 'z'])

// "c_fill,w_400" or "f_auto" is a transformation; "v1792861802" (a version) or "robo-eee" (a folder) is not
const isTransformation = (segment: string) =>
  segment.split(',').every((part) => {
    const match = /^([a-z]+)_./.exec(part)
    return match !== null && PARAMS.has(match[1])
  })

const isCloudinaryUrl = (url: string) => {
  try {
    return new URL(url).hostname === 'res.cloudinary.com' && url.includes(UPLOAD)
  } catch {
    return false
  }
}

export type ImageCrop = {
  mode: 'thumb' | 'fill'
  gravity?: string // e.g. 'face' to centre the crop on the face
  aspectRatio?: string // e.g. '4:5'
  zoom?: number // with mode 'thumb' + gravity 'face': below 1 shows more around the face
}

export type ImageOptions = {
  width?: number
  // 'auto' picks a good size/quality balance; 'auto:best' favours sharpness, for large or zoomed views
  quality?: 'auto' | 'auto:best' | 'auto:good'
  // Without a crop, the image is only scaled down to `width` (c_limit, never upscaled), keeping its shape
  crop?: ImageCrop
}

// Returns the URL with Cloudinary delivery settings (format and quality chosen per browser, plus the size/crop).
// Returns it unchanged if it's empty, not a Cloudinary upload URL, or already has transformations.
export function getOptimizedImageUrl<T extends string | null | undefined>(url: T, options: ImageOptions = {}): T {
  if (!url || !isCloudinaryUrl(url)) return url
  const start = url.indexOf(UPLOAD) + UPLOAD.length
  const rest = url.slice(start)
  if (isTransformation(rest.split('/')[0])) return url

  const { width, quality = 'auto', crop } = options
  const params = ['f_auto', `q_${quality}`]
  if (crop) {
    params.push(`c_${crop.mode}`)
    if (crop.gravity) params.push(`g_${crop.gravity}`)
    if (crop.aspectRatio) params.push(`ar_${crop.aspectRatio}`)
    if (width) params.push(`w_${width}`)
    if (crop.zoom !== undefined) params.push(`z_${crop.zoom}`)
  } else if (width) {
    params.push(`w_${width}`, 'c_limit')
  }
  return `${url.slice(0, start)}${params.join(',')}/${rest}` as T
}

// A `srcset` with one optimised URL per width, so the browser downloads only the size the screen needs.
// Undefined for non-Cloudinary URLs (e.g. a bundled placeholder image), which have only one size.
export function getOptimizedImageSrcSet(url: string | null | undefined, widths: number[], options: Omit<ImageOptions, 'width'> = {}) {
  if (!url || !isCloudinaryUrl(url)) return undefined
  return widths.map((width) => `${getOptimizedImageUrl(url, { ...options, width })} ${width}w`).join(', ')
}
