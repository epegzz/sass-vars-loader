const fs = require('fs')
const loaderUtils = require('loader-utils')
const readVarsFromJSONFiles = require('./utils/readVarsFromJSONFiles')
const readVarsFromJavascriptFiles = require('./utils/readVarsFromJavascriptFiles')
const readVarsFromTypescriptFiles = require('./utils/readVarsFromTypescriptFiles')
const readSassFiles = require('./utils/readSassFiles')
const watchFilesForChanges = require('./utils/watchFilesForChanges')
const convertJsToSass = require('./utils/convertJsToSass')

module.exports = async function(content) {
  this.cacheable()
  const callback = this.async()
  try {
    const options = loaderUtils.getOptions(this) || {}
    const files = options.files || []
    const syntax = options.syntax || 'scss'

    await watchFilesForChanges(this, files)

    const vars = {
      ...readVarsFromJSONFiles(files),
      ...readVarsFromJavascriptFiles(files),
      ...readVarsFromTypescriptFiles(files),
      ...options.vars,
    }

    const sassVarsString = convertJsToSass(vars, syntax)
    const result = [readSassFiles(files), sassVarsString, content].join('\n')
    callback(null, result)
  } catch (err) {
    callback(err)
  }
}
