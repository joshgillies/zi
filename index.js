var Importer = require('node-matrix-importer')
var Asset = require('./asset')
var inherits = require('util').inherits

function Zion (writer) {
  this.writer = writer
  Asset.call(this)
}

inherits(Zion, Asset)

Zion.prototype.createAsset = function createSubAsset (type, opts, context) {
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

  Asset.call(this, type, opts, context)

  return this
}

Zion.prototype.toString = function toString (opts) {
  return this.writer.toString(opts)
}

module.exports = function zion (Writer) {
  Writer = Writer || new Importer({ sortActions: true })

  return new Zion(Writer)
}
