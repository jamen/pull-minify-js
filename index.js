
const pull = require('pull-stream')
const { asyncMap, drain, once, collect } = pull
const spawn = require('pull-spawn-process')
const dargs = require('dargs')
const path = require('path')
const prop = require('pull-prop')

module.exports = uglify
uglify.buffer = buffer

const UGLIFY_BIN = path.resolve(__dirname, 'node_modules/.bin/uglifyjs')

function uglify (options) {
  // Compile `file.data` property using the buffer stream
  return prop('data', () =>  buffer())
}

function buffer (options) {
  const args = [UGLIFY_BIN].concat(dargs(options || {}))
  const uglifier = spawn('node', args, { stdio: 'pipe' })
  let ended = false

  return asyncMap((buf, done) => {
    pull(uglifier, collect((err, data) => {
      if (err) return done(err)
      done(null, Buffer.concat(data))
    }))
  
    pull(once(buf), uglifier)

    pull(uglifier.error, collect((err, message) => {
      if (err) return done(err)
      message = Buffer.concat(message)
      if (buf && buf.length) {
        done(new Error(message.toString()))
      }
    }))
  })
}
