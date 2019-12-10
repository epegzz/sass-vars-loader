function transformCamelCase(text, symbol) {
  return text.replace(/[A-Z]/g, (value, offset) => {
    const prefix = offset > 0 ? symbol : ''
    return `${prefix}${value.toLowerCase()}`
  })
}

module.exports = {
  camelToKebab: text => transformCamelCase(text, '-'),
  camelToUnder: text => transformCamelCase(text, '_'),
}
