// An error with an HTTP status code; the error middleware turns it into a JSON response
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = HttpError;
