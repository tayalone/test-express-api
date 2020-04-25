const path = require('path')

require('dotenv-safe').config({
  path: path.join(__dirname, '.env'),
  sample: path.join(__dirname, '.env.example')
})

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  mongoUrl: process.env.MONGO_URL,
  mongoTestUrl: process.env.MONGO_TEST_URL,
  INSTALL_MOCKUPDATA: process.env.INSTALL_MOCKUPDATA
}
