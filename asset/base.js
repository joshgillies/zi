function Asset (type, opts, context) {
  if (!(this instanceof Asset)) {
    return new Asset(type, opts, context)
  }

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

  var asset = this.writer.createAsset(opts)

  for (var key in asset) {
    this[key] = asset[key]
  }

  context.call(this, this)
}

Asset.prototype.addPath = function addAssetPath (path) {
  var opts = {
    assetId: this.id,
    path: path
  }

  this.writer.addPath(opts)

  return this
}

Asset.prototype.addPath = function addAssetPath (path) {
  var opts = {
    assetId: this.id,
    path: path
  }

  this.writer.addPath(opts)

  return this
}

Asset.prototype.createAsset = function createSubAsset (type, opts, context) {
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

  return Asset(type, opts, context)
}

Asset.prototype.createLink = function createAssetLink (opts) {
  if (!opts.from) {
    opts.from = this.id
  }

  if (opts.type) {
    opts.link = opts.type
    opts.type = undefined
  }

  this.writer.createLink(opts)

  return this
}

Asset.prototype.setAttribute = function setAssetAttribute (key, value) {
  var opts = {
    attribute: key,
    value: value,
    assetId: this.id
  }

  this.writer.setAttribute(opts)

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

  this.writer.setAttribute(opts)

  return this
}

module.exports = Asset
