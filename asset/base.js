var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')

function Asset (type, opts, scope) {
  if (!(this instanceof Asset)) {
    return new Asset(type, opts, scope)
  }

  EventEmitter.call(this)

  if (typeof type === 'object') {
    opts = type
    type = undefined
  }

  if (typeof opts === 'function') {
    scope = opts
    opts = undefined
  }

  if (!opts) {
    opts = {}
  }

  if (!scope) {
    scope = function noop () {}
  }

  for (var key in opts) {
    this[key] = opts[key]
  }

  this.parentId = this.parentId || '1'
  this.type = this.type || type

  setImmediate(function stackScope () {
    scope.call(this, this)
  }.bind(this))
}

inherits(Asset, EventEmitter)

Asset.prototype._addPath = function _addPath (opts) {
  this.emit('add_path', opts)
}

Asset.prototype._createAsset = function _createAsset (asset) {
  this.emit('create_asset', asset)
}

Asset.prototype._createLink = function _createLink (opts) {
  this.emit('create_link', opts)
}

Asset.prototype._setAttribute = function _setAttribute (opts) {
  this.emit('set_attribute', opts)
}

Asset.prototype._setPermission = function _setPermission (opts) {
  this.emit('set_permission', opts)
}

Asset.prototype.addPath = function addAssetPath (path) {
  var opts = {
    assetId: this.id,
    path: path
  }

  this._addPath(opts)

  return this
}

Asset.prototype.createAsset = function createAsset (type, opts, scope) {
  if (typeof opts === 'function') {
    scope = opts
    opts = undefined
  }

  if (!opts) {
    opts = {}
  }

  if (!opts.parentId) {
    opts.parentId = this.id
  }

  var asset = Asset(type, opts, scope)
  var events = ['add_path', 'create_asset', 'create_link', 'set_attribute', 'set_perission']

  for (var i = 0; i < events.length; i++) {
    this.listeners(events[i]).forEach(function (listener) {
      asset.on(events[i], listener)
    })
  }

  this._createAsset(asset)

  return asset
}
Asset.prototype.createLink = function createAssetLink (opts) {
  if (!opts.from) {
    opts.from = this.id
  }

  if (opts.type) {
    opts.link = opts.type
    opts.type = undefined
  }

  this._createLink(opts)

  return this
}

Asset.prototype.setAttribute = function setAssetAttribute (key, value) {
  var opts = {
    attribute: key,
    value: value,
    assetId: this.id
  }

  this._setAttribute(opts)

  return this
}

Asset.prototype.setAttributes = function setAssetAttributes (attributes) {
  return this.setAttribute('attributes', Object.keys(attributes).map(function (attribute) {
    var obj = {}
    obj[attribute] = attributes[attribute]
    return obj
  }))
}

Asset.prototype.setPermission = function setAssetPermission (opts) {
  if (!opts.assetId) {
    opts.assetId = this.id
  }

  this._setPermission(opts)

  return this
}

module.exports = Asset
