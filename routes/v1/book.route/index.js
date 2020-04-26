const express = require('express')

const { getBooks } = require('../../../controllers/book')

const router = express.Router()

router.get('/', getBooks)

module.exports = router
