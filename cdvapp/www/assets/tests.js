'use strict';

define('webapp/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/connect-four.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/connect-four.js should pass ESLint\n\n102:9 - \'draw\' is assigned a value but never used. (no-unused-vars)\n317:9 - \'createjs\' is not defined. (no-undef)\n318:9 - \'createjs\' is not defined. (no-undef)\n319:9 - \'createjs\' is not defined. (no-undef)\n320:9 - \'createjs\' is not defined. (no-undef)\n321:9 - \'createjs\' is not defined. (no-undef)\n326:16 - \'shake\' is not defined. (no-undef)\n327:17 - \'shake\' is not defined. (no-undef)\n336:25 - \'createjs\' is not defined. (no-undef)\n338:25 - \'createjs\' is not defined. (no-undef)\n373:33 - \'createjs\' is not defined. (no-undef)\n382:36 - \'createjs\' is not defined. (no-undef)\n394:9 - \'createjs\' is not defined. (no-undef)\n399:12 - \'shake\' is not defined. (no-undef)\n400:13 - \'shake\' is not defined. (no-undef)\n426:25 - \'createjs\' is not defined. (no-undef)\n453:25 - \'createjs\' is not defined. (no-undef)\n454:29 - \'move_count\' is already defined. (no-redeclare)\n455:29 - \'marker\' is already defined. (no-redeclare)\n466:37 - \'createjs\' is not defined. (no-undef)\n478:37 - \'createjs\' is not defined. (no-undef)\n479:41 - \'move\' is already defined. (no-redeclare)\n490:37 - \'createjs\' is not defined. (no-undef)\n491:41 - \'move\' is already defined. (no-redeclare)\n521:25 - \'createjs\' is not defined. (no-undef)\n523:25 - \'createjs\' is not defined. (no-undef)\n527:25 - \'createjs\' is not defined. (no-undef)\n547:21 - \'createjs\' is not defined. (no-undef)\n548:21 - \'createjs\' is not defined. (no-undef)\n550:17 - \'createjs\' is not defined. (no-undef)\n551:17 - \'createjs\' is not defined. (no-undef)\n553:17 - \'createjs\' is not defined. (no-undef)\n584:21 - \'createjs\' is not defined. (no-undef)\n585:21 - \'createjs\' is not defined. (no-undef)\n587:17 - \'createjs\' is not defined. (no-undef)\n588:17 - \'createjs\' is not defined. (no-undef)\n590:17 - \'createjs\' is not defined. (no-undef)');
  });

  QUnit.test('controllers/game.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/game.js should pass ESLint\n\n');
  });

  QUnit.test('models/highscore.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/highscore.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/game.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/game.js should pass ESLint\n\n');
  });

  QUnit.test('routes/highscores.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/highscores.js should pass ESLint\n\n');
  });
});
define('webapp/tests/integration/components/connect-four-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | connect-four', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "0Boo/u/+",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"connect-four\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "cs3ejjJA",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"connect-four\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('webapp/tests/test-helper', ['webapp/app', 'webapp/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('webapp/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('integration/components/connect-four-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/connect-four-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/adapters/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/game-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/game-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/highscore-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/highscore-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/game-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/game-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/highscores-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/highscores-test.js should pass ESLint\n\n');
  });
});
define('webapp/tests/unit/adapters/application-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });
  });
});
define('webapp/tests/unit/controllers/game-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | game', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:game');
      assert.ok(controller);
    });
  });
});
define('webapp/tests/unit/models/highscore-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | highscore', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('highscore', {});
      assert.ok(model);
    });
  });
});
define('webapp/tests/unit/routes/game-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | game', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:game');
      assert.ok(route);
    });
  });
});
define('webapp/tests/unit/routes/highscores-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | highscores', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:highscores');
      assert.ok(route);
    });
  });
});
define('webapp/config/environment', [], function() {
  var prefix = 'webapp';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('webapp/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
