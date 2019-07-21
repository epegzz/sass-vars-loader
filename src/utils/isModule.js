const isModule = path => {
  try {
    require.resolve(path)
    return true
  } catch (e) {
    return false
  }
}

module.exports = isModule
