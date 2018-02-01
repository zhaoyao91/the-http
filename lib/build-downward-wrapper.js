const Response = require('./response')

/***
 * build a wrapper which could handle the downward logic
 * generally it maps context
 * but if it returns a response, the flow will return here, and the handlers below will be ignored
 * @param downwardHandler - async (request, context) => context | response
 * @return wrapper
 */
function buildDownwardWrapper (downwardHandler) {
  return function wrapper (handler) {
    return async function wrappedHandler (request, context) {
      const result = await downwardHandler(request, context)
      if (result instanceof Response) return result
      else return await handler(request, result)
    }
  }
}

module.exports = buildDownwardWrapper