const transformKeys = require('./transformKeys')

const vars = {
  topPlainKey: 'hello',
  topNestedKey: {
    subNestedKey: {
      deepPlainKey: true,
    },
  },
}

describe('transformKeys', () => {
  it('Nested adding prefix', () => {
    expect(transformKeys(vars, key => `transformed-${key}`)).toStrictEqual({
      'transformed-topPlainKey': 'hello',
      'transformed-topNestedKey': {
        'transformed-subNestedKey': {
          'transformed-deepPlainKey': true,
        },
      },
    })
  })

  it('Nested camelCase to lower case', () => {
    expect(transformKeys(vars, key => key.toLowerCase())).toStrictEqual({
      topplainkey: 'hello',
      topnestedkey: {
        subnestedkey: {
          deepplainkey: true,
        },
      },
    })
  })

  it('Nested camelCase to UPPER CASE', () => {
    expect(transformKeys(vars, key => key.toUpperCase())).toStrictEqual({
      TOPPLAINKEY: 'hello',
      TOPNESTEDKEY: {
        SUBNESTEDKEY: {
          DEEPPLAINKEY: true,
        },
      },
    })
  })
})
