/**
 * watchFilesForChanges
 *
 * Adds files as loader dependency which will make Webpack watch
 * the files in watch-mode and reload if they change.
 */

module.exports = function(loader, files) {
  files.forEach(file => loader.addDependency(file));
};
