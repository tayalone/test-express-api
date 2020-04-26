const allowProjectionAndPopulation = async (req, res, next) => {
  try {
    const { query } = req

    delete query.skip
    delete query.limit
    delete query.sort
    delete query.filter

    req.query = query
    return next()
  } catch (e) {
    return res.status(400).send({
      errMessage: 'error from middleware/allowProjectionAndPopulation',
      errKey: 'error_from_middleware/allowProjectionAndPopulation'.toUpperCase()
    })
  }
}

module.exports = allowProjectionAndPopulation
