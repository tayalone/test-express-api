const Book = require('../../../models/books.model')
const checkExistingBook = async (req, res, next) => {
  try {
    const { params } = req
    const { bookId } = params

    const currentBook = await Book.findById(bookId)
    if (currentBook) {
      return next()
    } else {
      return res.status(400).send({
        errMessage: 'book does not exist',
        errKey: 'book_does_not_exist'.toUpperCase()
      })
    }
  } catch (e) {
    return res.status(400).send({
      errMessage: 'error from middlewares/book/checkExistingBook',
      errKey: 'error_from_middlewares/book/checkExistingBook'.toUpperCase()
    })
  }
}

module.exports = checkExistingBook
