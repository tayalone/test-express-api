const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  return res.send({ message: 'OK' })
})

module.exports = router
