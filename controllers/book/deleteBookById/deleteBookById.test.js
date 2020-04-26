const httpMocks = require('node-mocks-http')
const mongoose = require('mongoose')
const deleteBookById = require('./index')

const clearModels = require('../../../mock/clearModels')
const installBooks = require('../../../mock/installBook')

const { mongoTestUrl } = require('../../../variables')

const Book = require('../../../models/books.model')
const mockReq = (bookId) => {
  return { params: { bookId } }
}

describe(`Test controllers/book/deleteBookById`, () => {
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
      response = await deleteBookById(req, res)
      done()
    })
    test(`status must be 400`, async () => {
      expect(response.statusCode).toEqual(400)
    })
    test(`errMessage must be 'error from deleteBookById'`, async () => {
      expect(response._getData().errMessage).toEqual(
        'error from deleteBookById'
      )
    })
    test(`errKey must be ${'error_from_deleteBookById'.toUpperCase()}`, async () => {
      expect(response._getData().errKey).toEqual(
        'error_from_deleteBookById'.toUpperCase()
      )
    })
  })
  describe('Case: Success', () => {
    let bookId = null
    let response = null

    beforeAll(async (done) => {
      const currentBook = await Book.findOne()
      bookId = currentBook._id
      const req = mockReq(bookId)
      const res = httpMocks.createResponse()
      response = await deleteBookById(req, res)
      done()
    })
    test(`status must be 200`, async () => {
      expect(response.statusCode).toEqual(200)
    })
    test(`Should can not find book from bookId`, async () => {
      const checkBook = await Book.findById(bookId)
      expect(checkBook).toEqual(null)
    })
  })
  afterAll(async (done) => {
    await clearModels()
    await mongoose.connection.close()
    done()
  })
})
