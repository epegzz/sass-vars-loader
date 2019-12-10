const transformKeys = require('./transformKeys')
const transformers = require('./textTransformers')

const vars = {
  topPlainKey: 'hello',
  topNestedKey: {
    subNestedKey: {
      deepPlainKey: true,
    },
  },
}

describe('transformKeys', () => {
  it('Nested camelCase to kebab-case', () => {
    expect(transformKeys.toKebab(vars)).toStrictEqual({
      'top-plain-key': 'hello',
      'top-nested-key': {
        'sub-nested-key': {
          'deep-plain-key': true,
        },
      },
    })
  })

  it('Nested camelCase to under_score', () => {
    expect(transformKeys.toUnder(vars)).toStrictEqual({
      top_plain_key: 'hello',
      top_nested_key: {
        sub_nested_key: {
          deep_plain_key: true,
        },
      },
    })
  })

  it('Nested camelCase to lower case', () => {
    expect(transformKeys.toLower(vars)).toStrictEqual({
      topplainkey: 'hello',
      topnestedkey: {
        subnestedkey: {
          deepplainkey: true,
        },
      },
    })
  })

  it('Nested camelCase to UPPER CASE', () => {
    expect(transformKeys.toUpper(vars)).toStrictEqual({
      TOPPLAINKEY: 'hello',
      TOPNESTEDKEY: {
        SUBNESTEDKEY: {
          DEEPPLAINKEY: true,
        },
      },
    })
  })
})
