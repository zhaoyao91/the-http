const HTTPStatus = require('http-status')
const {readable} = require('is-stream')

/**
 * represent the http response
 * by default, a response is just like a plain object with some default values
 * you can new a response and set it on your own
 * however, it's usually convenient and better to use the static builder functions to build a proper response
 * and make any adjustment to it
 */
class Response {
  constructor () {
    this._statusCode = 200
    this._headers = {}
    this._body = ''
  }

  /**
   * @param {number} code - within [100, 600)
   */
  set statusCode (code) {
    if (typeof code !== 'number') throw new TypeError('Status code must be a number')
    if (!isWithinHTTPStatusCodeRange(code)) throw new TypeError('Status code is outside the allowed range')
    this._statusCode = code
  }

  get statusCode () {
    return this._statusCode
  }

  /**
   * set a header
   * @param {string} name
   * @param {string | string[]} value
   */
  setHeader (name, value) {
    this._headers[name.toLowerCase()] = value
  }

  getHeader (name) {
    return this._headers[name.toLocaleString()]
  }

  set headers (headers) {
    for (let name in headers) {
      if (headers.hasOwnProperty(name)) {
        this.setHeader(name, headers[name])
      }
    }
  }

  get headers () {
    return this._headers
  }

  /**
   * @param {string | Buffer | ReadableStream} body
   */
  set body (body) {
    if (typeof body === 'string' || Buffer.isBuffer(body) || readable(body)) {
      this._body = body
    }
    else {
      throw new TypeError('Body must be a string, buffer or readable stream')
    }
  }

  get body () {
    return this._body
  }

  /**
   * make a copy of current response
   * @return {Response} copy
   */
  clone () {
    const copy = new Response()
    copy.statusCode = this.statusCode
    copy.headers = this.headers
    copy.body = this.body
    return copy
  }

  /**
   * build a response with given status code
   * the body will be set as the corresponding status text
   * @param {number} statusCode
   * @return {Response} response
   */
  static withStatusCode (statusCode) {
    const response = new Response()
    response.statusCode = statusCode
    response.body = HTTPStatus[statusCode]
    response.setHeader('content-type', 'text/plain; charset=utf-8')
    return response
  }

  /**
   * build a response with given raw body
   * the content-type header will be set correspondingly
   * @param {string | Buffer | ReadableStream} body
   * @return {Response} response
   */
  static withBody (body) {
    const response = new Response()
    response.body = body

    if (typeof body === 'string') {
      // do not set the content-type header
      // we cannot guess it in this context, user should set it manually or just leave it blank
    }
    else if (Buffer.isBuffer(body)) {
      response.setHeader('content-type', 'application/octet-stream')
    }
    else if (readable(body)) {
      response.setHeader('content-type', 'application/octet-stream')
    }

    return response
  }

  /**
   * build a response with given text body
   * the body could be of any type, but it will be converted into a string
   * the content-type header will be set as 'text/plain; charset=utf-8'
   * @param textBody
   * @return {Response} response
   */
  static withTextBody (textBody) {
    const response = new Response()
    response.body = String(textBody)
    response.setHeader('content-type', 'text/plain; charset=utf-8')
    return response
  }

  /**
   * build a response with given json body
   * the body could be of any type, but it will be converted into a JSON string
   * the content-type header will be set as 'application/json; charset=utf-8'
   * @param jsonBody
   * @return {Response} response
   */
  static withJSONBody (jsonBody) {
    const response = new Response()
    response.body = JSON.stringify(jsonBody)
    response.setHeader('content-type', 'application/json; charset=utf-8')
    return response
  }
}

module.exports = Response

function isWithinHTTPStatusCodeRange (code) {
  return code >= 100 && code < 600
}