const loaderUtils = require('loader-utils')
const readVarsFromJSONFiles = require('./utils/readVarsFromJSONFiles')
const readVarsFromJavascriptFiles = require('./utils/readVarsFromJavascriptFiles')
const readVarsFromTypescriptFiles = require('./utils/readVarsFromTypescriptFiles')
const readSassFiles = require('./utils/readSassFiles')
const watchFilesForChanges = require('./utils/watchFilesForChanges')
const convertJsToSass = require('./utils/convertJsToSass')

module.exports = function(content) {
  this.cacheable()

  const options = loaderUtils.getOptions(this) || {}
  const files = options.files || []
  const syntax = options.syntax || 'scss'

  watchFilesForChanges(this, files)

  const vars = {
    ...readVarsFromJSONFiles(files),
    ...readVarsFromJavascriptFiles(files),
    ...readVarsFromTypescriptFiles(files),
    ...options.vars,
  }

  const sassVarsString = convertJsToSass(vars, syntax)

  return [readSassFiles(files), sassVarsString, content].join('\n')
}
