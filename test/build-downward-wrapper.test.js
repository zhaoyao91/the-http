const fetch = require('node-fetch')
const {listen, Response, buildDownwardWrapper} = require('../index')

describe('buildDownwardWrapper', () => {
  let server = null

  afterEach(() => {
    server.close()
    server = null
  })

  it('should map the request', async () => {
    const port = 3000
    const url = `http://localhost:${port}`
    const handler = (request) => Response.withJSONBody(request.context)
    const wrapper = buildDownwardWrapper((request) => {
      request.context.name = 'Bob'
      return request
    })
    server = listen(port)(wrapper(handler))
    const response = await fetch(url)
    const body = await response.json()
    expect(body).toEqual({name: 'Bob'})
  })

  it('should return the response directly', async () => {
    const port = 3000
    const url = `http://localhost:${port}`
    const handler = (request) => Response.withTextBody('ping')
    const wrapper = buildDownwardWrapper(async (request) => {
      return Response.withTextBody('pong')
    })
    server = listen(port)(wrapper(handler))
    const response = await fetch(url)
    const body = await response.text()
    expect(body).toBe('pong')
  })
})
