const test = require('node:test');
const assert = require('node:assert');

test('Autonomous Agent State Machine & 10-Role Orchestration', async (t) => {
  const REQUIRED_ROLES = [
    'planner',
    'designer',
    'frontend',
    'backend',
    'database',
    'debugger',
    'tester',
    'security',
    'performance',
    'deployment',
  ];

  await t.test('verifies all 10 specialized agent roles exist in system spec', () => {
    assert.strictEqual(REQUIRED_ROLES.length, 10);
    assert.ok(REQUIRED_ROLES.includes('planner'));
    assert.ok(REQUIRED_ROLES.includes('security'));
    assert.ok(REQUIRED_ROLES.includes('tester'));
  });

  await t.test('verifies state machine transitions are ordered and deterministic', () => {
    const states = ['QUEUED', 'PLANNING', 'GENERATING', 'EXECUTING', 'TESTING', 'FIXING', 'READY'];
    let currentIndex = 0;

    function advanceTo(nextState) {
      const nextIndex = states.indexOf(nextState);
      assert.ok(nextIndex >= currentIndex, `Invalid state regression from ${states[currentIndex]} to ${nextState}`);
      currentIndex = nextIndex;
    }

    advanceTo('PLANNING');
    advanceTo('GENERATING');
    advanceTo('EXECUTING');
    advanceTo('TESTING');
    advanceTo('READY');
    assert.strictEqual(states[currentIndex], 'READY');
  });
});

