const fetch = require('node-fetch')
const {listen, HTTPError, handleErrors} = require('../index')

describe('buildErrorWrapper', () => {
  let server = null

  afterEach(() => {
    server.close()
    server = null
  })

  it('should return the corresponding error code and message', async () => {
    const port = 3000
    const url = `http://localhost:${port}`
    const logError = (err) => expect(err).toBeInstanceOf(HTTPError)
    const handler = async (request) => { throw new HTTPError(404) }
    server = listen(port)(handleErrors({logError})(handler))
    const response = await fetch(url)
    const body = await response.text()
    expect(response.status).toBe(404)
    expect(body).toBe('Not Found')
  })

  it('should return 500 error', async () => {
    const port = 3000
    const url = `http://localhost:${port}`
    const logError = (err) => expect(err.message).toBe('Wops')
    const handler = async (request) => { throw new Error('Wops') }
    server = listen(port)(handleErrors({logError})(handler))
    const response = await fetch(url)
    const body = await response.text()
    expect(response.status).toBe(500)
    expect(body).toBe('Internal Server Error')
  })
})
