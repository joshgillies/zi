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

function actionAddPath(opts) {
  var type = 'add_web_path';

  return {
    action_id: getActionId.apply(null, [type, opts.id]),
    action_type: type,
    asset: opts.assetId, // id of asset performing action against
    path: opts.path // web path
  };
}

function actionCreateAsset(opts) {
  var type = 'create_asset';

  return {
    action_id: getActionId.apply(null, [type, opts.id]),
    action_type: type,
    type_code: opts.type,
    parentid: opts.parentId || 1,
    value: opts.value || '',
    link_type: opts.link || LINKS['TYPE_1'],
    is_dependant: opts.dependant || 0,
    is_exclusive: opts.exclusive || 0
  };
}

function actionCreateLink(opts) {
  var type = 'create_link';

  return {
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
}

function actionSetAttribute(opts) {
  var type = 'set_attribute_value';

  return {
    action_id: getActionId.apply(null, [type, opts.attribute, opts.id]),
    action_type: type,
    asset: opts.assetId,
    attribute: opts.attribute,
    value: opts.value || ''
  };
}

function actionSetPermission(opts) {
  var type = 'set_permission';

  return {
    action_id: getActionId.apply(null, [type, opts.assetId, opts.permission, opts.userId]),
    action_type: type,
    asset: opts.assetId,
    permission: opts.permission || 1,
    granted: opts.granted || 1,
    userid: opts.userId || 7
  };
}

exports.createAction = function createAction(type, opts) {
  type = useKey(type);

  if (type === 'add_web_path') {
    return actionAddPath(opts);
  }

  if (type === 'create_asset') {
    return actionCreateAsset(opts);
  }

  if (type === 'create_link') {
    return actionCreateLink(opts);
  }

  if (type === 'set_attribute_value') {
    return actionSetAttribute(opts);
  }

  if (type === 'set_permission') {
    return actionSetPermission(opts);
  }

  throw new Error('Unknown action type of \'' + type + '\'');
};
exports.getActionId = getActionId;
