const mongoose = require('mongoose')
const { mongoUrl } = require('./variables')
const mock = require('./mock')

const connectDb = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useCreateIndex: true,
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    console.info(`Connected to database Success`)
    await mock()
  } catch (error) {
    console.error(`Connection error: ${error.stack} }`)
    process.exit(1)
  }
}

module.exports = connectDb
