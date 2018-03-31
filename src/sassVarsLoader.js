import loaderUtils from 'loader-utils'
import getVarsFromJSONFiles from './utils/readVarsFromJSONFiles'
import getVarsFromJavascriptFiles from './utils/readVarsFromJavascriptFiles'
import watchFilesForChanges from './utils/watchFilesForChanges'
import convertJsToSass from './utils/convertJsToSass'

export default function(content) {
  this.cacheable()

  const options = loaderUtils.getOptions(this) || {}
  const files = options.files || []
  const syntax = options.syntax || 'scss'

  watchFilesForChanges(this, files)

  const vars = {
    ...getVarsFromJSONFiles(files),
    ...getVarsFromJavascriptFiles(files),
    ...options.vars,
  }

  const sassVarsString = convertJsToSass(vars, syntax)

  return `${sassVarsString}\n${content}`
}
