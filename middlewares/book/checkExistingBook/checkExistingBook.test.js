const mongoose = require('mongoose')
const httpMocks = require('node-mocks-http')

const clearModels = require('../../../mock/clearModels')
const installBooks = require('../../../mock/installBook')

const { mongoTestUrl } = require('../../../variables')

const checkExistingBook = require('./index')
const Book = require('../../../models/books.model')

const mockReq = (bookId) => {
  return { params: { bookId } }
}

describe('test endpoint get:/v1/books', () => {
  let successBookId = ''
  const failedBookId = '507f1f77bcf86cd799439011'
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

    const currentBook = await Book.findOne()
    successBookId = currentBook._id
    done()
  })
  describe('Case: Bad Parameter', () => {
    let next = null
    let response = null

    beforeAll(async (done) => {
      const req = null
      const res = httpMocks.createResponse()
      next = jest.fn()
      response = await checkExistingBook(req, res, next)
      done()
    })
    test(`status must be 400`, async () => {
      expect(response.statusCode).toEqual(400)
    })
    test(`errMessage must be 'error from middlewares/book/checkExistingBook'`, async () => {
      expect(response._getData().errMessage).toEqual(
        'error from middlewares/book/checkExistingBook'
      )
    })
    test(`errKey must be ${'error_from_middlewares/book/checkExistingBook'.toUpperCase()}`, async () => {
      expect(response._getData().errKey).toEqual(
        'error_from_middlewares/book/checkExistingBook'.toUpperCase()
      )
    })
    test(`next must be not called`, async () => {
      expect(next).not.toBeCalled()
    })
  })

  describe('Case: Book does not exist', () => {
    let next = null
    let response = null

    beforeAll(async (done) => {
      const req = mockReq(failedBookId)
      const res = httpMocks.createResponse()
      next = jest.fn()
      response = await checkExistingBook(req, res, next)
      done()
    })
    test(`status must be 400`, async () => {
      expect(response.statusCode).toEqual(400)
    })
    test(`errMessage must be 'book does not exist'`, async () => {
      expect(response._getData().errMessage).toEqual('book does not exist')
    })
    test(`errKey must be ${'book_does_not_exist'.toUpperCase()}`, async () => {
      expect(response._getData().errKey).toEqual(
        'book_does_not_exist'.toUpperCase()
      )
    })
    test(`next must be not called`, async () => {
      expect(next).not.toBeCalled()
    })
  })

  describe('Case: Book exist', () => {
    let next = null

    beforeAll(async (done) => {
      const req = mockReq(successBookId)
      const res = httpMocks.createResponse()
      next = jest.fn()
      await checkExistingBook(req, res, next)
      done()
    })
    test(`next must be called`, async () => {
      expect(next).toBeCalled()
    })
  })
  //   describe('Case: No Params', () => {
  //     let response = null
  //     let books = []

  //     beforeAll(async (done) => {
  //       response = await request.get('/v1/books')
  //       books = response.body.books

  //       done()
  //     })
  //     test('status must be 200 ', () => {
  //       expect(response.status).toEqual(200)
  //     })
  //     test('length of books must be 29 ', () => {
  //       expect(books.length).toEqual(29)
  //     })
  //   })
  //   describe(`Case: test filter with status 'PUBLISH'`, () => {
  //     let books = []
  //     beforeAll(async (done) => {
  //       response = await request.get('/v1/books?status=PUBLISH')
  //       books = response.body.books
  //       done()
  //     })
  //     test('status must be 200 ', () => {
  //       expect(response.status).toEqual(200)
  //     })
  //     test(`status of all data must be  'PUBLISH'`, () => {
  //       const checkAllStatus = books.reduce((acc, book) => {
  //         const { status } = book
  //         return acc && status === 'PUBLISH'
  //       }, true)
  //       expect(checkAllStatus).toEqual(true)
  //     })
  //   })
  //   describe(`Case: test get limit 10 data`, () => {
  //     let books = []
  //     beforeAll(async (done) => {
  //       response = await request.get('/v1/books?limit=10')
  //       books = response.body.books
  //       done()
  //     })
  //     test('status must be 200 ', () => {
  //       expect(response.status).toEqual(200)
  //     })
  //     test(`length of book must be '10'`, () => {
  //       expect(books.length).toEqual(10)
  //     })
  //   })
  //   describe(`Case: test get skip 10 data`, () => {
  //     let oldBooks = []
  //     let newBooks = []
  //     beforeAll(async (done) => {
  //       response = await request.get('/v1/books?limit=10')
  //       oldBooks = response.body.books
  //       response = await request.get('/v1/books?limit=10&skip=10')
  //       newBooks = response.body.books
  //       done()
  //     })
  //     test('status must be 200 ', () => {
  //       expect(response.status).toEqual(200)
  //     })
  //     test(`length of book must be '10'`, () => {
  //       expect(newBooks.length).toEqual(10)
  //     })
  //     test(`oldData must not equal newData`, () => {
  //       expect(JSON.stringify(oldBooks)).not.toEqual(JSON.stringify(newBooks))
  //     })
  //   })
  //   describe(`Case: test select filed`, () => {
  //     beforeAll(async (done) => {
  //       response = await request.get('/v1/books?fields=_id')
  //       books = response.body.books
  //       done()
  //     })
  //     test('status must be 200 ', () => {
  //       expect(response.status).toEqual(200)
  //     })
  //     test('error validate schema must be undifined ', async () => {
  //       const { error } = await schema.validateAsync(books)
  //       expect(error).toEqual(undefined)
  //     })
  //   })
  //   //sort
  //   describe(`Case: test sort data`, () => {
  //     let books = []

  //     let sortBooks = []
  //     beforeAll(async (done) => {
  //       response = await request.get(
  //         '/v1/books?fields=publishedDate&sort=-publishedDate'
  //       )
  //       books = response.body.books.map((data) =>
  //         new Date(data.publishedDate).getTime()
  //       )

  //       sortBooks = books.sort((a, b) => {
  //         return b - a
  //       })

  //       done()
  //     })
  //     test('status must be 200 ', () => {
  //       expect(response.status).toEqual(200)
  //     })
  //     test('check sort data must be true ', async () => {
  //       expect(JSON.stringify(books)).toEqual(JSON.stringify(sortBooks))
  //     })
  //   })

  afterAll(async (done) => {
    await clearModels()
    await mongoose.connection.close()
    done()
  })
})
