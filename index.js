var Importer = require('node-matrix-importer')
var Asset = require('./asset')

function Zion (writer) {
  if (!(this instanceof Zion)) {
    return new Zion(writer)
  }

  this.writer = writer || Importer({ sortActions: true })
}

Zion.prototype.createAsset = function createAsset (type, opts, scope) {
  var asset = Asset(type, opts, scope)
  var writer = this.writer

  function onAddPath (opts) {
    writer.addPath(opts)
  }

  function onCreateAsset (asset) {
    asset.id = writer.createAsset(asset).id
  }

  function onCreateLink (opts) {
    writer.createLink(opts)
  }

  function onSetAttribute (opts) {
    writer.setAttribute(opts)
  }

  function onSetPermission (opts) {
    writer.setPermission(opts)
  }

  asset.on('add_path', onAddPath)
  asset.on('create_asset', onCreateAsset)
  asset.on('create_link', onCreateLink)
  asset.on('set_attribute', onSetAttribute)
  asset.on('set_permission', onSetPermission)

  onCreateAsset(asset)

  return asset
}

module.exports = Zion
