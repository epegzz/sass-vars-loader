const fs = require('fs')
const watchFileForChanges = require('./watchFileForChanges')
const watchModuleForChanges = require('./watchModuleForChanges')
const isModule = require('./isModule')

/**
 * watchFilesForChanges
 *
 * Adds files as loader dependency which will make Webpack watch
 * the files in watch-mode and reload if they change.
 */

async function watchFilesForChanges(loader, files) {
  for (const file of files) {
    if (fs.existsSync(file)) {
      watchFileForChanges(loader, file)
    } else if (isModule(file)) {
      await watchModuleForChanges(loader, file)
    } else {
      throw new Error(`Invalid file: "${file}". Consider using "path.resolve" in your config.`)
    }
  }
}

module.exports = watchFilesForChanges
