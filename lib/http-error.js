/**
 * represent http level error
 */
class HTTPError extends Error {
  constructor (statusCode, message, originalError) {
    super(message)
    if (statusCode !== undefined) this.statusCode = statusCode
    if (originalError !== undefined) this.originalError = originalError
  }
}

HTTPError.prototype.name = 'HTTPError'

module.exports = HTTPError
