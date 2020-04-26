const httpMocks = require('node-mocks-http')
const mongoose = require('mongoose')
const getBooks = require('./index')

const clearModels = require('../../../mock/clearModels')
const installBooks = require('../../../mock/installBook')

const { mongoTestUrl } = require('../../../variables')

const Book = require('../../../models/books.model')
const mockReq = (currentBook) => {
  return { currentBook }
}

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
    test(`errMessage must be 'error from getBookById'`, async () => {
      expect(response._getData().errMessage).toEqual('error from getBookById')
    })
    test(`errKey must be ${'error_from_getBookById'.toUpperCase()}`, async () => {
      expect(response._getData().errKey).toEqual(
        'error_from_getBookById'.toUpperCase()
      )
    })
  })
  describe('Case: Success', () => {
    let currentBook = null
    let response = null

    beforeAll(async (done) => {
      const currentBook = await Book.findOne()
      const req = mockReq(currentBook)
      const res = httpMocks.createResponse()
      response = await getBooks(req, res)
      done()
    })
    test(`status must be 200`, async () => {
      console.log(response._getData().book)
      expect(response.statusCode).toEqual(200)
    })
  })
  afterAll(async (done) => {
    await clearModels()
    await mongoose.connection.close()
    done()
  })
})
