const HTTPStatus = require('http-status')

const buildErrorWrapper = require('../helpers/build-error-wrapper')
const getOption = require('../utils/get-option')
const HTTPError = require('../http-error')
const Response = require('../response')

/**
 * Provided default error handler wrapper.
 * Generate response from the error and return it.
 * If it's not a http client error, then log it.
 * @param {Object} [options]
 * @param {function} [options.logError=console.error]
 * @returns {THWrapper}
 */
function handleErrors (options) {
  const logError = getOption(options, 'logError', console.error)
  return buildErrorWrapper((err) => {
    const {code, message} = parseError(err)
    if (logError && !isClientError(code)) logError(err)
    const response = Response.withTextBody(message)
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
  } else {
    return {
      code: 500,
      message: HTTPStatus[500]
    }
  }
}

function isClientError (code) {
  return code >= 400 && code < 500
}
