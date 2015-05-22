var Importer = require('node-matrix-importer')
var Asset = require('./asset')
var inherits = require('util').inherits

function Zion (writer) {
  this.writer = writer
  Asset.call(this)
}

inherits(Zion, Asset)

Zion.prototype.createAsset = function createAsset (type, opts, context) {
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

Zion.prototype.createPage = function createPage (name, opts, context) {
  var page = this.createAsset('page_standard', opts, context)

  page
    .addPath(name)
    .setAttribute('name', name)
    .setAttribute('short_name', name)

  page
    .createAsset('bodycopy', { link: 'type_2', dependant: '1', exclusive: '1' })
    .createAsset('bodycopy_div', { link: 'type_2', dependant: '1' })
    .createAsset('content_type_wysiwyg', { link: 'type_2', dependant: '1', exclusive: '1' })
}

Zion.prototype.toString = function toString (opts) {
  return this.writer.toString(opts)
}

module.exports = function zion (Writer) {
  Writer = Writer || new Importer({ sortActions: true })

  return new Zion(Writer)
}
