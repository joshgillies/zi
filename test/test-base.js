var test = require('tape')
var zi = require('../')()

test('Base functionality', function (assert) {
  var bundle = zi.createBundle('page_standard', { link: 'type_2' }, function (page) {
    assert.equal(bundle.id, '#1', 'ID attached to assets created through Zion')
  })
  assert.end()
})
