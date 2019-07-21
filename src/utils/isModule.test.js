const isModule = require('./isModule')

describe('isModule', () => {
  it('returns true if it is a module', () => {
    expect(isModule('fs')).toEqual(true)
  })
  it('returns false if it is not a module', () => {
    expect(isModule('->definitelyNotAModule')).toEqual(false)
  })
})
