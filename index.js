'use strict';

const loaderUtils = require('loader-utils');
const fs = require('fs');
const convert = require('./convert');

const loader = function(content)
{
  this.cacheable();

  const config = loaderUtils.getLoaderConfig(this, 'sassVars');

  const vars = {};
  if (config.files) {
    if (!Array.isArray(config.files)) {
      config.files = [config.files];
    }
    config.files.forEach((path) => {
      path = path.replace(/["']/g, '');
      this.addDependency(path);
      if (path.endsWith('.json')) {
        Object.assign(vars, JSON.parse(fs.readFileSync(path, 'utf8')));
      }
      if (path.endsWith('.js')) {
        Object.assign(vars, require(path));
      }
    })
  }

  if (config.vars) {
    if(typeof config.vars === 'object') {
      Object.assign(vars, config.vars);
    } else {
      Object.assign(vars, JSON.parse(config.vars));
    }
  }

  function jsToSass (obj) {
    const opts = {
      prefix: '$',
      suffix: ';',
      suffixLastItem: true,
    };
    var sass = convert(obj, opts);
    return sass;
  }

  return [jsToSass(vars), content].join('\n');
};

module.exports = loader;
