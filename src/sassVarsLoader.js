import loaderUtils from 'loader-utils'
import readVarsFromJSONFiles from './utils/readVarsFromJSONFiles'
import readVarsFromJavascriptFiles from './utils/readVarsFromJavascriptFiles'
import readSassFiles from './utils/readSassFiles'
import watchFilesForChanges from './utils/watchFilesForChanges'
import convertJsToSass from './utils/convertJsToSass'

export default function(content) {
  this.cacheable()

  const options = loaderUtils.getOptions(this) || {}
  const files = options.files || []
  const syntax = options.syntax || 'scss'

  watchFilesForChanges(this, files)

  const vars = {
    ...readVarsFromJSONFiles(files),
    ...readVarsFromJavascriptFiles(files),
    ...options.vars,
  }

  const sassVarsString = convertJsToSass(vars, syntax)

  return [readSassFiles(files), sassVarsString, content].join('\n')
}
