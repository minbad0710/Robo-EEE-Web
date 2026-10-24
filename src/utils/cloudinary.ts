// Crops a Cloudinary photo to a head-and-shoulders shot centred on the face, so full-body and landscape photos
// match the headshots, `width` px wide, in the best format and quality for the browser. Cloudinary does this on
// the fly from the settings added to the URL after /upload/. Other URLs are returned unchanged.
export const facePhoto = (url: string, width: number, aspectRatio: string) =>
  url.replace('/image/upload/', `/image/upload/c_thumb,g_face,ar_${aspectRatio},w_${width},z_0.6,f_auto,q_auto/`)
