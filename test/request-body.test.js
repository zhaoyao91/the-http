const fetch = require('node-fetch')
const isStream = require('is-stream')

const {Response, listen, RequestBody} = require('../index')

describe('RequestBody', () => {
  let server = null

  afterEach(() => {
    server.close()
    server = null
  })

  describe('stream', () => {
    it('should return a readable stream', async () => {
      const port = 3000
      const url = `http://localhost:${port}`
      const handler = (request) => {
        expect(isStream.readable(request.body.stream)).toBe(true)
        return new Response()
      }
      server = listen(port)(handler)
      const response = await fetch(url)
      expect(response.ok).toBe(true)
    })
  })

  describe('asBuffer', () => {
    it('should return a buffer body', async () => {
      const port = 3000
      const url = `http://localhost:${port}`
      const data = {name: 'Bob', age: 20}
      const handler = async (request) => {
        const body = await request.body.asBuffer()
        expect(body).toBeInstanceOf(Buffer)
        return new Response()
      }
      server = listen(port)(handler)
      const response = await fetch(url, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
      })
      expect(response.ok).toBe(true)
    })
  })

  describe('asText', () => {
    it('should return a text body', async () => {
      const port = 3000
      const url = `http://localhost:${port}`
      const data = {name: 'Bob', age: 20}
      const handler = async (request) => {
        const body = await request.body.asText()
        expect(body).toBe(JSON.stringify(data))
        return new Response()
      }
      server = listen(port)(handler)
      const response = await fetch(url, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
      })
      expect(response.ok).toBe(true)
    })
  })

  describe('asJSON', () => {
    it('should return a json body', async () => {
      const port = 3000
      const url = `http://localhost:${port}`
      const data = {name: 'Bob', age: 20}
      const handler = async (request) => {
        const body = await request.body.asJSON()
        expect(body).toEqual(data)
        return new Response()
      }
      server = listen(port)(handler)
      const response = await fetch(url, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
      })
      expect(response.ok).toBe(true)
    })
  })
})
