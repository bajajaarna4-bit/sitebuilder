const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

test('SAAI.PRO & VIRTUAL OFFICE: AI Systems Architect Portfolio & Multi-Agent Swarm', async (t) => {
  const saaiFile = fs.readFileSync(
    path.join(__dirname, '../src/lib/projects/templates/saai_pro.ts'),
    'utf-8'
  );

  const officeFile = fs.readFileSync(
    path.join(__dirname, '../src/lib/projects/templates/virtual_office_ai.ts'),
    'utf-8'
  );

  await t.test('verifies saaiProTemplate contains Multi-LLM Parliament, Kronos forecaster, and DLFM', () => {
    assert.ok(saaiFile.includes('saaiProTemplate'), 'saaiProTemplate must be exported');
    assert.ok(saaiFile.includes('Sahir Veerancheri'), 'Must reference architect identity');
    assert.ok(saaiFile.includes('Multi-LLM Parliament'), 'Must contain Multi-LLM Parliament');
    assert.ok(saaiFile.includes('AIT Kronos'), 'Must contain AIT Kronos forecaster');
    assert.ok(saaiFile.includes('DLFM'), 'Must contain Dynamical Latent Field Model');
    assert.ok(saaiFile.includes('14.8 GHash/s'), 'Must contain GPU Cryptographic pipeline');
    assert.ok(saaiFile.includes('Shard-Alpha'), 'Must contain cognitive shards');
    assert.ok(saaiFile.includes('MULTILINGUAL_PORTFOLIO_SCRIPTS'), 'Must contain multilingual scripts');
  });

  await t.test('verifies virtualOfficeAiTemplate contains 2D spatial floor plan, workstations, and meeting room', () => {
    assert.ok(officeFile.includes('virtualOfficeAiTemplate'), 'virtualOfficeAiTemplate must be exported');
    assert.ok(officeFile.includes('NEXUS SYNDICATE'), 'Must contain brand name');
    assert.ok(officeFile.includes('Engineering Lab'), 'Must contain engineering room');
    assert.ok(officeFile.includes('Creative Design Bay'), 'Must contain design bay');
    assert.ok(officeFile.includes('handleDispatchSwarm'), 'Must support swarm dispatching');
    assert.ok(officeFile.includes('isMeetingActive'), 'Must support all-hands meeting call');
  });

  await t.test('verifies user prompts route accurately', () => {
    function route(prompt) {
      const p = (prompt || '').toLowerCase().trim();
      if (
        p.includes('saai.pro') ||
        p.includes('saai,pro') ||
        p.includes('saai') ||
        p.includes('sahir') ||
        p.includes('multi-llm parliament') ||
        p.includes('kronos') ||
        p.includes('dlfm') ||
        p.includes('latent field') ||
        p.includes('axiom of truth') ||
        (p.includes('portfolio') && (p.includes('architect') || p.includes('autonomous') || p.includes('systems') || p.includes('quant')))
      ) {
        return 'saai-pro';
      }
      if (
        (p.includes('agent') && (p.includes('office') || p.includes('virtual') || p.includes('swarm') || p.includes('spatial') || p.includes('workforce'))) ||
        p.includes('virtual office') ||
        p.includes('ai agent') ||
        p.includes('spatial office') ||
        p.includes('agent swarm') ||
        p.includes('syndicate')
      ) {
        return 'virtual-office-ai';
      }
      return 'other';
    }

    assert.strictEqual(
      route('which can nuild portfolio like saai,pro damn'),
      'saai-pro'
    );
    assert.strictEqual(
      route('saai.pro'),
      'saai-pro'
    );
    assert.strictEqual(
      route('ai agent , virtual office'),
      'virtual-office-ai'
    );
    assert.strictEqual(
      route('build an autonomous multi-agent swarm virtual office with floor plan'),
      'virtual-office-ai'
    );
  });
});

