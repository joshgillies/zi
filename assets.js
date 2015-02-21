var ASSETS = require('node-matrix-assets');

var ASSET_HELPERS = {};

for (var key in ASSETS) {
  ASSET_HELPERS[ASSETS[key].name] = key;
}

module.exports = function getAssetInfo(asset) {
  return ASSET_HELPERS[asset] ?
    ASSETS[ASSET_HELPERS[asset]] : ASSETS[asset];
};

