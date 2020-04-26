const Book = require('../../../models/books.model')
const deleteBookById = async (req, res) => {
  try {
    const { params } = req
    const { bookId } = params

    await Book.findByIdAndRemove(bookId)

    return res.send({ message: 'OK' })
  } catch (e) {
    return res.status(400).send({
      errMessage: 'error from deleteBookById',
      errKey: 'error_from_deleteBookById'.toUpperCase()
    })
  }
}

module.exports = deleteBookById
