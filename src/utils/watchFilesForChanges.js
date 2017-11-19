/**
 * watchFilesForChanges
 *
 * Adds files as loader dependency which will make Webpack watch
 * the files in watch-mode and reload if they change.
 */

export default function(loader, files) {
  files.forEach(file => loader.addDependency(file));
}
