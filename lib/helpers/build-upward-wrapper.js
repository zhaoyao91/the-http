/**
 * @typedef {Function} buildUpwardWrapper~UpwardHandler
 * @prototype `async (response: Response, request: Request) => Response`
 * @see {@link Request}
 * @see {@link Response}
 */

/**
 * Build a wrapper which could handle the upward logic.
 * Generally it maps response.
 * @param {buildUpwardWrapper~UpwardHandler} upwardHandler
 * @return {THWrapper}
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
