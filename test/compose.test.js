const {compose} = require('../index')

describe('compose', () => {
  it('should compose several wrappers', () => {
    const addA = (x) => x + 'A'
    const addB = (x) => x + 'B'
    const addC = (x) => x + 'C'
    const addABC = compose(addC, addB, addA)
    const result = addABC('!')
    expect(result).toBe('!ABC')
  })
})
