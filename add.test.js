const add = require('./add')

describe('Test add.js', () => {
  describe('Case: Success', () => {
    let result = null
    beforeAll(() => {
      result = add(1, 1)
    })
    test('result must be 2', () => {
      expect(result).toEqual(2)
    })
  })
})
