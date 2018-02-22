# The HTTP (TH)

A toolkit to help build HTTP service.

## Features

- **Modern**: Using `async/await` instead of `callback`
- **Simple**: Simple function model: `async (request) => response`
- **Extensible**: Via making and composing intuitive wrappers
- **Standard**: Just HTTP
- **Micro**: Suitable for micro service

## Categories

- [Motivation](./docs/motivation.md)
- [Install](#install)
- [Getting Started](#getting-started)
- [API](./docs/api.md)

## Install

```
npm i --save the-http
```

## Getting Started

```ecmascript 6
const {Response, compose, handleErrors, listen} = require('the-http') 

async function handler(request) {
  const {name, age} = await request.body.asJSON()
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

See [RequestBody](./docs/api.md#requestbody), [Request](./docs/api.md#request), [Response](./docs/api.md#response) and more in [API doc](./docs/api.md).

## Awesome List

- [the-http-router](https://github.com/zhaoyao91/the-http-router)

## License

MIT
