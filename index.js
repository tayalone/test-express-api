Promise = require('bluebird')

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compress = require('compression')
const cors = require('cors')

const { logs, port } = require('./variables')
const mongoose = require('./mongoose')

mongoose()

const app = express()

app.use(morgan(logs))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(compress())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
