const express = require('express')

const { getBooks } = require('../../../controllers/book')
const { generateQueryParam } = require('../../../middlewares')

const router = express.Router()

router.get('/', generateQueryParam, getBooks)

module.exports = router
