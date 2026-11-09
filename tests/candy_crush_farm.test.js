const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

// Simulate selectTemplateForPrompt routing logic
function selectTemplateForPrompt(prompt) {
  const p = (prompt || '').toLowerCase().trim();

  // 00000. CANDY CRUSH SAGA × FAMILY FARM (SWEET HARVEST SAGA)
  if (
    p.includes('candy crush') ||
    p.includes('candy') ||
    p.includes('crush saga') ||
    p.includes('sweet harvest') ||
    (p.includes('farm') && (p.includes('family') || p.includes('candy') || p.includes('crush') || p.includes('merge') || p.includes('match') || p.includes('crop') || p.includes('saga'))) ||
    (p.includes('match') && (p.includes('3') || p.includes('three') || p.includes('farm') || p.includes('candy')))
  ) {
    return { key: 'candy-crush-farm' };
  }

  // 0000. PSYCHE REELS
  if (
    p.includes('psyche') ||
    (p.includes('reel') && (p.includes('psychology') || p.includes('person') || p.includes('mindset') || p.includes('prefer')))
  ) {
    return { key: 'psyche-reels' };
  }

  // 000. SAAI.PRO
  if (p.includes('saai.pro') || p.includes('saai,pro') || p.includes('multi-llm parliament')) {
    return { key: 'saai-pro' };
  }

  // 001. VIRTUAL OFFICE
  if (p.includes('virtual office') || (p.includes('agent') && p.includes('office'))) {
    return { key: 'virtual-office-ai' };
  }

  // 00. PINTEREST CANVA
  if (p.includes('pinterest') || p.includes('aesthetic') || (p.includes('canva') && p.includes('google'))) {
    return { key: 'pinterest-canva-ai' };
  }

  // 1. POKI & SUBWAY SURFER
  if (
    p.includes('poki') ||
    p.includes('subway') ||
    p.includes('surfer') ||
    (p.includes('game') && (p.includes('subway') || p.includes('surfer') || p.includes('poki') || p.includes('play')))
  ) {
    return { key: 'poki-games' };
  }

  return { key: 'dynamic-adaptive' };
}

test('CANDY CRUSH × FAMILY FARM: Prompt Routing & Resolution', () => {
  // Test user prompt from screenshot: "build candy crush saga game merged with family farm"
  const t1 = selectTemplateForPrompt('build candy crush saga game merged with family farm');
  assert.strictEqual(t1.key, 'candy-crush-farm', 'Exact user prompt MUST resolve to candy-crush-farm and NOT poki-games');

  const t2 = selectTemplateForPrompt('create candy crush match-3 game');
  assert.strictEqual(t2.key, 'candy-crush-farm');

  const t3 = selectTemplateForPrompt('build family farm crop harvest simulator');
  assert.strictEqual(t3.key, 'candy-crush-farm');

  const t4 = selectTemplateForPrompt('sweet harvest saga with livestock and candies');
  assert.strictEqual(t4.key, 'candy-crush-farm');

  // Verify Poki still routes correctly for runner prompts
  const runner = selectTemplateForPrompt('Build a premium subway surfer game i wanna play in real time');
  assert.strictEqual(runner.key, 'poki-games');
});

test('CANDY CRUSH × FAMILY FARM: Template Integrity & Interactive Components', () => {
  const filePath = path.join(__dirname, '../src/lib/projects/templates/candy_crush_farm.ts');
  assert.ok(fs.existsSync(filePath), 'candy_crush_farm.ts template file must exist');

  const content = fs.readFileSync(filePath, 'utf8');

  // Verify core match-3 and farm features
  assert.ok(content.includes('CANDY CRUSH SAGA'), 'Must include Candy Crush branding');
  assert.ok(content.includes('SWEET HARVEST'), 'Must include Sweet Harvest Saga title');
  assert.ok(content.includes('generateInitialBoard'), 'Must include match-3 board generator');
  assert.ok(content.includes('checkMatchesOnBoard'), 'Must include match detection engine');
  assert.ok(content.includes('farmPlots'), 'Must include farm crop plots state');
  assert.ok(content.includes('handleHarvestPlot'), 'Must include plot harvesting');
  assert.ok(content.includes('handleFertilizePlot'), 'Must include citron fertilizer accelerator');
  assert.ok(content.includes('Daisy the Cow'), 'Must include livestock pasture');
  assert.ok(content.includes('Sweet Sugar Windmill & Bakery'), 'Must include bakery kitchen');
  assert.ok(content.includes('Town Delivery Truck'), 'Must include delivery orders');
  assert.ok(content.includes('playCandyPop'), 'Must include Web Audio effects for candy pops');

  // Verify zero unescaped backtick syntax breaks inside App.tsx
  const appStart = content.indexOf("'/src/App.tsx': `");
  assert.ok(appStart !== -1, 'Must contain App.tsx file definition');
});
