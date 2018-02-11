const getRawBody = require('raw-body')

const HTTPError = require('./http-error')
const getOption = require('./utils/get-option')

const defaultParseLimit = '1mb'

/**
 * Represent the body (payload or data) of a HTTP request.
 * You can handle it via the stream field
 * or fetch and use it as buffer, text or json via the provided helpers
 */
class RequestBody {
  constructor (req) {
    this._req = req
  }

  /**
   * @type {ReadableStream}
   */
  get stream () {
    return this._req
  }

  /**
   * get the body as buffer
   * @async
   * @param {Object} [options]
   * @param {string} [options.limit=1mb]
   * @returns {Promise<Buffer>}
   */
  async asBuffer (options) {
    if (!this._buffer) {
      const limit = getOption(options, 'limit', defaultParseLimit)
      const length = this._req.headers['content-length']
      try {
        this._buffer = await getRawBody(this.stream, {length, limit})
      }
      catch (err) {
        if (err.type === 'entity.too.large') {
          throw new HTTPError(413, `Body exceeded ${limit} limit`, err)
        }
        else {
          throw new HTTPError(400, 'Invalid body', err)
        }
      }
    }
    return this._buffer
  }

  /**
   * get the body as string
   * @async
   * @param {Object} [options]
   * @param {string} [options.limit=1mb]
   * @returns {Promise<string>}
   */
  async asText (options) {
    if (!this._text) {
      this._text = (await this.asBuffer(options)).toString()
    }
    return this._text
  }

  /**
   * get the body as JSON object
   * @async
   * @param {Object} [options]
   * @param {string} [options.limit=1mb]
   * @returns {Promise<*>}
   */
  async asJSON (options) {
    if (!this._json) {
      // not calling this.asText to avoid extra cache
      const text = (await this.asBuffer(options)).toString()
      try {
        this._json = JSON.parse(text)
      }
      catch (err) {
        throw new HTTPError(400, 'Invalid JSON body', err)
      }
    }
    return this._json
  }
}

module.exports = RequestBody
