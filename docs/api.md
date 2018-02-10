# API

## Core Concepts

### Handler

**Function**: `async (Request) => Response `

### Wrapper

**Function**: `(handler) => handler`

## Basic Components

### listen

**Function**: `(...args) => (handler) => server`

Create an http server and listen for requests.

- `args` - see [http server](https://nodejs.org/api/http.html#http_server_listen).

### RequestBody

**Class**

Represent a Http request body.

- `get stream` - the raw body readable stream
- `async asBuffer(options?): Buffer` - get the raw body as buffer
  - `options.limit?=1mb` - max size of the raw body, see [raw-body](https://github.com/stream-utils/raw-body#getrawbodystream-options-callback)
- `async asText(options?): String` - get the raw body as string
- `async asJSON(options?): Any` - get the raw body as JSON object

### Request

**Class**

Represent a HTTP request.

- `get httpVersion: String`
- `get method: String`
- `get url: String`
- `get query: String`
- `get headers: Object` - see [message.headers](https://nodejs.org/api/http.html#http_message_headers)
- `get body: RequestBody` - see [RequestBody](#requestbody)
- `get parsedUrl: Object` - result of [url.parse](https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost)
- `get parsedQuery: Object` - result of [querystring.parse](https://nodejs.org/api/querystring.html#querystring_querystring_parse_str_sep_eq_options)
- `context: Object` - a plain js object used to hold wrapper-generated information

### Response

**Class**

Represent a HTTP response.

- `set statusCode(code: Number)`
- `get statusCode: Number` 
- `set headers(headers: Object)` - generally you should use `setHeader` to avoid duplicate header. but if you know what you are doing, you can use this setter to update headers more effectively
- `get headers: Object`
- `set body(body: String|Buffer|ReadableStream)`
- `get body: body`
- `setHeader(name: String, value: String|String[])` - the name will be converted into lower case
- `getHeader(name: String): value`
- `static withStatusCode(statusCode, message?): Response` - build a response with given status code
  - `message?` - if not provided, it will be set as the standard error message of this status code
- `static withBufferBody(body: Buffer): Response` - build a response with given buffer body. the content-type header will be set as 'application/octet-stream'
- `static withStreamBody(body: ReadableStream): Response` - build a response with given stream body. the content-type header will be set as 'application/octet-stream'
- `static withTextBody(body: Any): Response` - build a response with given text body. the body could be of any type, but it will be converted into string. the content-type header will be set as 'text/plain; charset=utf-8'
- `static withJSONBody(body: Any): Response` - build a response with given JSON body. the body could be of any type, but it will be converted into JSON string. the content-type header will be set as 'application/json; charset=utf-8'

## Advanced Components

### compose

**Function**: `(...wrappers) => wrapper`

Simple compose function to help compose wrappers.

### handleErrors

**Function** `(options?) => wrapper`

Default error handler shipped with this package.

If the error is an instance of HTTP Error, it will parse the status code and message, otherwise 500 will be generated.

It returns a response based on the parsed status code and message. And if the error is not a client error, it will also try to log it. 

- `options.logError?` - the error logger function. if false, errors will not be logged

### adapt

**Function**: `(handler) => nodeHttpHandler`

Convert a TH handler into a node http handler.

### HTTPError

**Class**

Represent a http error that should be present to client.

- `constructor(statusCode?, message?, originalError?)`

### buildErrorWrapper

**Function**: (errorHandler) => wrapper

Build a wrapper which could handle the error logic.

- `errorHandler` - `async (err, request) => response`

### buildDownwardWrapper

**Function**: (downwardHandler) => wrapper

Build a wrapper which could handle the downward logic. Generally it maps request (context). But if it returns a response, the flow will return right from here, and the handlers below will be ignored

- `downwardHanlder` - `async (request) => request | response`

### buildUpwardWrapper

**Function** (upwardHandler) => wrapper

Build a wrapper which could handle the upward logic. Generally it maps response.

- `upwardHandler` - `async (response, request) => response` 