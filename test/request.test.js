const fetch = require('node-fetch')

const {Response, listen, RequestBody} = require('../index')

describe('request', () => {
  let server = null

  afterEach(() => {
    server.close()
    server = null
  })

  it('should have proper fields', async () => {
    const port = 3000
    const url = `http://localhost:${port}?name=bob`
    const handler = (request) => {
      expect(request.httpVersion).toBe('1.1')
      expect(request.method).toBe('GET')
      expect(request.url).toBe('/?name=bob')
      expect(request.query).toBe('name=bob')
      expect(typeof request.headers).toBe('object')
      expect(request.body instanceof RequestBody).toBe(true)
      expect(typeof request.parsedUrl).toBe('object')
      expect(typeof request.parsedQuery).toBe('object')
      return new Response()
    }
    server = listen(port)(handler)
    const response = await fetch(url)
    expect(response.ok).toBe(true)
  })
})
