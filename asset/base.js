var EventEmitter = require('events').EventEmitter
var inherits = require('util').inherits

function Asset (type, opts, context) {
  if (!(this instanceof Asset)) {
    return new Asset(type, opts, context)
  }

  EventEmitter.call(this)

  if (typeof type === 'object') {
    opts = type
    type = undefined
  }

  if (typeof opts === 'function') {
    context = opts
    opts = undefined
  }

  if (!opts) {
    opts = {}
  }

  if (!context) {
    context = function noop () {}
  }

  opts.parentId = opts.parentId || '1'
  opts.type = opts.type || type

  if (opts.type) {
    this._createAsset(opts)
  }

  context.call(this, this)
}

inherits(Asset, EventEmitter)

Asset.prototype._addPath = function _addPath (opts) {
  this.emit('add_path', opts)
}

Asset.prototype._createAsset = function _createAsset (opts) {
  this.emit('create_asset', opts)
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

Asset.prototype.createAsset = function createAsset (type, opts, context) {
  if (typeof opts === 'function') {
    context = opts
    opts = undefined
  }

  if (!opts) {
    opts = {}
  }

  if (!opts.parentId) {
    opts.parentId = this.id
  }

  var asset = Asset(type, opts, context)
  this.listeners('add_path').forEach(function (listener) {
    asset.on('add_path', listener)
  })
  this.listeners('create_asset').forEach(function (listener) {
    asset.on('create_asset', listener)
  })
  this.listeners('create_link').forEach(function (listener) {
    asset.on('create_link', listener)
  })
  this.listeners('set_attribute').forEach(function (listener) {
    asset.on('set_attribute', listener)
  })
  this.listeners('set_perission').forEach(function (listener) {
    asset.on('set_perission', listener)
  })
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
