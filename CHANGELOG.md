## `v4.4.0` Resolve files
Arguments passed to the `files` option are now getting resolved, which allows
passing files that are installed as node_modules without loosing HMR functionality.

## `v4.0.0` Dropping Babel
Because `sass-vars-loader` is a NodeJS only project, there is not enough
justification to use Babel as a compiler. Therefore, starting with this
release, the NPM package will use the source code directly instead of
a compiled version.

**The downside**: `sass-vars-loader` now requires NodeJS version `8` or greater.

**The benefit**: No unnecessary polyfills anymore when using a recent Node version.
