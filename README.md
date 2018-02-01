# The HTTP (TH)

The way we build HTTP service.

## Introduction

- **Modern**: Using `async/await` instead of `callback`
- **Simple**: Simple function model: `async (request) => response`
- **Extensible**: Via making and composing intuitive wrappers
- **Standard**: Just HTTP
- **Micro**: Suitable for micro service

## Catalog

- [Install](#install)
- [Getting started](#getting-started)
- [Core concepts](#core-concepts)
- [API](#api)
- More
  - [Motivation](./docs/motivation.md)
  - Tutorials
    - create a service 1 (hello-world)
    - create a service 2 (password-checking)
    - create customized error handler
    - create a downward wrapper
    - create a upward wrapper
    - create a advanced wrapper

## Install

```
npm i --save the-http
```

## Getting Started

```ecmascript 6
const {createServer} = require('http')
const {Response, compose, adapt, handleErrors} = require('the-http') 

async function handler(request) {
  const body = await request.body.fetch()
  const {name, age} = body.json
  return Response.fromTextBody(`Hello ${name}, you are ${age} years old.`)
}

const server = createServer(compose(
  adapt,
  handleErrors
)(handler))

server.listen(3000)
```

## Core Concepts

- Request - represent HTTP request
- Response - represent HTTP response
- Context - plain js object, used to hold the outputs of wrappers
- Handler (or THHandler) - `async (Request, Context) => Response`
- Wrapper (or THWrapper) - `(Handler) => Handler`

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

## License

MIT

## Todo

- write tutorials
- release v1