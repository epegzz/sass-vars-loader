const loaderUtils = require('loader-utils');
const getVarsFromJSONFiles = require('./utils/readVarsFromJSONFiles');
const getVarsFromJavascriptFiles = require('./utils/readVarsFromJavascriptFiles');
const watchFilesForChanges = require('./utils/watchFilesForChanges');
const convertJsToSass = require('./utils/convertJsToSass');

function sassVarsLoader(content) {
  this.cacheable();

  const options = loaderUtils.getOptions(this) || {};
  const files = options.files || [];

  watchFilesForChanges(this, files);

  const vars = Object.assign(
    {},
    options.vars,
    getVarsFromJSONFiles(files),
    getVarsFromJavascriptFiles(files)
  );

  const sassVarsString = convertJsToSass(vars);

  return `${sassVarsString}${content}`;
}

module.exports = sassVarsLoader;
