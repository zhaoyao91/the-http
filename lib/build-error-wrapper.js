/***
 * build a wrapper which could handle the error logic
 * @param errorHandler - async (err, request, context) => response
 * @return wrapper
 */
function buildErrorWrapper (errorHandler) {
  return function wrapper (handler) {
    return async function wrappedHandler (request, context) {
      try {
        return await handler(request, context)
      }
      catch (err) {
        return await errorHandler(err, request, context)
      }
    }
  }
}

module.exports = buildErrorWrapper