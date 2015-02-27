# Zion (zi)

An import utility for Squiz Matrix.

[![Build Status](https://travis-ci.org/joshgillies/zi.svg)](https://travis-ci.org/joshgillies/zi)

## Motivation

Zion or Zi for short aims to provide a utility for both generation and optimisation
of asset XML manifests as expected by Squiz Matrix' "[Import Assets from XML Tool]".

Currently the only way of generating an import.xml is either by exporting an
asset tree from Squiz Matrix, or writing your own by hand. It's only XML after all.

Whilst the latter isn't unreasonable it's far from practical or sustainable.
An exported asset tree can potentially consist of hundreds of interwoven typically
synchronous operations, resulting in a less than performant import process.
As a result the import tool typically goes unused.

### Goals

 - Provide programatic API for generating asset import.xml manifests
 - Optimise import.xml manifests by batching various operations

## License

MIT

[Import Assets from XML Tool]: http://manuals.matrix.squizsuite.net/tools/chapters/import-assets-from-xml-tool
