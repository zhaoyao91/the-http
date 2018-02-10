/***
 * build a wrapper which could handle the error logic
 * @param errorHandler - async (err, request) => response
 * @return wrapper
 */
function buildErrorWrapper (errorHandler) {
  return function wrapper (handler) {
    return async function wrappedHandler (request) {
      try {
        return handler(request)
      }
      catch (err) {
        return errorHandler(err, request)
      }
    }
  }
}

module.exports = buildErrorWrapper