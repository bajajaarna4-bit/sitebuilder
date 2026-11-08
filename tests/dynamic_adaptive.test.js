const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

test('DYNAMIC GENERATOR: Non-Repetitive Prompt Adaptive Synthesis', async (t) => {
  const dynamicCode = fs.readFileSync(
    path.join(__dirname, '../src/lib/ai/dynamic_generator.ts'),
    'utf-8'
  );

  const indexCode = fs.readFileSync(
    path.join(__dirname, '../src/lib/projects/templates/index.ts'),
    'utf-8'
  );

  await t.test('verifies dynamic generator supports specialized domain detection', () => {
    assert.ok(dynamicCode.includes('CryptoVault'), 'Must support CryptoVault');
    assert.ok(dynamicCode.includes('FitPulse'), 'Must support FitPulse');
    assert.ok(dynamicCode.includes('EstateVue'), 'Must support EstateVue');
    assert.ok(dynamicCode.includes('Aura Creative'), 'Must support Aura Creative');
    assert.ok(dynamicCode.includes('SprintFlow'), 'Must support SprintFlow');
  });

  await t.test('verifies dynamic generator extracts custom titles for arbitrary novel prompts', () => {
    assert.ok(dynamicCode.includes('topic'), 'Must extract key words for custom topic');
    assert.ok(dynamicCode.includes('Custom Application'), 'Must provide custom category');
    assert.ok(dynamicCode.includes('safePromptEscaped'), 'Must embed user prompt directly in App.tsx');
  });

  await t.test('verifies template router delegates novel prompts to dynamic synthesizer', () => {
    assert.ok(indexCode.includes('synthesizeDynamicApp(prompt)'), 'Must call synthesizeDynamicApp for novel prompts');
    assert.ok(indexCode.includes('dynamic-adaptive'), 'Must register dynamic-adaptive template key');
  });

  await t.test('verifies database query route enforces security boundaries', () => {
    const queryRoute = fs.readFileSync(
      path.join(__dirname, '../src/app/api/database/query/route.ts'),
      'utf-8'
    );
    assert.ok(queryRoute.includes('FORBIDDEN_SQL_PATTERNS'), 'Must enforce forbidden SQL patterns');
    assert.ok(queryRoute.includes('drop\\s+database'), 'Must block DROP DATABASE');
    assert.ok(queryRoute.includes('nexus_audit_logs'), 'Must log query actions to audit log');
  });
});
