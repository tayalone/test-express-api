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

  afterAll(async (done) => {
    await clearModels()
    await mongoose.connection.close()
    done()
  })
})
