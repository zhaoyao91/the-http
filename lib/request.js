const url = require('url')
const qs = require('querystring')

const RequestBody = require('./request-body')

/**
 * represent the http request
 *
 */
class Request {
  constructor (req) {
    this._req = req
    this._body = new RequestBody(req)
    this.context = {} // used to save custom data
  }

  get httpVersion () {
    return this._req.httpVersion
  }

  get method () {
    return this._req.method
  }

  get url () {
    return this._req.url
  }

  get query () {
    return this.parsedUrl.query
  }

  get headers () {
    return this._req.headers
  }

  get body () {
    return this._body
  }

  get parsedUrl () {
    if (!this._parsedUrl) {
      this._parsedUrl = url.parse(this.url)
    }
    return this._parsedUrl
  }

  get parsedQuery () {
    if (!this._parsedQuery) {
      this._parsedQuery = qs.parse(this.query)
    }
    return this._parsedQuery
  }
}

module.exports = Request