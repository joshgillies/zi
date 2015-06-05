# Zion

An import/export utility for Squiz Matrix.

[![Build Status](https://travis-ci.org/joshgillies/zion.svg)](https://travis-ci.org/joshgillies/zi)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## API (WIP)

### Zion(writer)

The `zion` constructor takes a single argument `writer`.
Where `writer` is a mechanism for producing input compatible with Squiz Matrix.
If it is not set, [node-matrix-importer] will be used as the default.

The original `writer` object is exposed via `zion.writer` for later use.

[node-matrix-importer]: https://github.com/joshgillies/node-matrix-importer

#### zion.createBundle(type, opts, scope)

### Asset(type, opts, scope)

#### asset.addPath(opts)

#### asset.createAsset(type, opts, scope)

#### asset.createLink(opts)

#### asset.setAttribute(opts)

#### asset.setPermission(opts)

## License

MIT
