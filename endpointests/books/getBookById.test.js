const app = require('../../server')

const mongoose = require('mongoose')

const clearModels = require('../../mock/clearModels')
const installBooks = require('../../mock/installBook')

const { mongoTestUrl } = require('../../variables')
const Book = require('../../models/books.model')

const supertest = require('supertest')
const request = supertest(app)

const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const fullSchema = Joi.object({
  _id: Joi.objectId().required(),
  title: Joi.string(),
  pageCount: Joi.number(),
  authors: Joi.array().items(Joi.string()),
  categories: Joi.array().items(Joi.string()),
  isbn: Joi.string().required(),
  publishedDate: Joi.date(),
  thumbnailUrl: Joi.string().uri(),
  shortDescription: Joi.string(),
  longDescription: Joi.string(),
  status: Joi.string(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  __v: Joi.number()
})

const filterSchema = Joi.object({
  _id: Joi.objectId().required(),
  title: Joi.string(),
  longDescription: Joi.string()
})

describe('test endpoint get:/v1/books/:bookId', () => {
  let bookId = null
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
    const book = await Book.findOne()
    bookId = book._id
    done()
  })
  describe('Case: Not exis book', () => {
    let response = null

    beforeAll(async (done) => {
      response = await request.get(`/v1/books/${'507f1f77bcf86cd799439011'}`)
      books = response.body.books

      done()
    })
    test('status must be 400 ', () => {
      expect(response.status).toEqual(400)
    })
    test(`errMessage must be 'book does not exist'`, () => {
      expect(response.body.errMessage).toEqual('book does not exist')
    })
    test(`errKey must be '${'book_does_not_exist'.toUpperCase()}'`, () => {
      expect(response.body.errKey).toEqual('book_does_not_exist'.toUpperCase())
    })
  })
  describe('Case: Exis book', () => {
    describe('Sub case: normal', () => {
      let response = null
      beforeAll(async (done) => {
        response = await request.get(`/v1/books/${bookId}`)
        books = response.body.books

        done()
      })
      test('status must be 200 ', async () => {
        expect(response.status).toEqual(200)
      })
      test('error book schema must ubdefined', async () => {
        const { error } = await fullSchema.validateAsync(response.body.book)
        expect(error).toEqual(undefined)
      })
    })
    describe('Sub case: select fields', () => {
      let response = null
      beforeAll(async (done) => {
        response = await request.get(
          `/v1/books/${bookId}?fields=_id,title,longDescription`
        )
        books = response.body.books

        done()
      })
      test('status must be 200 ', async () => {
        expect(response.status).toEqual(200)
      })
      test('error book schema must ubdefined', async () => {
        const { error } = await filterSchema.validateAsync(response.body.book)
        expect(error).toEqual(undefined)
      })
    })
  })
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
