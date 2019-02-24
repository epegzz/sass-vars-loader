const fs = require('fs')
const ts = require('typescript')
const requirefs = require('require-from-string')

module.exports = function(files) {
  return files.reduce((vars, filepath) => {
    if (!filepath.endsWith('.ts')) {
      return vars
    }
    delete require.cache[filepath]

    const input = fs.readFileSync(filepath, 'utf8')
    const transpiledInput = ts.transpileModule(input, {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    })
    const result = requirefs(transpiledInput.outputText)
    return Object.assign(vars, result.default)
  }, {})
}
