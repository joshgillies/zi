var helpers = require('../actions/helpers');
var actions = require('../actions');
var test = require('tape');

test('use shorthand helpers', function(t) {
  t.equal(helpers.useKey('add_path'), 'add_web_path', 'shorthand selector');
  t.equal(helpers.useKey('create_asset'), 'create_asset', 'passthrough when no shortahnd is available');
  t.end();
});

test('join asset type with id', function(t) {
  t.equal(helpers.asset('Site', '1'), 'Site_1');
  t.end();
});

test('create action ids', function(t) {
  t.equal(
    actions.getActionId('add_path', 'Site_1'),
    'add_Site_1_path',
    'add path action id'
  );
  t.equal(
    actions.getActionId('create_link', 1, 2),
    'link_notice_1_to_2',
    'create link action id'
  );
  t.equal(
    actions.getActionId('set_attribute', 'name', 'Site_1'),
    'set_Site_1_name',
    'set attribute action id'
  );
  t.equal(
    actions.getActionId('set_permission', 1, 1, 2),
    'set_permission_1_1_2',
    'set permission action id'
  );
  t.end();
});

