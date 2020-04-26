const getBookById = async (req, res) => {
  try {
    const { currentBook } = req
    return res.send({ message: 'OK', book: currentBook })
  } catch (e) {
    return res.status(400).send({
      errMessage: 'error from getBookById',
      errKey: 'error_from_getBookById'.toUpperCase()
    })
  }
}

module.exports = getBookById
