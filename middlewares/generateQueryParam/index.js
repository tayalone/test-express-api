const aqp = require('api-query-params')

const generateQueryParam = async (req, res, next) => {
  try {
    const { query } = req
    const { filter, skip, limit, sort, projection, population } = aqp(query)
    req.query = {
      skip,
      limit,
      sort,
      projection,
      population,
      filter
    }
    return next()
  } catch (e) {
    return res.status(400).send({
      errMessage: 'error from middleware/generateQueryParam',
      errKey: 'error_from_middleware/generateQueryParam'.toUpperCase()
    })
  }
}

module.exports = generateQueryParam
