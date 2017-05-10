
const pull = require('pull-stream')
const { map, filter } = pull
const { extname } = require('path')
const replace = require('pull-prop')
const uglifier = require('uglify-js')

module.exports = uglify
uglify.buffer = buffer


function uglify (options) {
  // Compile `file.data` property using the buffer stream
  return pull(
    filter(file => extname(file.path) === '.js'),
    replace('data', _ => buffer(options))
  )
}

function buffer (options) {
  return map((buf) => {
    var { code, error } = uglifier.minify(buf.toString('utf'), options)
    if (error) throw error
    return Buffer.from(code)
  })
}
