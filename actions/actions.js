var helpers = require('./helpers');
var actionId = helpers.actionId;
var useKey = helpers.useKey;

var ATTRIBUTES = {
  attributes: actionId('set_{0}_attributes'),
  html: actionId('set_{0}_html'),
  name: actionId('set_{0}_name'),
  not_found_page_cache_globally: actionId('set_{0}_not_found_page_cache_globally'),
  short_name: actionId('set_{0}_short_name')
};

var ACTIONS = {
  add_web_path: actionId('add_{0}_path'),
  create_asset: actionId('create_{0}'),
  create_link: actionId('link_notice_{0}_to_{1}', 2),
  set_attribute_value: ATTRIBUTES,
  set_permission: actionId('set_permission_{0}_{1}_{2}', 3)
};

var LINKS = {
  TYPE_1: 1,
  TYPE_2: 2,
  TYPE_3: 4,
  NOTICE: 8
};

var PERMISSIONS = {
  READ: 1,
  WRITE: 2,
  ADMIN: 3
};

var PUBLIC_USER = 7;

function getActionId(type) {
  return function actionId() {
    var args = Array.prototype.slice.call(arguments);
    var action = ACTIONS[useKey(type)];
    if (typeof action === 'object')
      action = action[useKey(args.shift())];
    return action.apply(null, args);
  };
}

function Action(type, opts) {
  if(!(this instanceof Action))
    return new Action(type, opts);

  var DEFAULTS = {
    action_id: getActionId(type),
    action_type: useKey(type),
    asset: opts.assetId || opts.from, // id of asset performing action against
    assetid: opts.to, // id of asset linking to
    attribute: opts.attribute,
    granted: opts.granted ? 1 : 0,
    is_dependant: opts.dependant ? 1 : 0,
    is_exclusive: opts.exclusive ? 1 : 0,
    is_major: opts.major || '', // ???
    link_type: typeof opts.link === 'string' ?
      LINKS[opts.link.toUpperCase() || 'TYPE_1'] : opts.link || 1,
    parentid: opts.parentId || 1,
    path: opts.path, // web path
    permission: typeof opts.permission === 'string' ?
      PERMISSIONS[opts.permission.toUpperCase() || 'READ'] : opts.permission || 1,
    type_code: opts.type,
    userid: opts.userId || PUBLIC_USER,
    value: opts.value || ''
  };

  var properties = ['action_type'];

  switch (DEFAULTS.action_type) {
    case 'add_web_path':
      this.action_id = DEFAULTS.action_id.call(null, opts.id);
      properties.push('asset', 'path');
      break;
    case 'create_asset':
      this.action_id = DEFAULTS.action_id.call(null, opts.id);
      properties.push('type_code', 'parentid', 'value', 'link_type', 'is_dependant', 'is_exclusive');
      break;
    case 'create_link':
      this.action_id = DEFAULTS.action_id.call(null, opts.to, opts.from);
      properties.push('asset', 'value', 'link_type', 'is_dependant', 'is_exclusive', 'assetid', 'is_major');
      break;
    case 'set_attribute_value':
      this.action_id = DEFAULTS.action_id.call(null, opts.attribute, opts.id);
      properties.push('asset', 'attribute', 'value');
      break;
    case 'set_permission':
      this.action_id = DEFAULTS.action_id.call(null, opts.assetId, opts.permission, opts.userId);
      properties.push('asset', 'permission', 'granted', 'userid');
      break;
    default:
      throw new Error('Unknown action type of \'' + type + '\'');
  }

  properties.forEach(function assignDefaults(value) {
    this[value] = DEFAULTS[value];
  }, this);
}

Action.prototype.toXML = function actionToXML() {
  function keyToXML(key) {
    return '    <' + key + '>' + this[key] + '</' + key + '>';
  }
  return ['<action>', Object.keys(this).map(keyToXML, this).join('\n'), '</action>'].join('\n');
};

exports.Action = Action;
exports.createAction = Action;
exports.getActionId = getActionId;
