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

function withQuotesIfNecessary(value) {
  const hasQuotes = /^['"](\n|.)*['"]$/gm.test(value)
  const requiresQuotes = /^[0 ]/.test(value)
  return hasQuotes || !requiresQuotes ? value : `"${value}"`
}

function formatValue(value, syntax) {
  if (value instanceof Array) {
    return `(${value.map(formatValue).join(', ')})`
  }

  if (typeof value === 'object') {
    return `(${formatNestedObject(value, syntax)})`
  }

  if (typeof value === 'string') {
    return withQuotesIfNecessary(value)
  }

  return JSON.stringify(value)
}

module.exports = convertJsToSass
