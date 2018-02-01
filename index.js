const adapt = require('./lib/adapt')
const compose = require('./lib/compose')

const HTTPError = require('./lib/http-error')
const RequestBody = require('./lib/request-body')
const Request = require('./lib/request')
const Response = require('./lib/response')

const buildErrorWrapper = require('./lib/build-error-wrapper')
const buildDownwardWrapper = require('./lib/build-downward-wrapper')
const buildUpwardWrapper = require('./lib/build-upward-wrapper')

const handleErrors = require('./lib/wrappers/handle-errors')

module.exports = {
  adapt,
  compose,
  HTTPError,
  RequestBody,
  Request,
  Response,
  buildErrorWrapper,
  buildDownwardWrapper,
  buildUpwardWrapper,
  handleErrors
}