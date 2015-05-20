var Asset = require('./asset')

function Zion (Writer) {
  this.writer = Writer({ sortActions: true })
}

Zion.prototype.createAsset = function createAsset (type, opts, context) {
  var asset = Asset(type, opts, context)

  return asset.call(this)
}

module.exports = function zion (Writer) {
  Writer = Writer || require('node-matrix-importer')

  return new Zion(Writer)
}
