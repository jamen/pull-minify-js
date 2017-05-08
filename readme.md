
# pull-uglify

> Uglify JavaScript files with pull-stream

Compiles [streamed files](https://npmjs.com/pull-files) with [`uglify-js`](https://npmjs.com/uglify-js)

```js
pull(
  read([ 'index.js', 'test.js' ], { cwd: __dirname }),
  uglify({ mangle: true }),
  write('out', err => {
    // done
  })
)
```

You can also compile buffers with `uglify.buffer` if you aren't streaming files

## Install

```sh
npm install --save pull-uglify

# with yarn
yarn add pull-uglify
```

## Usage

### `uglify(options?)`

A stream that maps each file to the uglified version.  See [`uglify-js`'s options](https://www.npmjs.com/package/uglify-js#usage) for more information.

```js
pull(
  read([ 'index.js', 'lib/**/*.js' ], { cwd: __dirname }),
  bundle('app.js', [ 'es2040' ]),
  uglify({ mangle: true }),
  write('out', err => {
    // ...
  })
)
```

### `uglify.buffer(options?)`

The base implementation that compiles buffer to buffer, instead of file to file.  Options are the same

```js
pull(
  readFile('foo.js'),
  uglify.buffer({ mangle: true }),
  writeFile('foo.min.js')
)
```

---

Maintained by [Jamen Marz](https://git.io/jamen) (See on [Twitter](https://twitter.com/jamenmarz) and [GitHub](https://github.com/jamen) for questions & updates)

