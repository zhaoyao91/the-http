/**
 * @typedef {Function} buildErrorWrapper~ErrorHandler
 * @prototype `async (error: Error, request: Request) => Response`
 * @see {@link Request}
 * @see {@link Response}
 */

/**
 * Build a wrapper which could handle the error logic.
 * @param {buildErrorWrapper~ErrorHandler} errorHandler
 * @return {THWrapper}
 */
function buildErrorWrapper (errorHandler) {
  return function wrapper (handler) {
    return async function wrappedHandler (request) {
      try {
        return handler(request)
      } catch (err) {
        return errorHandler(err, request)
      }
    }
  }
}

module.exports = buildErrorWrapper
