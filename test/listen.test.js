const fetch = require('node-fetch')
const {listen, Response} = require('../index')

describe('listen', () => {
  let server = null

  afterEach(() => {
    server.close()
    server = null
  })

  it('should create a typical http server', async () => {
    const port = 3000
    const url = `http://localhost:${port}`
    const handler = (request) => Response.withTextBody('Hello World')
    server = listen(port)(handler)
    const response = await fetch(url)
    const body = await response.text()
    expect(body).toBe('Hello World')
  })
})
