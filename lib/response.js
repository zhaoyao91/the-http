const HTTPStatus = require('http-status')
const { readable } = require('is-stream')

/**
 * Represent a HTTP response.
 * By default, a response is just like a plain object with some default values.
 * You can create a response and set it on your own.
 * However, it's usually convenient and better to use the static builders to build a proper initial response
 * and make any needed adjustment to it.
 */
class Response {
  /**
   *
   */
  constructor () {
    this._statusCode = 200
    this._headers = {}
    this._body = ''
  }

  /**
   * @alias Response#statusCode=
   * @param {number} code - within [100, 600)
   */
  set statusCode (code) {
    if (typeof code !== 'number') throw new TypeError('Status code must be a number')
    if (!isWithinHTTPStatusCodeRange(code)) throw new TypeError('Status code is outside the allowed range')
    this._statusCode = code
  }

  /**
   * @type {number}
   */
  get statusCode () {
    return this._statusCode
  }

  /**
   * Set the whole headers object.
   * Generally you should use `setHeader` to avoid duplicate headers,
   * but if you know what you are doing, you can use this setter to update headers more efficiently.
   * @alias Response#headers=
   * @param {Object} headers
   */
  set headers (headers) {
    if (!headers || typeof headers !== 'object') throw new TypeError('Headers must be an object')
    this._headers = headers
  }

  /**
   * @type {Object}
   */
  get headers () {
    return this._headers
  }

  /**
   * @alias Response#body=
   * @param {(string|Buffer|ReadableStream)} body
   */
  set body (body) {
    if (typeof body === 'string' || Buffer.isBuffer(body) || readable(body)) {
      this._body = body
    } else {
      throw new TypeError('Body must be a string, buffer or readable stream')
    }
  }

  /**
   * @type {(string|Buffer|ReadableStream)}
   */
  get body () {
    return this._body
  }

  /**
   * Set the header value of given header name.
   * The name will be converted to lowercase to avoid duplication.
   * @param {string} name
   * @param {string | string[]} value
   */
  setHeader (name, value) {
    if (typeof value !== 'string' && !Array.isArray(value)) throw new TypeError('Header value must be either a string or an array of string')
    this._headers[name.toLowerCase()] = value
  }

  /**
   * Return the header value of given header name.
   * @param {string} name
   * @returns {(string|string[])}
   */
  getHeader (name) {
    return this._headers[name.toLowerCase()]
  }

  /**
   * Build a response with given status code.
   * The body will be set as the corresponding status text if not provided
   * @param {number} statusCode
   * @param {string} [message]
   * @return {Response}
   */
  static withStatusCode (statusCode, message) {
    const response = new Response()
    response.statusCode = statusCode
    response.body = message === undefined ? HTTPStatus[statusCode] : message
    response.setHeader('content-type', 'text/plain; charset=utf-8')
    return response
  }

  /**
   * Build a response with given buffer body.
   * The content-type header will be set as 'application/octet-stream'.
   * @param {Buffer} bufferBody
   * @return {Response}
   */
  static withBufferBody (bufferBody) {
    const response = new Response()
    response.body = bufferBody
    response.setHeader('content-type', 'application/octet-stream')
    return response
  }

  /**
   * Build a response with given stream body.
   * The content-type header will be set as 'application/octet-stream'.
   * @param {ReadableStream} streamBody
   * @return {Response} response
   */
  static withStreamBody (streamBody) {
    const response = new Response()
    response.body = streamBody
    response.setHeader('content-type', 'application/octet-stream')
    return response
  }

  /**
   * Build a response with given text body.
   * The body could be of any type, but it will be converted into string.
   * The content-type header will be set as 'text/plain; charset=utf-8'.
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
   * Build a response with given JSON body.
   * The body could be of any type, but it will be converted into JSON string.
   * The content-type header will be set as 'application/json; charset=utf-8'.
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
