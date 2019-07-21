/**
 * watchFileForChanges
 *
 * Adds a file as loader dependency which will make Webpack watch
 * the file in watch-mode and reloads if it changes.
 */

module.exports = function(loader, file) {
  return loader.addDependency(file)
}
