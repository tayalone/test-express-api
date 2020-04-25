const { INSTALL_MOCKUPDATA } = require('../variables')
const clearModels = require('./clearModels')
const installBook = require('./installBook')
const mockData = async () => {
  try {
    if (parseInt(INSTALL_MOCKUPDATA)) {
      console.log(`install mockup data`)
      await clearModels()
      await installBook()
    }
  } catch (e) {
    console.error(`error from`, e)
  }
}

module.exports = mockData
