var Asset = require('../asset')
var test = require('tape')

test('Base Asset definition', function (assert) {
  var asset = Asset('page_standard', { link: 'type_2' }, function (page) {
    assert.deepEqual(asset, this)
    assert.deepEqual(asset, page)
  })

  assert.end()
})
