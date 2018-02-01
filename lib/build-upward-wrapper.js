/***
 * build a wrapper which could handle the upward logic
 * generally it maps response
 * @param upwardHandler - async (response, request, context) => response
 * @return wrapper
 */
function buildUpwardWrapper (upwardHandler) {
  return function wrapper (handler) {
    return async function wrappedHandler (request, context) {
      const response = await handler(request, context)
      return await upwardHandler(response, request, context)
    }
  }
}

module.exports = buildUpwardWrapper