/**
 * @typedef {function} THHandler
 * @prototype `async (request: Request) => Response`
 * @see {@link Request}
 * @see {@link Response}
 */

/**
 * @typedef {function} NodeHTTPHandler
 * @prototype `(req, res) =>`
 * @see {@link https://nodejs.org/docs/latest-v8.x/api/http.html#http_http_createserver_requestlistener|Node.js create server}
 */

/**
 * @typedef {function} THWrapper
 * @prototype `(handler: THHandler) => THHandler`
 * @see {@link THHandler}
 */
