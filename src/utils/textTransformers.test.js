const transformers = require('./textTransformers')

describe('textTransformers', () => {
  it('Transform camelcase to kebab-case', () => {
    expect(transformers.camelToKebab('transformedCamelToKebab')).toStrictEqual('transformed-camel-to-kebab')
  })

  it('Transform camelcase to underscore', () => {
    expect(transformers.camelToUnder('transformedCamelToUnderscore')).toStrictEqual('transformed_camel_to_underscore')
  })
})
