const Book = require('../../models/books.model')

const index = async () => {
  try {
    await Book.deleteMany({})
    return null
  } catch (e) {
    // console.error(`error from ClearModels`, e)
  }
}

module.exports = index
