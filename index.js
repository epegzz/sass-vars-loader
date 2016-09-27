'use strict';

const loaderUtils = require('loader-utils');
const fs = require('fs');

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
      Object.assign(vars, JSON.parse(config.vars));
  }

  function jsToSass (obj) {
    // Convert object root properties into sass variables
    var sass = '';
    for (var key in obj) {
      sass += '$' + key + ':' + JSON.stringify(obj[key]) + ';\n';
    }

    // Store string values (so they remain unaffected)
    var storedStrings = [];
    sass = sass.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, function (str) {

      var id = '___JTS' + storedStrings.length;
      storedStrings.push({id: id, value: str});
      return id;
    });

    // Convert js lists and objects into sass lists and maps
    sass = sass.replace(/[{\[]/g, '(').replace(/[}\]]/g, ')');

    // Put string values back (now that we're done converting)
    // Remove quotes from the value
    storedStrings.forEach(function (str) {
      sass = sass.replace(str.id, str.value.replace(/['"]+/g, ''));
    });

    return sass;
  }

  return [jsToSass(vars), content].join('\n');
};

module.exports = loader;
