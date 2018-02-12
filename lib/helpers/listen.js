const http = require('http')
const adapt = require('../adapt')

/**
 * Create a http server and listen for connections.
 * @param args - the same with that of server.listen of node http package
 * @return {function}
 */
function listen (...args) {
  /**
   * @param {THHandler} handler
   * @return {Object} - the node http server
   */
  return function (handler) {
    const httpHandler = adapt(handler)
    const server = http.createServer(httpHandler)
    server.listen(...args)
    return server
  }
}

module.exports = listen
