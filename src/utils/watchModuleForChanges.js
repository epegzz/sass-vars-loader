/**
 * watchModuleForChanges
 *
 * Adds a file from a module as loader dependency which will make Webpack watch
 * the file in watch-mode and reload if it changes.
 */

module.exports = async function(loader, file) {
  return new Promise((resolve, reject) => {
    delete require.cache[require.resolve(file)]
    loader.resolve(loader.rootContext, file, (err, resolvedFile) => {
      if (err) return reject(err)
      loader.addDependency(resolvedFile)
      resolve()
    })
  })
}
