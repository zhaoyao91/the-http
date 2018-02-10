# The HTTP (TH)

The way we build HTTP service.

## Features

- **Modern**: Using `async/await` instead of `callback`
- **Simple**: Simple function model: `async (request) => response`
- **Extensible**: Via making and composing intuitive wrappers
- **Standard**: Just HTTP
- **Micro**: Suitable for micro service

## Install

```
npm i --save the-http
```

## Getting Started

```ecmascript 6
const {Response, compose, handleErrors, listen} = require('the-http') 

async function handler(request) {
  const {name, age} = await request.body.json()
  return Response.withJSONBody({
    isAdult: age >= 18,
    message: `Hello ${name}`
  })
}

const enhancedHandler = compose(
  handleErrors()
)(handler)

listen(3000)(enhancedHandler)
```

## API

- [compose](./lib/compose.js) - simple compose function shipped with this package
- [adapt](./lib/adapt.js) - convert a THHandler into a node HTTP handler
- [HTTPError](./lib/http-error.js) - represent HTTP level error
- [RequestBody](./lib/request-body.js) - represent HTTP request body
- [Request](./lib/request.js) - represent HTTP request
- [Response](./lib/response.js) - represent HTTP response
- [buildErrorWrapper](./lib/build-error-wrapper.js) - build a wrapper which could handle the error logic
- [buildDownwardWrapper](./lib/build-downward-wrapper.js) - build a wrapper which could handle the downward logic
- [buildUpwardWrapper](./lib/build-upward-wrapper.js) - build a wrapper which could handle the upward logic
- [handleErrors](./lib/wrappers/handle-errors.js) - default error handler wrapper shipped with this package

## Motivation

Why yet another HTTP toolkit? We already have [express](https://expressjs.com/), [koa](http://koajs.com/), 
[micro](https://github.com/zeit/micro), and [node http](https://nodejs.org/docs/latest-v8.x/api/http.html), but all of 
them apply a side-effect handling model, say, user handles the request by manipulating the response object. This is 
neither intuitive nor convenient, because it doesn't match the http request-response (RR) handling model, which is just 
a simple function: 

```
async (request) => response
```

By applying such a model, handling http request becomes straight forward. Extending the handler also becomes simple and 
easy, with no magic, by just composing wrappers, as what 
[recompose](https://github.com/acdlite/recompose) do to React.

## License

MIT

## Todo

- write tutorials
- write api docs
- release v1