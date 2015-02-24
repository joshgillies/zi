var helpers = require('../actions/helpers');
var actions = require('../actions');
var test = require('tape');

test('use shorthand helpers', function(t) {
  t.equal(helpers.useKey('add_path'), 'add_web_path', 'shorthand selector');
  t.equal(helpers.useKey('create_asset'), 'create_asset', 'passthrough when no shorthand is available');
  t.end();
});

test('join asset type with id', function(t) {
  t.equal(helpers.asset('Site', '1'), 'Site_1');
  t.end();
});

test('create action ids', function(t) {
  t.equal(
    actions.getActionId('add_path')('Site_1'),
    'add_Site_1_path',
    'add path action id'
  );
  t.equal(
    actions.getActionId('create_link')(1, 2),
    'link_notice_1_to_2',
    'create link action id'
  );
  t.equal(
    actions.getActionId('set_attribute')('name', 'Site_1'),
    'set_Site_1_name',
    'set attribute action id'
  );
  t.equal(
    actions.getActionId('set_permission')(1, 1, 2),
    'set_permission_1_1_2',
    'set permission action id'
  );
  t.end();
});

test('create actions', function(t) {
  var action = actions.createAction('create_asset', {
    id: 'Site_1',
    parentId: 1,
    type: 'site'
  });
  var expected = {
    action_id: 'create_Site_1',
    action_type: 'create_asset',
    type_code: 'site',
    parentid: 1,
    value: '',
    link_type: 1,
    is_dependant: 0,
    is_exclusive: 0
  };
  var xml = [
    '<action>',
    '    <action_id>create_Site_1</action_id>',
    '    <action_type>create_asset</action_type>',
    '    <type_code>site</type_code>',
    '    <parentid>1</parentid>',
    '    <value></value>',
    '    <link_type>1</link_type>',
    '    <is_dependant>0</is_dependant>',
    '    <is_exclusive>0</is_exclusive>',
    '</action>'
  ].join('\n');
  t.deepEqual(action, expected, 'create asset object');
  t.equal(action.toXML(), xml, 'create asset XML');
  t.end();
});
