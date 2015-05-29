function createPage (name, opts, context) {
  var page = this.createAsset('page_standard', opts, context)

  page
    .addPath(name)
    .setAttribute('name', name)
    .setAttribute('short_name', name)

  page
    .createAsset('bodycopy', { link: 'type_2', dependant: '1', exclusive: '1' })
    .createAsset('bodycopy_div', { link: 'type_2', dependant: '1' })
    .createAsset('content_type_wysiwyg', { link: 'type_2', dependant: '1', exclusive: '1' })

  return page
}

module.exports = createPage
