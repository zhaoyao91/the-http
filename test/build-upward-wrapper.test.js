const fetch = require('node-fetch')
const {listen, Response, buildUpwardWrapper} = require('../index')

describe('buildUpwardWrapper', () => {
  let server = null

  afterEach(() => {
    server.close()
    server = null
  })

  it('should return a new response based on the previous one', async () => {
    const port = 3000
    const url = `http://localhost:${port}`
    const handler = (request) => Response.withTextBody('Hello')
    const wrapper = buildUpwardWrapper((response) => {
      return Response.withTextBody(response.body + ' World')
    })
    server = listen(port)(wrapper(handler))
    const response = await fetch(url)
    const body = await response.text()
    expect(body).toBe('Hello World')
  })
})
