const getRawBody = require('raw-body')

const HTTPError = require('./http-error')
const getOption = require('./utils/get-option')

/**
 * represent the body (payload or data) of the http request
 * you can handle it via the raw readable stream
 * or fetch and use it as buffer, text or json via provided helper fields
 *
 * note: calling fetch method before use it as buffer, text or json
 */
class RequestBody {
  constructor (req) {
    this._req = req
  }

  get stream () {
    return this._req
  }

  /**
   * fetch the data from the stream, so you can use it as buffer, text or json
   * @param [options]
   * @param [options.limit=1mb]
   * @return body - this body
   */
  async fetch (options) {
    if (!this._buffer) {
      const limit = getOption(options, 'limit', '1mb')
      const length = this._contentLength
      try {
        this._buffer = await getRawBody(this.stream, {length, limit})
      }
      catch (err) {
        if (err.type === 'entity.too.large') {
          throw new HTTPError(413, `Body exceeded ${limit} limit`, err)
        } else {
          throw new HTTPError(400, 'Invalid body', err)
        }
      }
    }
    return this
  }

  get buffer () {
    if (!this._buffer) throw Error('Body has not been fetched yet')
    return this._buffer
  }

  get text () {
    if (!this._text) {
      this._text = this.buffer.toString()
    }
    return this._text
  }

  get json () {
    if (!this._json) {
      // not calling this.text to avoid useless cache
      const text = this.buffer.toString()
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
