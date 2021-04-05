const transformObject = require('./transformObject')

const vars = {
  topPlainKey: 'hello',
  topNestedKey: {
    subNestedKey: {
      deepPlainKey: true,
    },
  },
}

describe('transformObject', () => {
  it('Passing a transform function', () => {
    expect(transformObject(vars, obj => ({ newObj: true }))).toStrictEqual({ newObj: true })
  })

  it('Passing a non function value', () => {
    expect(transformObject(vars, 'non-function')).toStrictEqual(vars)
  })

  it('Not passing a transformer', () => {
    expect(transformObject(vars)).toStrictEqual(vars)
  })
})
