## Classes

<dl>
<dt><a href="#HTTPError">HTTPError</a></dt>
<dd><p>Represent a HTTP error with status code and message.</p>
</dd>
<dt><a href="#RequestBody">RequestBody</a></dt>
<dd><p>Represent the body (payload or data) of a HTTP request.
You can handle it via the stream field
or fetch and use it as buffer, text or json via the provided helpers</p>
</dd>
<dt><a href="#Request">Request</a></dt>
<dd><p>Represent a HTTP request.</p>
</dd>
<dt><a href="#Response">Response</a></dt>
<dd><p>Represent a HTTP response.
By default, a response is just like a plain object with some default values.
You can create a response and set it on your own.
However, it&#39;s usually convenient and better to use the static builders to build a proper initial response
and make any needed adjustment to it.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#adapt">adapt(handler)</a> ⇒ <code><a href="#NodeHTTPHandler">NodeHTTPHandler</a></code></dt>
<dd><p>Convert a TH handler into a node HTTP handler.</p>
</dd>
<dt><a href="#buildDownwardWrapper">buildDownwardWrapper(downwardHandler)</a> ⇒ <code><a href="#THWrapper">THWrapper</a></code></dt>
<dd><p>Build a wrapper which could handle the downward logic.
Generally it maps request (context),
but if it returns a response, the flow will return right here, and the handlers below will be ignored.</p>
</dd>
<dt><a href="#buildErrorWrapper">buildErrorWrapper(errorHandler)</a> ⇒ <code><a href="#THWrapper">THWrapper</a></code></dt>
<dd><p>Build a wrapper which could handle the error logic.</p>
</dd>
<dt><a href="#buildUpwardWrapper">buildUpwardWrapper(upwardHandler)</a> ⇒ <code><a href="#THWrapper">THWrapper</a></code></dt>
<dd><p>Build a wrapper which could handle the upward logic.
Generally it maps response.</p>
</dd>
<dt><a href="#compose">compose(...wrappers)</a> ⇒ <code><a href="#THWrapper">THWrapper</a></code></dt>
<dd><p>Compose wrappers</p>
</dd>
<dt><a href="#listen">listen()</a> : <code>function</code></dt>
<dd><p>Create a http server and listen for connections.</p>
</dd>
<dt><a href="#handleErrors">handleErrors([options])</a> ⇒ <code><a href="#THWrapper">THWrapper</a></code></dt>
<dd><p>Provided default error handler wrapper.
Generate response from the error and return it.
If it&#39;s not a http client error, then log it.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#THHandler">THHandler</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#NodeHTTPHandler">NodeHTTPHandler</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#THWrapper">THWrapper</a> : <code>function</code></dt>
<dd></dd>
</dl>

<a name="HTTPError"></a>

## HTTPError
Represent a HTTP error with status code and message.

**Kind**: global class  
<a name="new_HTTPError_new"></a>

### new HTTPError([statusCode], [message], [originalError])

| Param | Type |
| --- | --- |
| [statusCode] | <code>number</code> | 
| [message] | <code>string</code> | 
| [originalError] | <code>Error</code> | 

<a name="RequestBody"></a>

## RequestBody
Represent the body (payload or data) of a HTTP request.
You can handle it via the stream field
or fetch and use it as buffer, text or json via the provided helpers

**Kind**: global class  

