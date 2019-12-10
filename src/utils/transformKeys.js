const transformers = require('./textTransformers')

function transformKeys(vars, transformer) {
  return Object.keys(vars).reduce((result, key) => {
    const value = vars[key] instanceof Object ? transformKeys(vars[key], transformer) : vars[key]
    return Object.assign(result, { [transformer(key)]: value })
  }, {})
}

module.exports = {
  toLower: vars => transformKeys(vars, text => text.toLowerCase()),
  toKebab: vars => transformKeys(vars, transformers.camelToKebab),
  toUnder: vars => transformKeys(vars, transformers.camelToUnder),
  toUpper: vars => transformKeys(vars, text => text.toUpperCase()),
}
