# The HTTP (TH)

The way we build HTTP service.


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

## License

MIT
