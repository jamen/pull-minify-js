
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
  // Compile `file.data` on objects
  return prop('data', () => buffer())
}

function buffer (options) {
  const args = [UGLIFY_BIN].concat(dargs(options || {}))
  console.log(args)
  const uglifier = spawn('node', args, { stdio: 'pipe' })
  uglifier.stderr.on('data', x => console.log(x.toString()))
  return asyncMap((buf, done) => {
    pull(uglifier, collect((err, data) => {
      if (err) return done(err)
      done(null, data[0])
    }))
  
    pull(once(buf), uglifier)

    pull(uglifier.error, drain(done))
  })
}
