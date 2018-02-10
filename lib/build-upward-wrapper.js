/***
 * build a wrapper which could handle the upward logic
 * generally it maps response
 * @param upwardHandler - async (response, request) => response
 * @return wrapper
 */
function buildUpwardWrapper (upwardHandler) {
  return function wrapper (handler) {
    return async function wrappedHandler (request) {
      const response = await handler(request)
      return upwardHandler(response, request)
    }
  }
}

module.exports = buildUpwardWrapper