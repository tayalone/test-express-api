const httpMocks = require('node-mocks-http')
const mongoose = require('mongoose')
const getBooks = require('./index')

const clearModels = require('../../../mock/clearModels')
const installBooks = require('../../../mock/installBook')

const { mongoTestUrl } = require('../../../variables')

describe(`Test controllers/book/getBooks`, () => {
  beforeAll(async (done) => {
    await mongoose.connect(mongoTestUrl, {
      useCreateIndex: true,
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    await clearModels()
    await installBooks()
    done()
  })
  describe('Case: Bad Parameter', () => {
    let response = null

    beforeAll(async (done) => {
      const req = null
      const res = httpMocks.createResponse()
      response = await getBooks(req, res)
      done()
    })
    test(`status must be 400`, async () => {
      expect(response.statusCode).toEqual(400)
    })
    test(`errMessage must be 'error from getBooks'`, async () => {
      expect(response._getData().errMessage).toEqual('error from getBooks')
    })
    test(`errKey must be ${'error_from_getBooks'.toUpperCase()}`, async () => {
      expect(response._getData().errKey).toEqual(
        'error_from_getBooks'.toUpperCase()
      )
    })
  })
  describe('Case: Success', () => {
    let req = { query: { skip: 0, limit: 10 } }
    let response = null
    beforeAll(async (done) => {
      const res = httpMocks.createResponse()
      response = await getBooks(req, res)
      done()
    })
    test(`status must be 200`, async () => {
      expect(response.statusCode).toEqual(200)
    })
    test(`book legth must be 10`, async () => {
      const books = response._getData().books
      const lengthOfBooks = [...books].length

      expect(lengthOfBooks).toEqual(lengthOfBooks)
    })
  })

  afterAll(async (done) => {
    await clearModels()
    await mongoose.connection.close()
    done()
  })
})
