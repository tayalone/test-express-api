const httpMocks = require('node-mocks-http')

const generateQueryParam = require('./index')

describe(`Test middlewares/generateQueryParam`, () => {
  describe('Case: Bad Parameter', () => {
    let next = null
    let response = null

    beforeAll(async (done) => {
      const req = null
      const res = httpMocks.createResponse()
      next = jest.fn()
      response = await generateQueryParam(req, res, next)
      done()
    })
    test(`status must be 400`, async () => {
      expect(response.statusCode).toEqual(400)
    })
    test(`errMessage must be 'error from middleware/generateQueryParam'`, async () => {
      expect(response._getData().errMessage).toEqual(
        'error from middleware/generateQueryParam'
      )
    })
    test(`errKey must be ${'error_from_middleware/generateQueryParam'.toUpperCase()}`, async () => {
      expect(response._getData().errKey).toEqual(
        'error_from_middleware/generateQueryParam'.toUpperCase()
      )
    })
    test(`next must be not called`, async () => {
      expect(next).not.toBeCalled()
    })
  })
  describe('Case: Success', () => {
    let next = null
    beforeAll(async (done) => {
      const req = { query: '' }
      const res = httpMocks.createResponse()
      next = jest.fn()
      response = await generateQueryParam(req, res, next)
      done()
    })
    test(`next must be called`, async () => {
      expect(next).toBeCalled()
    })
  })
})
