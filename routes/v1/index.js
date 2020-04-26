const express = require('express')

const bookRoutes = require('./book.route')

const router = express.Router()

router.get('/status', (req, res) => res.send('OK'))
router.get('/', (req, res) => res.send('Hello World!'))

router.use('/books', bookRoutes)

module.exports = router
