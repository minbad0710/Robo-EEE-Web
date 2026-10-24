const mongoose = require('mongoose');
const multer = require('multer');

// Any request that didn't match a route
const notFound = (req, res) => {
  res.status(404).json({ message: `Not found: ${req.method} ${req.originalUrl}` });
};

// Turns thrown errors into JSON responses. Express only treats it as an error handler because it takes 4 arguments.
const errorHandler = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.fromEntries(Object.entries(err.errors).map(([path, error]) => [path, error.message]));
    return res.status(400).json({ message: 'Validation failed', errors });
  }
  // e.g. /api/team-members/abc, where 'abc' is not a valid MongoDB id
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: `Invalid ${err.path}: ${err.value}` });
  }
  // Breaks a unique index, e.g. the same member twice in one department and year
  if (err.code === 11000) {
    return res.status(409).json({ message: 'A record with these details already exists' });
  }
  // Bad file upload, e.g. a photo over the size limit or sent in a field other than `photo`
  if (err instanceof multer.MulterError) {
    return res.status(err.code === 'LIMIT_FILE_SIZE' ? 413 : 400).json({ message: err.message });
  }

  // HttpError and Express's own errors (such as invalid JSON) carry a status; anything else is a bug
  const status = err.status ?? err.statusCode ?? 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ message: status >= 500 ? 'Internal server error' : err.message });
};

module.exports = { notFound, errorHandler };
