const {readable} = require('is-stream')
const HTTPStatus = require('http-status')

const Request = require('./request')

/**
 * Convert a TH handler into a node HTTP handler.
 * @param {THHandler} handler
 * @returns {NodeHTTPHandler}
 */
function adapt (handler) {
  return function nodeHTTPHandler (req, res) {
    const request = new Request(req)
    handler(request)
      .then(response => sendResponse(response, res))
      .catch(err => handleError(err, res))
  }
}

module.exports = adapt

function sendResponse (response, res) {
  res.statusCode = response.statusCode

  const headers = response.headers
  for (let name in headers) {
    if (headers.hasOwnProperty(name)) {
      res.setHeader(name, headers[name])
    }
  }

  if (readable(response.body)) {
    response.body.pipe(res)
  }
  else {
    res.end(response.body)
  }
}

/**
 * this is the final fallback error handler
 * in practice, you should always catch and handle errors before arriving here
 * @private
 */
function handleError (err, res) {
  console.error('Unhandled error:', err)
  res.statusCode = 500
  res.setHeader('content-type', 'text/plain; charset=utf-8')
  res.end(HTTPStatus[500])
}