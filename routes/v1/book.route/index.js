const express = require('express')
const { validate } = require('express-validation')

const { getBooks, getBookById } = require('../../../controllers/book')
const {
  generateQueryParam,
  allowProjectionAndPopulation
} = require('../../../middlewares')
const { checkExistingBook } = require('../../../middlewares/book')
const { getBookByIdValidate, deleteBookByIdValidate } = require('./validate')

const router = express.Router()

router.get('/', generateQueryParam, getBooks)

router.get(
  '/:bookId',
  validate(getBookByIdValidate),
  generateQueryParam,
  allowProjectionAndPopulation,
  checkExistingBook,
  getBookById
)
router.delete(
  '/:bookId',
  validate(getBookByIdValidate),
  checkExistingBook,
  (req, res) => {
    return res.send({ message: 'OK' })
  }
)

module.exports = router
