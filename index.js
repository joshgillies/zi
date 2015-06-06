var Importer = require('node-matrix-importer')
var Asset = require('./asset')

function Zion (writer) {
  if (!(this instanceof Zion)) {
    return new Zion(writer)
  }

  this.writer = writer || Importer({ sortActions: true })
}

Zion.prototype.createBundle = function createBundle (type, opts, scope) {
  var asset = Asset(type, opts, scope)
  var writer = this.writer
  var events = {
    'add_path': function onAddPath (opts) {
      writer.addPath(opts)
    },
    'create_asset': function onCreateAsset (asset) {
      asset.id = writer.createAsset(asset).id
      bindListeners(asset, events)
    },
    'create_link': function onCreateLink (opts) {
      writer.createLink(opts)
    },
    'set_attribute': function onSetAttribute (opts) {
      writer.setAttribute(opts)
    },
    'set_perission': function onSetPermission (opts) {
      writer.setPermission(opts)
    }
  }

  function bindListeners (emitter, events) {
    for (var event in events) {
      emitter.on(event, events[event])
    }
  }

  events['create_asset'](asset)

  return asset
}

module.exports = Zion
