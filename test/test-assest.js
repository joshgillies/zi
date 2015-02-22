var assets = require('../assets');
var test = require('tape');

test('aasset helpers', function(t) {
  var expected = {
    type_code: 'page_standard',
    version: '0.2',
    name: 'Standard Page',
    instantiable: '1',
    allowed_access: 'backend_user',
    parent_type: 'page',
    dir: 'core/assets/page_templates/page_standard',
    customisation: '0',
    description: 'Standard Page, contains a bodycopy for simple content',
    lvl: '2'
  };

  t.deepEqual(assets('Standard Page'), expected, 'get asset definition by name');
  t.deepEqual(assets('page_standard'), expected, 'get asset definition by type_code');
  t.false(assets('test'), 'unknown asset returns undefined');
  t.end();
});
