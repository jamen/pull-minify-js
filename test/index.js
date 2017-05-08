
const test = require('tape')
const pull = require('pull-stream')
const { values, through, drain } = pull
const uglify = require('../')

test('uglifier', t => {
  t.plan(2)

  var original = null

  pull(
    values([
      { path: 'foo.js', data: 'if (foo) { }' },
      { path: 'bar.js', data: 'baz && qux' }
    ]),
    through(file => {
      file.before = file.data.length
    }),
    uglify(),
    drain(file => {
      file.after = file.data.length
      console.log(file)
      t.true(file.after <= file.before, 'got uglified output') 
    })
  )
})


