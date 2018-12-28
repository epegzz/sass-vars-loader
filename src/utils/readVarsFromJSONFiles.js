const fs = require('fs')

module.exports = function(files) {
  return files.reduce(
    (vars, filepath) =>
      Object.assign(vars, filepath.endsWith('.json') && JSON.parse(fs.readFileSync(filepath, 'utf8'))),
    {}
  )
}
