const Book = require('../../../models/books.model')
const checkExistingBook = async (req, res, next) => {
  try {
    const { params, query } = req
    const { bookId } = params

    const { projection, population } = query

    const currentBook = await Book.findById(bookId)
      .select(projection)
      .populate(population)
    if (currentBook) {
      req.currentBook = currentBook
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
