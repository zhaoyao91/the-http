const url = require('url')
const qs = require('querystring')

const RequestBody = require('./request-body')

/**
 * Represent a HTTP request.
 */
class Request {
  constructor (req) {
    this._req = req
    this._body = new RequestBody(req)
    this.context = {} // used to save custom data
  }

  /**
   * @type {string}
   */
  get httpVersion () {
    return this._req.httpVersion
  }

  /**
   * @type {string}
   */
  get method () {
    return this._req.method
  }

  /**
   * @type {string}
   */
  get url () {
    return this._req.url
  }

  /**
   * @type {string}
   */
  get query () {
    return this.parsedUrl.query
  }

  /**
   * @type {Object}
   * @see {@link https://nodejs.org/docs/latest-v8.x/api/http.html#http_message_headers|headers}
   */
  get headers () {
    return this._req.headers
  }

  /**
   * @type {RequestBody}
   */
  get body () {
    return this._body
  }

  /**
   * Url object parsed by {@link https://nodejs.org/docs/latest-v8.x/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost|url}.
   * @type {Object}
   */
  get parsedUrl () {
    if (!this._parsedUrl) {
      this._parsedUrl = url.parse(this.url)
    }
    return this._parsedUrl
  }

  /**
   * Query object parsed by {@link https://nodejs.org/docs/latest-v8.x/api/querystring.html#querystring_querystring_parse_str_sep_eq_options|querystring}.
   * @type {Object}
   */
  get parsedQuery () {
    if (!this._parsedQuery) {
      this._parsedQuery = qs.parse(this.query)
    }
    return this._parsedQuery
  }
}

module.exports = Request