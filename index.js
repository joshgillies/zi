var actions = require('./actions');
var assets = require('./assets');

function Parser(input) {
  if (!(this instanceof Parser)) return Parser(input);
  this.actions = {
    createAssets: [],
    setAttributes: [],
    createLinks: [],
    setPermissions: []
  };

  if (typeof input !== 'object') throw new Error('Parser expects object as input');
}

Parser.prototype.toXML = function toXML() {
  return '<actions>' + Object.keys(this.actions).map(function getActions(action) {
    return this.actions[action].map(function actionToXML(action) {
      return action.toXML();
    }).join('');
  }, this).join('') + '</actions>';
};

module.exports = function zi() {
  return {
    parse: function parse(input) {
      return new Parser(input);
    }
  };
};
