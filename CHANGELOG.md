## [6.0.0]
### Changed
- Now respects the order in which the files are specified in the config when loading sass vars.

## [5.1.0]
### Added
- Added `transformKeys` option to transform the variable / key names in Sass. 

## [5.0.0]
### Changed
- Strings are not quoted anymore. This might be a breaking change for some: Until now, all
  variable values that started with a "0" or a whitespace got automatically quoted.
  From now on you need to add the quotes yourself if you need them (i.e. "'0123'").

## [4.4.0]
### Changed
- Arguments passed to the `files` option are now getting resolved, which allows passing files
  that are installed as node_modules without loosing HMR functionality.

## [4.0.0] 
### Changed
- Dropping Babel.
  Because `sass-vars-loader` is a NodeJS only project, there is not enough justification to use
  Babel as a compiler. Therefore, starting with this release, the NPM package will use the source
  code directly instead of a compiled version.
  The downside: `sass-vars-loader` now requires NodeJS version `8` or greater.
  The benefit: No unnecessary polyfills anymore when using a recent Node version.
