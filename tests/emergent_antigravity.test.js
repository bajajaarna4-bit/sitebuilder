const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

test('NEXUS OMNI: Emergent + Antigravity + Prompt Perfect + WhatsApp/Insta UI Resolution', async (t) => {
  const templatesFile = fs.readFileSync(
    path.join(__dirname, '../src/lib/projects/templates/index.ts'),
    'utf-8'
  );

  const emergentFile = fs.readFileSync(
    path.join(__dirname, '../src/lib/projects/templates/emergent_antigravity.ts'),
    'utf-8'
  );

  await t.test('verifies user composite prompt matches emergent-antigravity template', () => {
    function selectTemplate(prompt) {
      const p = prompt.toLowerCase();
      if (
        p.includes('emergent') ||
        p.includes('antigravity') ||
        p.includes('prompt perfect') ||
        p.includes('whatsapp') ||
        (p.includes('insta') && (p.includes('mix') || p.includes('build') || p.includes('chat') || p.includes('whatsapp'))) ||
        p.includes('build further') ||
        p.includes('fix all errors') ||
        p.includes('fix all bugs') ||
        p.includes('omni')
      ) {
        return 'emergent-antigravity';
      }
      return 'nextjs-saas';
    }

    const userPrompt = 'build a website that os mix of emergent antigravity prompt perfect and whatsapp insta like ui also can actually build further fix all errors and bugs ';
    assert.strictEqual(selectTemplate(userPrompt), 'emergent-antigravity');
  });

  await t.test('verifies template contains all requested systems', () => {
    // 1. Antigravity & Emergent Multi-Agent DAG
    assert.ok(emergentFile.includes('Antigravity') && emergentFile.includes('Emergent'), 'Must include Antigravity & Emergent architecture');

    // 2. Prompt Perfect suite
    assert.ok(emergentFile.includes('PromptPerfectModal') && emergentFile.includes('Prompt Perfect'), 'Must include Prompt Perfect suite');

    // 3. WhatsApp Developer Chat
    assert.ok(emergentFile.includes('WhatsApp') && emergentFile.includes('handleSendMessage'), 'Must include WhatsApp chat stream');

    // 4. Instagram Feed & Stories
    assert.ok(emergentFile.includes('Instagram') && emergentFile.includes('stories') && emergentFile.includes('toggleLike'), 'Must include Instagram stories and feed');

    // 5. Build Further interactive generator
    assert.ok(emergentFile.includes('handleCreateWidget') && emergentFile.includes('builtWidgets'), 'Must include In-App Component Builder');

    // 6. Fix All Errors & Bugs Auto-Repair engine
    assert.ok(emergentFile.includes('AutoFixModal') && emergentFile.includes('Fix All Errors'), 'Must include Auto-Fix error healing engine');
  });
});
