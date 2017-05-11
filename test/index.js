
const test = require('tape')
const pull = require('pull-stream')
const { values, through, drain } = pull
const minify = require('../')
const { extname } = require('path')

test('uglifier', t => {
  t.plan(3)

  var original = null

  pull(
    values([
      { path: 'foo.js', data: 'if (foo) {}' },
      { path: 'bar.js', data: 'baz && qux' }
    ]),
    through(file => {
      file.before = file.data.length
    }),
    minify(),
    drain(file => {
      file.after = file.data.length
      console.log(file)
      t.true(file.after <= file.before, 'got uglified output') 
    }, t.error)
  )
})


test('uglifier error', t => {
  t.plan(1)

  pull(
    values([
      { path: 'foo.js', data: 'bad code rip' },
      { path: 'bar.js', data: 'baz && qux' }
    ]),
    minify(),
    drain(file => {
      t.fail('should not get file')
    }, t.true)
  )
})

test('non js files', t => {
  t.plan(1)

  pull(
    values([
      { path: 'foo.css', data: '.foo {}' },
      { path: 'bar.js', data: 'foo && bar' }
    ]),
    minify(),
    drain(file => {
      t.false(extname(file.path), '.js', 'got js file')
    }, err => {
      t.true(err, 'got error')
    })
  )
})

test('takes mangle option', t => {
  t.plan(1)
  
  pull(
    values([
      { path: 'foo.js', data: 'var foo = kek(); bar(foo); baz(foo)' }
    ]),
    minify({ mangle: true, toplevel: true }),
    drain(file => {
      t.is(file.data.toString(), 'var a=kek();bar(a),baz(a);')
    })
  )
})
