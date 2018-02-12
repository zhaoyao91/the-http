const fetch = require('node-fetch')
const http = require('http')
const {adapt, Response} = require('../index')

describe('adapt', () => {
  let server = null

  afterEach(() => {
    server.close()
    server = null
  })

  it('should create a typical http server', async () => {
    const port = 3000
    const url = `http://localhost:${port}`
    const handler = (request) => Response.withTextBody('Hello World')
    const httpHandler = adapt(handler)
    server = http.createServer(httpHandler)
    server.listen(port)
    const response = await fetch(url)
    const body = await response.text()
    expect(body).toBe('Hello World')
  })
})
