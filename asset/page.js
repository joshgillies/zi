var asset = require('./')

function Page (name, opts, context) {
  if (!(this instanceof Page)) {
    return new Page(name, opts, context)
  }
  return asset('page_standard', opts, context)
}
