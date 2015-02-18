var helpers = require('./helpers');
var actionId = helpers.actionId;
var useKey = helpers.useKey;

var ATTRIBUTES = {
  name: actionId('set_{0}_name'),
  short_name: actionId('set_{0}_short_name'),
  not_found_page_cache_globally: actionId('set_{0}_not_found_page_cache_globally'),
  attributes: actionId('set_{0}_attributes')
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

function getActionId(type) {
  var args = Array.prototype.slice.call(arguments, 1);
  var action = ACTIONS[useKey(type)];
  if (typeof action === 'object')
    action = action[useKey(args.shift())];
  return action.apply(null, args);
}

function Action(type, opts) {
  if(!(this instanceof Action))
    return new Action(type, opts);

  if(!(type = useKey(type)))
    throw new Error('Unknown action type of \'' + type + '\'');

  switch (type) {
    case 'add_web_path':
      this.opts = {
        action_id: getActionId.apply(null, [type, opts.id]),
        action_type: type,
        asset: opts.assetId, // id of asset performing action against
        path: opts.path // web path
      };
      break;
    case 'create_asset':
      this.opts = {
        action_id: getActionId.apply(null, [type, opts.id]),
        action_type: type,
        type_code: opts.type,
        parentid: opts.parentId || 1,
        value: opts.value || '',
        link_type: opts.link || LINKS['TYPE_1'],
        is_dependant: opts.dependant || 0,
        is_exclusive: opts.exclusive || 0
      };
      break;
    case 'create_link':
      this.opts = {
        action_id: getActionId.apply(null, [type, opts.to, opts.from]),
        action_type: type,
        asset: opts.assetId,
        value: opts.value || '',
        link_type: opts.link || LINKS['TYPE_1'],
        is_dependant: opts.dependant || 0,
        is_exclusive: opts.exclusive || 0,
        assetid: '', // id of asset linking to
        is_major: '' // ???
      };
      break;
    case 'set_attribute_value':
      this.opts = {
        action_id: getActionId.apply(null, [type, opts.attribute, opts.id]),
        action_type: type,
        asset: opts.assetId,
        attribute: opts.attribute,
        value: opts.value || ''
      };
      break;
    case 'set_permission':
      this.opts = {
        action_id: getActionId.apply(null, [type, opts.assetId, opts.permission, opts.userId]),
        action_type: type,
        asset: opts.assetId,
        permission: opts.permission || 1,
        granted: opts.granted || 1,
        userid: opts.userId || 7
      };
      break;
  }
}

Action.prototype.toXML = function assetToXML() {
  function keyToXML(key) {
    return '<' + key + '>' + this[key] + '</' + key + '>';
  }
  return '<action>' + Object.keys(this.opts).map(keyToXML, this.opts).join('') + '</action>';
};

exports.Action = Action;
exports.createAction = Action;
exports.getActionId = getActionId;
