const httpMocks = require('node-mocks-http')
const Joi = require('@hapi/joi')

const schema = Joi.object({
  query: Joi.object()
})

const mockReq = () => {
  return {
    query: {
      filter: {
        status: 'sent'
      },
      sort: { timestamp: -1 },
      skip: 50,
      limit: 100,
      projection: { id: 1 },
      population: [{ path: 'logs', select: { ip: 1 } }]
    }
  }
}

const allowProjectionAndPopulation = require('./index')

describe(`Test middlewares/allowProjectionAndPopulation`, () => {
  describe('Case: Bad Parameter', () => {
    let next = null
    let response = null

    beforeAll(async (done) => {
      const req = null
      const res = httpMocks.createResponse()
      next = jest.fn()
      response = await allowProjectionAndPopulation(req, res, next)
      done()
    })
    test(`status must be 400`, async () => {
      expect(response.statusCode).toEqual(400)
    })
    test(`errMessage must be 'error from middleware/allowProjectionAndPopulation'`, async () => {
      expect(response._getData().errMessage).toEqual(
        'error from middleware/allowProjectionAndPopulation'
      )
    })
    test(`errKey must be ${'error_from_middleware/allowProjectionAndPopulation'.toUpperCase()}`, async () => {
      expect(response._getData().errKey).toEqual(
        'error_from_middleware/allowProjectionAndPopulation'.toUpperCase()
      )
    })
    test(`next must be not called`, async () => {
      expect(next).not.toBeCalled()
    })
  })
  describe('Case: Success', () => {
    let next = null
    let req = mockReq()

    beforeAll(async (done) => {
      const res = httpMocks.createResponse()
      next = jest.fn()
      response = await allowProjectionAndPopulation(req, res, next)
      done()
    })
    test(`next must be called`, async () => {
      expect(next).toBeCalled()
    })
    test(`req.query have projection`, async () => {
      expect(req.query.hasOwnProperty('projection')).toEqual(true)
    })
    test(`req.query have population`, async () => {
      expect(req.query.hasOwnProperty('population')).toEqual(true)
    })
  })
})
