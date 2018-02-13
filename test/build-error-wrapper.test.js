const fetch = require('node-fetch')
const {listen, Response, buildErrorWrapper} = require('../index')

describe('buildErrorWrapper', () => {
  let server = null

  afterEach(() => {
    server.close()
    server = null
  })

  it('should return the error message', async () => {
    const port = 3000
    const url = `http://localhost:${port}`
    const handler = async (request) => { throw new Error('Wops') }
    const wrapper = buildErrorWrapper((error) => {
      return Response.withTextBody(error.message)
    })
    server = listen(port)(wrapper(handler))
    const response = await fetch(url)
    const body = await response.text()
    expect(body).toBe('Wops')
  })
})
