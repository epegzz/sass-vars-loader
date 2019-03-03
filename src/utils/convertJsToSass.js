function convertJsToSass(obj, syntax) {
  const suffix = syntax === 'sass' ? '' : ';'
  const keys = Object.keys(obj)
  const lines = keys.map(key => `$${key}: ${formatValue(obj[key], syntax)}${suffix}`)
  return lines.join('\n')
}

function formatNestedObject(obj, syntax) {
  const keys = Object.keys(obj)
  return keys.map(key => `${key}: ${formatValue(obj[key], syntax)}`).join(', ')
}

function withQuotes(value) {
  const hasQuotes = /^['"](\n|.)*['"]$/gm.test(value)
  return hasQuotes ? value : `"${value}"`
}

function formatValue(value, syntax) {
  if (value instanceof Array) {
    return `(${value.map(formatValue).join(', ')})`
  }

  if (typeof value === 'object') {
    return `(${formatNestedObject(value, syntax)})`
  }

  if (typeof value === 'string') {
    return withQuotes(value)
  }

  return JSON.stringify(value)
}

module.exports = convertJsToSass
