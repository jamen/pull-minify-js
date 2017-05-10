
const pull = require('pull-stream')
const { map, filter } = pull
const spawn = require('pull-spawn-process')
const dargs = require('dargs')
const { extname } = require('path')
const prop = require('pull-prop')
const uglifier = require('uglify-js')

module.exports = uglify
uglify.buffer = buffer


function uglify (options) {
  // Compile `file.data` property using the buffer stream
  return pull(
    filter(({ path }) => extname(path) === '.js'),
    prop('data', _ => buffer(options))
  )
}

function buffer (options) {
  return map((buf) => {
    var { code, error } = uglifier.minify(buf.toString('utf'), options)
    if (error) throw error
    return Buffer.from(code)
  })
}
