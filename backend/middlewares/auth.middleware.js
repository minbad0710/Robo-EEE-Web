const crypto = require('crypto');
const HttpError = require('../utils/httpError.util');

// Hashing first gives both values the same length, which timingSafeEqual requires
const hash = (value) => crypto.createHash('sha256').update(value).digest();

// Protects write routes: the request must send ADMIN_API_KEY from .env in the `x-api-key` header
const requireAdmin = (req, res, next) => {
  const expected = process.env.ADMIN_API_KEY;
  const given = req.get('x-api-key');
  if (!expected) throw new HttpError(503, 'ADMIN_API_KEY is not set on the server');
  if (!given || !crypto.timingSafeEqual(hash(given), hash(expected))) throw new HttpError(401, 'Missing or invalid API key');
  next();
};

module.exports = requireAdmin;
