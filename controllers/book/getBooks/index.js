const Book = require('../../../models/books.model')
const getBooks = async (req, res) => {
  try {
    const { query } = req
    const { filter, skip, limit, sort, projection, population } = query

    const books = await Book.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .populate(population)
      .exec()
    return res.send({ message: 'OK', books })
  } catch (e) {
    return res.status(400).send({
      errMessage: 'error from getBooks',
      errKey: 'error_from_getBooks'.toUpperCase()
    })
  }
}

module.exports = getBooks
