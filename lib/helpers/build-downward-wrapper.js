const Request = require('../request')
const Response = require('../response')

/**
 * @typedef {Function} buildDownwardWrapper~DownwardHandler
 * @prototype `async (request: Request) => Request|Response`
 * @see {@link Request}
 * @see {@link Response}
 */

/**
 * Build a wrapper which could handle the downward logic.
 * Generally it maps request (context),
 * but if it returns a response, the flow will return right here, and the handlers below will be ignored.
 * @param {buildDownwardWrapper~DownwardHandler} downwardHandler
 * @return {THWrapper}
 */
function buildDownwardWrapper (downwardHandler) {
  return function wrapper (handler) {
    return async function wrappedHandler (request) {
      const result = await downwardHandler(request)
      if (result instanceof Request) return handler(result)
      else if (result instanceof Response) return result
      else throw new TypeError('Result of downward handler should be either Request or Response')
    }
  }
}

module.exports = buildDownwardWrapper
