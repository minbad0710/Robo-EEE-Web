const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const HttpError = require('../utils/httpError.util');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Reads one image from a multipart/form-data request into memory (req.file.buffer) until it is sent to
// Cloudinary. The image itself is never written to disk or MongoDB; only its Cloudinary link is stored.
const uploadImage = multer({
  storage: multer.memoryStorage(),
  // 4 MB: Vercel rejects request bodies over 4.5 MB before they reach the API, so stay under that
  limits: { fileSize: 4 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    if (IMAGE_TYPES.includes(file.mimetype)) cb(null, true);
    else cb(new HttpError(400, 'Photo must be a JPG, PNG or WebP image'));
  },
});

// Resolves to Cloudinary's result: `secure_url` is the link to store, `public_id` is needed to delete it later
const uploadToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder, resource_type: 'image' }, (error, result) => (error ? reject(error) : resolve(result)))
      .end(buffer);
  });

// Best effort: a failed delete only leaves an unused image on Cloudinary, so it is logged instead of failing the request
const deleteFromCloudinary = (publicId) =>
  cloudinary.uploader.destroy(publicId).catch((error) => console.error(`Could not delete Cloudinary image ${publicId}:`, error));

module.exports = { uploadImage, uploadToCloudinary, deleteFromCloudinary };
