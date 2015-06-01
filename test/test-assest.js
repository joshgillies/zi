var Asset = require('../asset')
var test = require('tape')

test('Base Asset definition', function (assert) {
  var asset = Asset('page_standard', { link: 'type_2' }, function (page) {
    assert.deepEqual(asset, this)
    assert.deepEqual(asset, page)
  })
  var childAsset

  asset.on('add_path', function (obj) {
    assert.ok(true, 'add path event fired')
    assert.equal(obj.path, 'test')
  })

  asset.on('create_asset', function (child) {
    assert.ok(true, 'create asset event fired')
    // assignment happens after the event is fired... is this even worth testing?
    process.nextTick(function () {
      assert.deepEqual(child, childAsset)
    })
  })

  asset.on('create_link', function (obj) {
    assert.ok(true, 'create link event fired')
    assert.equal(obj.link, 'type_2')
  })

  asset.on('set_attribute', function (obj) {
    assert.ok(true, 'set attribute event fired')
    assert.equal(obj.attribute, 'test')
    assert.equal(obj.value, 'testing')
  })

  asset.on('set_permission', function (obj) {
    assert.ok(true, 'set permission event fired')
    assert.equal(obj.permission, 'read')
    assert.equal(obj.granted, true)
  })

  childAsset = asset.createAsset('test_asset', { type: 'type_2' })
  asset.addPath('test')
  asset.createLink({ type: 'type_2' })
  asset.setAttribute('test', 'testing')
  asset.setPermission({ permission: 'read', granted: true })

  assert.end()
})
