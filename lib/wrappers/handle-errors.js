const HTTPStatus = require('http-status')

const buildErrorWrapper = require('../build-error-wrapper')
const getOption = require('../utils/get-option')
const HTTPError = require('../http-error')
const Response = require('../response')

/**
 * provided default error handler wrapper
 * generate response from the error and return it
 * if it's not a http client error, then log it
 * @param [options]
 * @param [options.logError=console.error]
 * @returns wrapper
 */
function handleErrors (options) {
  const logError = getOption(options, 'logError', console.error)
  return buildErrorWrapper((err) => {
    const {code, message} = parseError(err)
    if (logError && !(code >= 400 && code < 500)) logError(err)
    const response = Response.fromTextBody(message)
    response.statusCode = code
    return response
  })
}

module.exports = handleErrors

function parseError (err) {
  if (err instanceof HTTPError) {
    return {
      code: err.statusCode,
      message: err.message || HTTPStatus[err.statusCode]
    }
  }
  else {
    return {
      code: 500,
      message: HTTPStatus[500]
    }
  }
}
