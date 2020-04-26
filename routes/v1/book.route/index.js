const express = require('express')
const { validate } = require('express-validation')

const { getBooks } = require('../../../controllers/book')
const { generateQueryParam } = require('../../../middlewares')
const { getBookByIdValidate } = require('./validate')

const router = express.Router()

router.get('/', generateQueryParam, getBooks)

router.get('/:bookId', validate(getBookByIdValidate), (req, res) => {
  return res.send({ message: 'OK' })
})

module.exports = router
