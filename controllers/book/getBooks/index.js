const getBooks = async (req, res) => {
  try {
    return res.send({ message: 'OK' })
  } catch (e) {
    return res.status(400).send({
      errMessage: 'error from getBooks',
      errKey: 'error_from_getBooks'
    })
  }
}

module.exports = getBooks