* [RequestBody](#RequestBody)
    * [.stream](#RequestBody+stream) : <code>ReadableStream</code>
    * [.asBuffer([options])](#RequestBody+asBuffer) ⇒ <code>Promise.&lt;Buffer&gt;</code>
    * [.asText([options])](#RequestBody+asText) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.asJSON([options])](#RequestBody+asJSON) ⇒ <code>Promise.&lt;\*&gt;</code>

<a name="RequestBody+stream"></a>

### requestBody.stream : <code>ReadableStream</code>
**Kind**: instance property of [<code>RequestBody</code>](#RequestBody)  
<a name="RequestBody+asBuffer"></a>

### requestBody.asBuffer([options]) ⇒ <code>Promise.&lt;Buffer&gt;</code>
Get the body as buffer.

**Kind**: instance method of [<code>RequestBody</code>](#RequestBody)  

| Param | Type | Default |
| --- | --- | --- |
| [options] | <code>Object</code> |  | 
| [options.limit] | <code>string</code> | <code>&quot;1mb&quot;</code> | 

<a name="RequestBody+asText"></a>

### requestBody.asText([options]) ⇒ <code>Promise.&lt;string&gt;</code>
Get the body as string.

**Kind**: instance method of [<code>RequestBody</code>](#RequestBody)  

| Param | Type | Default |
| --- | --- | --- |
| [options] | <code>Object</code> |  | 
| [options.limit] | <code>string</code> | <code>&quot;1mb&quot;</code> | 

<a name="RequestBody+asJSON"></a>

### requestBody.asJSON([options]) ⇒ <code>Promise.&lt;\*&gt;</code>
Get the body as JSON object.

**Kind**: instance method of [<code>RequestBody</code>](#RequestBody)  

| Param | Type | Default |
| --- | --- | --- |
| [options] | <code>Object</code> |  | 
| [options.limit] | <code>string</code> | <code>&quot;1mb&quot;</code> | 

<a name="Request"></a>

## Request
Represent a HTTP request.

**Kind**: global class  

* [Request](#Request)
    * [.httpVersion](#Request+httpVersion) : <code>string</code>
    * [.method](#Request+method) : <code>string</code>
    * [.url](#Request+url) : <code>string</code>
    * [.query](#Request+query) : <code>string</code>
    * [.headers](#Request+headers) : <code>Object</code>
    * [.body](#Request+body) : [<code>RequestBody</code>](#RequestBody)
    * [.parsedUrl](#Request+parsedUrl) : <code>Object</code>
    * [.parsedQuery](#Request+parsedQuery) : <code>Object</code>

<a name="Request+httpVersion"></a>

### request.httpVersion : <code>string</code>
**Kind**: instance property of [<code>Request</code>](#Request)  
<a name="Request+method"></a>

### request.method : <code>string</code>
**Kind**: instance property of [<code>Request</code>](#Request)  
<a name="Request+url"></a>

### request.url : <code>string</code>
**Kind**: instance property of [<code>Request</code>](#Request)  
<a name="Request+query"></a>

### request.query : <code>string</code>
**Kind**: instance property of [<code>Request</code>](#Request)  
<a name="Request+headers"></a>

### request.headers : <code>Object</code>
**Kind**: instance property of [<code>Request</code>](#Request)  
**See**: [headers](https://nodejs.org/docs/latest-v8.x/api/http.html#http_message_headers)  
<a name="Request+body"></a>

### request.body : [<code>RequestBody</code>](#RequestBody)
**Kind**: instance property of [<code>Request</code>](#Request)  
<a name="Request+parsedUrl"></a>

### request.parsedUrl : <code>Object</code>
Url object parsed by [url](https://nodejs.org/docs/latest-v8.x/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost).

**Kind**: instance property of [<code>Request</code>](#Request)  
<a name="Request+parsedQuery"></a>

### request.parsedQuery : <code>Object</code>
Query object parsed by [querystring](https://nodejs.org/docs/latest-v8.x/api/querystring.html#querystring_querystring_parse_str_sep_eq_options).

**Kind**: instance property of [<code>Request</code>](#Request)  
<a name="Response"></a>

## Response
Represent a HTTP response.
By default, a response is just like a plain object with some default values.
You can create a response and set it on your own.
However, it's usually convenient and better to use the static builders to build a proper initial response
and make any needed adjustment to it.

**Kind**: global class  

* [Response](#Response)
    * [new Response()](#new_Response_new)
    * _instance_
        * [.statusCode](#Response+statusCode) : <code>number</code>
        * [.headers](#Response+headers) : <code>Object</code>
        * [.body](#Response+body) : <code>string</code> \| <code>Buffer</code> \| <code>ReadableStream</code>
        * [.setHeader(name, value)](#Response+setHeader)
        * [.getHeader(name)](#Response+getHeader) ⇒ <code>string</code> \| <code>Array.&lt;string&gt;</code>
    * _static_
        * [.withStatusCode(statusCode, [message])](#Response.withStatusCode) ⇒ [<code>Response</code>](#Response)
        * [.withBufferBody(bufferBody)](#Response.withBufferBody) ⇒ [<code>Response</code>](#Response)
        * [.withStreamBody(streamBody)](#Response.withStreamBody) ⇒ [<code>Response</code>](#Response)
        * [.withTextBody(textBody)](#Response.withTextBody) ⇒ [<code>Response</code>](#Response)
        * [.withJSONBody(jsonBody)](#Response.withJSONBody) ⇒ [<code>Response</code>](#Response)

<a name="new_Response_new"></a>

### new Response()
Create a new response and set the default fields

<a name="Response+statusCode"></a>

### response.statusCode : <code>number</code>
Status code of this response.
The range is [100, 600)

**Kind**: instance property of [<code>Response</code>](#Response)  
<a name="Response+headers"></a>

### response.headers : <code>Object</code>
Headers of this response.
Generally you should use `setHeader` to avoid duplicate headers,
but if you know what you are doing, you can use this setter to update headers more efficiently.

**Kind**: instance property of [<code>Response</code>](#Response)  
<a name="Response+body"></a>

### response.body : <code>string</code> \| <code>Buffer</code> \| <code>ReadableStream</code>
Body of this response.

**Kind**: instance property of [<code>Response</code>](#Response)  
<a name="Response+setHeader"></a>

### response.setHeader(name, value)
Set the header value of given header name.
The name will be converted to lowercase to avoid duplication.

**Kind**: instance method of [<code>Response</code>](#Response)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| value | <code>string</code> \| <code>Array.&lt;string&gt;</code> | 

<a name="Response+getHeader"></a>

### response.getHeader(name) ⇒ <code>string</code> \| <code>Array.&lt;string&gt;</code>
Return the header value of given header name.

**Kind**: instance method of [<code>Response</code>](#Response)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="Response.withStatusCode"></a>

### Response.withStatusCode(statusCode, [message]) ⇒ [<code>Response</code>](#Response)
Build a response with given status code.
The body will be set as the corresponding status text if not provided

**Kind**: static method of [<code>Response</code>](#Response)  

| Param | Type |
| --- | --- |
| statusCode | <code>number</code> | 
| [message] | <code>string</code> | 

<a name="Response.withBufferBody"></a>

### Response.withBufferBody(bufferBody) ⇒ [<code>Response</code>](#Response)
Build a response with given buffer body.
The content-type header will be set as 'application/octet-stream'.

**Kind**: static method of [<code>Response</code>](#Response)  

| Param | Type |
| --- | --- |
| bufferBody | <code>Buffer</code> | 

<a name="Response.withStreamBody"></a>

### Response.withStreamBody(streamBody) ⇒ [<code>Response</code>](#Response)
Build a response with given stream body.
The content-type header will be set as 'application/octet-stream'.

**Kind**: static method of [<code>Response</code>](#Response)  
**Returns**: [<code>Response</code>](#Response) - response  

| Param | Type |
| --- | --- |
| streamBody | <code>ReadableStream</code> | 

<a name="Response.withTextBody"></a>

### Response.withTextBody(textBody) ⇒ [<code>Response</code>](#Response)
Build a response with given text body.
The body could be of any type, but it will be converted into string.
The content-type header will be set as 'text/plain; charset=utf-8'.

**Kind**: static method of [<code>Response</code>](#Response)  
**Returns**: [<code>Response</code>](#Response) - response  

| Param |
| --- |
| textBody | 

<a name="Response.withJSONBody"></a>

### Response.withJSONBody(jsonBody) ⇒ [<code>Response</code>](#Response)
Build a response with given JSON body.
The body could be of any type, but it will be converted into JSON string.
The content-type header will be set as 'application/json; charset=utf-8'.

**Kind**: static method of [<code>Response</code>](#Response)  
**Returns**: [<code>Response</code>](#Response) - response  

| Param |
| --- |
| jsonBody | 

<a name="adapt"></a>

## adapt(handler) ⇒ [<code>NodeHTTPHandler</code>](#NodeHTTPHandler)
Convert a TH handler into a node HTTP handler.

**Kind**: global function  

| Param | Type |
| --- | --- |
| handler | [<code>THHandler</code>](#THHandler) | 

<a name="buildDownwardWrapper"></a>

## buildDownwardWrapper(downwardHandler) ⇒ [<code>THWrapper</code>](#THWrapper)
Build a wrapper which could handle the downward logic.
Generally it maps request (context),
but if it returns a response, the flow will return right here, and the handlers below will be ignored.

**Kind**: global function  

| Param | Type |
| --- | --- |
| downwardHandler | [<code>DownwardHandler</code>](#buildDownwardWrapper..DownwardHandler) | 

<a name="buildDownwardWrapper..DownwardHandler"></a>

### buildDownwardWrapper~DownwardHandler : <code>function</code>
**Kind**: inner typedef of [<code>buildDownwardWrapper</code>](#buildDownwardWrapper)  
**Prototype**: `async (request: Request) => Request|Response`  
**See**

- [Request](#Request)
- [Response](#Response)

<a name="buildErrorWrapper"></a>

## buildErrorWrapper(errorHandler) ⇒ [<code>THWrapper</code>](#THWrapper)
Build a wrapper which could handle the error logic.

**Kind**: global function  

| Param | Type |
| --- | --- |
| errorHandler | [<code>ErrorHandler</code>](#buildErrorWrapper..ErrorHandler) | 

<a name="buildErrorWrapper..ErrorHandler"></a>

### buildErrorWrapper~ErrorHandler : <code>function</code>
**Kind**: inner typedef of [<code>buildErrorWrapper</code>](#buildErrorWrapper)  
**Prototype**: `async (error: Error, request: Request) => Response`  
**See**

- [Request](#Request)
- [Response](#Response)

<a name="buildUpwardWrapper"></a>

## buildUpwardWrapper(upwardHandler) ⇒ [<code>THWrapper</code>](#THWrapper)
Build a wrapper which could handle the upward logic.
Generally it maps response.

**Kind**: global function  

| Param | Type |
| --- | --- |
| upwardHandler | [<code>UpwardHandler</code>](#buildUpwardWrapper..UpwardHandler) | 

<a name="buildUpwardWrapper..UpwardHandler"></a>

### buildUpwardWrapper~UpwardHandler : <code>function</code>
**Kind**: inner typedef of [<code>buildUpwardWrapper</code>](#buildUpwardWrapper)  
**Prototype**: `async (response: Response, request: Request) => Response`  
**See**

- [Request](#Request)
- [Response](#Response)

<a name="compose"></a>

## compose(...wrappers) ⇒ [<code>THWrapper</code>](#THWrapper)
Compose wrappers

**Kind**: global function  

| Param | Type |
| --- | --- |
| ...wrappers | [<code>Array.&lt;THWrapper&gt;</code>](#THWrapper) | 

<a name="listen"></a>

## listen() : <code>function</code>
Create a http server and listen for connections.

**Kind**: global function  
**Prototype**: `(...args) => (handler: THHandler) => NodeHTTPServer`  
**See**

- [THHandler](#THHandler)
- [Node.js server.listen](https://nodejs.org/docs/latest-v8.x/api/http.html#http_server_listen)

<a name="handleErrors"></a>

## handleErrors([options]) ⇒ [<code>THWrapper</code>](#THWrapper)
Provided default error handler wrapper.
Generate response from the error and return it.
If it's not a http client error, then log it.

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| [options] | <code>Object</code> |  | 
| [options.logError] | <code>function</code> | <code>console.error</code> | 

<a name="THHandler"></a>

## THHandler : <code>function</code>
**Kind**: global typedef  
**Prototype**: `async (request: Request) => Response`  
**See**

- [Request](#Request)
- [Response](#Response)

<a name="NodeHTTPHandler"></a>

## NodeHTTPHandler : <code>function</code>
**Kind**: global typedef  
**Prototype**: `(req, res) =>`  
**See**: [Node.js create server](https://nodejs.org/docs/latest-v8.x/api/http.html#http_http_createserver_requestlistener)  
<a name="THWrapper"></a>

## THWrapper : <code>function</code>
**Kind**: global typedef  
**Prototype**: `(handler: THHandler) => THHandler`  
**See**: [THHandler](#THHandler)  
