const getRawBody = require('raw-body')

const HTTPError = require('./http-error')
const getOption = require('./utils/get-option')

const defaultParseLimit = '1mb'

/**
 * represent the body (payload or data) of the http request
 * you can handle it via the raw readable stream
 * or fetch and use it as buffer, text or json via provided helper methods
 */
class RequestBody {
  constructor (req) {
    this._req = req
  }

  get stream () {
    return this._req
  }

  async buffer (options) {
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

  async text (options) {
    if (!this._text) {
      this._text = (await this.buffer(options)).toString()
    }
    return this._text
  }

  async json (options) {
    if (!this._json) {
      // not calling this.text to avoid extra cache
      const text = (await this.buffer(options)).toString()
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
