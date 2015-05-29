# Zion 

An import/export utility for Squiz Matrix.

[![Build Status](https://travis-ci.org/joshgillies/zion.svg)](https://travis-ci.org/joshgillies/zi)

## Motivation

Zion aims to provide a utility for both generation and optimisation
of asset XML manifests as expected by Squiz Matrix' "[Import Assets from XML Tool]".

Currently the only way of generating an import.xml is either by exporting an
asset tree from Squiz Matrix, or writing your own by hand. It's only XML after all.

Whilst the latter isn't unreasonable it's far from practical or sustainable.
An exported asset tree can potentially consist of hundreds of interwoven typically
synchronous operations, resulting in a less than performant import process.
As a result the import tool typically gets overlooked as a tool for automation
and even maintenance of Squiz Matrix implementations.

### Goals

 - Unlock the true potential of the "[Import Assets from XML Tool]".
 - Provide programatic API for generating asset import.xml manifests.
 - Optimise import.xml manifests by batching various operations.
 - Parse exported asset trees for local replication, thus enabling development outside of Matrix!
 - Investigate alternate uses for the "[Import Assets from XML Tool]". eg. update assets from XML!

## API

### Actions

An action is a task that is performed against a Squiz Matrix system.

Zion exposes the following methods for creating actions:

#### zion.addPath(opts)

#### zion.createAsset(opts)

#### zion.createLink(opts)

#### zion.setAttribute(opts)

#### zion.setPermission(opts)

## License

MIT

[Import Assets from XML Tool]: http://manuals.matrix.squizsuite.net/tools/chapters/import-assets-from-xml-tool
