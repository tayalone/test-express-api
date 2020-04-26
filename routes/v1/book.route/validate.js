const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
  getBookByIdValidate: {
    params: Joi.object({ bookId: Joi.objectId().required() })
  },
  deleteBookByIdValidate: {
    params: Joi.object({ bookId: Joi.objectId().required() })
  }
}
