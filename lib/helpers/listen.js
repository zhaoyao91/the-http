const http = require('http')
const adapt = require('../adapt')

/**
 * Create a http server and listen for connections.
 * @type {function}
 * @prototype `(...args) => (handler: THHandler) => NodeHTTPServer`
 * @see {@link THHandler}
 * @see {@link https://nodejs.org/docs/latest-v8.x/api/http.html#http_server_listen|Node.js server.listen}
 */
function listen (...args) {
  return function (handler) {
    const httpHandler = adapt(handler)
    const server = http.createServer(httpHandler)
    server.listen(...args)
    return server
  }
}

module.exports = listen
