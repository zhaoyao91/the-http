const {Readable} = require('stream')

const {Response} = require('../index')

describe('Response', () => {
  it('should set status code', () => {
    const response = new Response()
    response.statusCode = 404
    expect(response.statusCode).toBe(404)
  })

  it('should set headers', () => {
    const response = new Response()
    const headers = {'content-type': 'application/json'}
    response.headers = headers
    expect(response.headers).toBe(headers)
  })

  it('should set body', () => {
    const response = new Response()
    const body = 'Hello World'
    response.body = body
    expect(response.body).toBe(body)
  })

  it('should set a header', () => {
    const response = new Response()
    response.setHeader('Content-Type', 'application/json')
    expect(response.getHeader('content-type')).toBe('application/json')
  })

  it('should create a response with given status code', () => {
    const response = Response.withStatusCode(404)
    expect(response.statusCode).toBe(404)
    expect(response.body).toBe('Not Found')
  })

  it('should create a response with given buffer body', () => {
    const response = Response.withBufferBody(Buffer.from('hello'))
    expect(response.body).toBeInstanceOf(Buffer)
    expect(response.body.toString()).toBe('hello')
    expect(response.getHeader('content-type')).toBe('application/octet-stream')
  })

  it('should create a response with given stream body', () => {
    const response = Response.withStreamBody(new Readable())
    expect(response.body).toBeInstanceOf(Readable)
    expect(response.getHeader('content-type')).toBe('application/octet-stream')
  })

  it('should create a response with given text body', () => {
    const response = Response.withTextBody(123)
    expect(typeof response.body).toBe('string')
    expect(response.body).toBe('123')
    expect(response.getHeader('content-type')).toBe('text/plain; charset=utf-8')
  })

  it('should create a response with given json body', () => {
    const body = {name: 'Bob'}
    const response = Response.withJSONBody(body)
    expect(typeof response.body).toBe('string')
    expect(response.body).toBe(JSON.stringify(body))
    expect(response.getHeader('content-type')).toBe('application/json; charset=utf-8')
  })
})
