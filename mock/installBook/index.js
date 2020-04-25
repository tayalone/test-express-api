const data = require('./data')
const Book = require('../../models/books.model')

const installBook = async () => {
  const book = data.slice(0, 29).map((data) => {
    const publishedDate = data.publishedDate['$date']
    data.publishedDate = publishedDate
    return data
  })
  await Book.create(book)
}

module.exports = installBook
