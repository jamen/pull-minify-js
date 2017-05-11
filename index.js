
const pull = require('pull-stream')
const { map, filter } = pull
const { extname } = require('path')
const replace = require('pull-prop')
const uglify = require('uglify-js')

module.exports = minify
minify.buffer = buffer


function minify (options) {
  if (!options) options = {}

  const strict = options.strict !== undefined ? options.strict : true

  // Compile `file.data` property using the buffer stream
  return pull(
    map(file => {
      if (!strict || extname(file.path) === '.js') {
        return file
      } else { 
        throw new Error('Cannot minify non-JS files (' + file.path + ')')
      }
    }),
    replace('data', _ => buffer(options))
  )
}

function buffer (options) {
  return map((buf) => {
    var { code, error } = uglify.minify(buf.toString('utf'), options)
    if (error) throw error
    return Buffer.from(code)
  })
}
