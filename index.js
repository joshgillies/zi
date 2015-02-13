var assert = require('assert');
var format = require('string-template');

function actionId(template, expected) {
  return function formatter() {
    var args = Array.prototype.slice.call(arguments);
    expected = expected || 1;
    if (args.length === expected)
      return format(template, args);
    throw new Error(format('Expected {0} arguments instead got {1}', expected, args.length));
  };
}

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
  set_attribute_value: ATTRIBUTES
};

var HELPERS = {
  cache_globally: 'not_found_page_cache_globally',
  set_attribute: 'set_attribute_value',
  add_path: 'add_web_path'
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

function useKey(key) {
  return HELPERS[key] || key;
}

assert.equal(
  getActionId('create_link', 1, 2),
  'link_notice_1_to_2'
);
assert.equal(
  getActionId('set_attribute', 'name', 'Site_1'),
  'set_Site_1_name'
);
assert.equal(
  getActionId('set_attribute', 'cache_globally', 'Site_1'),
  'set_Site_1_not_found_page_cache_globally'
);
