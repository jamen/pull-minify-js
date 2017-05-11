
# pull-minify-js

> Minify JavaScript files or buffers inside a pull-stream

Minifies [streamed JavaScript files](https://npmjs.com/pull-files) using [`uglify-js`](https://npmjs.com/uglify-js)

```js
const pull = require('pull-stream')
const { read, write } = require('pull-files')
const minify = require('pull-minify-js')

pull(
  read([ 'index.js', 'test.js' ], { cwd: __dirname }),
  minify({
    mangle: true,
    toplevel: true
  }),
  write(__dirname + '/out', err => {
    // done
  })
)
```

Use `minify.buffer` if you are streaming JavaScript buffers instead

```js
pull(
  readFile(__dirname + '/foo.js'),
  minify.buffer({ mangle: true, toplevel: true }),
  writeFile(__dirname + '/out.js')
)
```

## Install

```sh
npm install --save pull-minify-js
```

```sh
yarn add pull-minify-js
```

## Usage

### `minify(options?)`

A stream that maps each JavaScript file to the minified version.  See [`uglify-js`'s options](https://www.npmjs.com/package/uglify-js#usage) further configuration.

```js
pull(
  read([ 'index.js', 'lib/**/*.js' ], { cwd: __dirname }),
  bundle('app.js', [ 'es2040' ]),
  uglify({ ...options }),
  write(__dirname + '/out', err => {
    // ...
  })
)
```

You can make it map all files regardless of extensions, by passing `strict: false`

```js
minify({ strict: false, ... })
```

### `minify.buffer(options?)`

The base implementation that compiles buffer to buffer, instead of file to file.  Options are the same

```js
pull(
  readFile(__dirname + '/foo.js'),
  minify.buffer({ ...options }),
  writeFile(__dirname + '/foo.min.js')
)
```

---

Maintained by [Jamen Marz](https://git.io/jamen) (See on [Twitter](https://twitter.com/jamenmarz) and [GitHub](https://github.com/jamen) for questions & updates)

