var Asset = require('../asset')
var test = require('tape')

test('Base Asset definition', function (assert) {
  var asset = Asset('page_standard', { link: 'type_2' }, function (page) {
    assert.deepEqual(this, page)
    assert.deepEqual(asset, this)
    assert.deepEqual(asset, page)
  })
  var childAsset

  asset.on('add_path', function (obj) {
    assert.ok(true, 'add path event fired')
    assert.equal(obj.path, 'test')
    assert.equal(asset.path, 'test')
  })

  asset.on('create_asset', function (asset) {
    assert.ok(true, 'create asset event fired')
    childAsset = asset
  })

  asset.on('create_link', function (obj) {
    assert.ok(true, 'create link event fired')
    assert.equal(obj.link, 'notice')
    assert.equal(asset.link, 'notice')
  })

  asset.on('set_attribute', function (obj) {
    var expected = {}
    expected[obj.attribute] = obj.value

    assert.ok(true, 'set attribute event fired')
    assert.equal(obj.attribute, 'test')
    assert.equal(obj.value, 'testing')
    assert.deepEqual(asset.attributes, expected)
  })

  asset.on('set_permission', function (obj) {
    assert.ok(true, 'set permission event fired')
    assert.equal(obj.permission, 'read')
    assert.equal(obj.granted, true)
  })

  assert.equal(asset.link, 'type_2')
  assert.deepEqual(asset.createAsset('test_asset', { type: 'type_2' }), childAsset)
  asset.addPath('test')
  asset.createLink({ type: 'notice' })
  asset.setAttribute('test', 'testing')
  asset.setPermission({ permission: 'read', granted: true })

  assert.end()
})
