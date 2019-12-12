function transformKeys(vars, callback) {
  return Object.keys(vars).reduce((result, key) => {
    const value = vars[key] instanceof Object ? transformKeys(vars[key], callback) : vars[key]
    return Object.assign(result, { [callback(key)]: value })
  }, {})
}

module.exports = transformKeys
