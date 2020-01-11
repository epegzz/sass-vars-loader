const path = require('path')
const loaderUtils = require('loader-utils')
const readVarsFromJSONFiles = require('./utils/readVarsFromJSONFiles')
const readVarsFromJavascriptFiles = require('./utils/readVarsFromJavascriptFiles')
const readVarsFromTypescriptFiles = require('./utils/readVarsFromTypescriptFiles')
const readSassFiles = require('./utils/readSassFiles')
const watchFilesForChanges = require('./utils/watchFilesForChanges')
const convertJsToSass = require('./utils/convertJsToSass')
const transformKeys = require('./utils/transformKeys')

module.exports = async function(content) {
  this.cacheable()
  const callback = this.async()
  try {
    const options = loaderUtils.getOptions(this) || {}

    const files = options.files || []
    const syntax = options.syntax || 'scss'

    let transformKeysCallbacks = options.transformKeys
    if (transformKeysCallbacks && !Array.isArray(transformKeysCallbacks)) {
      transformKeysCallbacks = [transformKeysCallbacks]
    }

    await watchFilesForChanges(this, files)

    const vars = []
    for (const file of files) {
      // Javascript
      if (file.match(/\.js$/i)) {
        vars.push({ file, object: readVarsFromJavascriptFiles([file]) })
      }

      // Typescript
      if (file.match(/\.ts$/i)) {
        vars.push({ file, object: readVarsFromTypescriptFiles([file]) })
      }

      // JSON
      if (file.match(/\.json$/i)) {
        vars.push({ file, object: readVarsFromJSONFiles([file]) })
      }

      // Sass/Scss
      if (file.match(/\.s[ac]ss$/i)) {
        vars.push({ file, string: readSassFiles([file]) })
      }
    }

    // Vars from Webpack config
    if (options.vars) {
      vars.push({ object: options.vars })
    }

    const varsString = vars.reduce((result, { file, object, string }) => {
      if (object) {
        if (transformKeysCallbacks) {
          object = transformKeysCallbacks.reduce((res, fn) => transformKeys(res, fn), {})
        }
        string = convertJsToSass(object, syntax)
      }

      if (string && !/^[\s\n]*$/.test(string)) {
        const comment = file ? `Vars from ${path.parse(file).base}` : 'Vars from Webpack config'

        return `${result}// ${comment}\n${string}\n\n`
      }

      return result
    }, '')

    callback(null, `${varsString}${content}`)
  } catch (err) {
    callback(err)
  }
}
