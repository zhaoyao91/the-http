const http = require('http')
const adapt = require('./adapt')

function listen (...args) {
  return function (handler) {
    const httpHandler = adapt(handler)
    const server = http.createServer(httpHandler)
    server.listen(...args)
    return server
  }
}

module.exports = listen