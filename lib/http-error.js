/**
 * Represent a HTTP error with status code and message.
 */
class HTTPError extends Error {
  /**
   * @param {number} [statusCode]
   * @param {string} [message]
   * @param {Error} [originalError]
   */
  constructor (statusCode, message, originalError) {
    super(message)
    if (statusCode !== undefined) this.statusCode = statusCode
    if (originalError !== undefined) this.originalError = originalError
  }
}

HTTPError.prototype.name = 'HTTPError'

module.exports = HTTPError
