var helpers = require('../actions/helpers');
var actions = require('../actions');
var test = require('tape');

test('use shorthand helpers', function(t) {
  t.equal(helpers.useKey('add_path'), 'add_web_path');
  t.equal(helpers.useKey('create_asset'), 'create_asset');
  t.end();
});

test('join asset type with id', function(t) {
  t.equal(helpers.asset('Site', '1'), 'Site_1');
  t.end();
});

test('create action ids', function(t) {
  t.equal(
    actions.getActionId('add_path', 'Site_1'),
    'add_Site_1_path'
  );
  t.equal(
    actions.getActionId('create_link', 1, 2),
    'link_notice_1_to_2'
  );
  t.equal(
    actions.getActionId('set_attribute', 'name', 'Site_1'),
    'set_Site_1_name'
  );
  t.equal(
    actions.getActionId('set_attribute', 'cache_globally', 'Site_1'),
    'set_Site_1_not_found_page_cache_globally'
  );
  t.end();
});

