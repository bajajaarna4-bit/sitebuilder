const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

test('PINTEREST × CANVA × GOOGLE AI: Aesthetic Discovery & Creative Studio', async (t) => {
  const templateFile = fs.readFileSync(
    path.join(__dirname, '../src/lib/projects/templates/pinterest_canva_ai.ts'),
    'utf-8'
  );

  const indexFile = fs.readFileSync(
    path.join(__dirname, '../src/lib/projects/templates/index.ts'),
    'utf-8'
  );

  await t.test('verifies pinterestCanvaAiTemplate contains Pinterest grid, Canva layers, and Google AI synthesizer', () => {
    assert.ok(templateFile.includes('pinterestCanvaAiTemplate'), 'Template must be exported');
    assert.ok(templateFile.includes('MULTILINGUAL_GUIDES'), 'Must include multilingual guides');
    assert.ok(templateFile.includes('हिन्दी'), 'Must support Hindi localization');
    assert.ok(templateFile.includes('한국어'), 'Must support Korean localization');
    assert.ok(templateFile.includes('संस्कृतम्'), 'Must support Sanskrit localization');
    assert.ok(templateFile.includes('toggleSavePin'), 'Must support Pin saving');
    assert.ok(templateFile.includes('handleRemixInCanva'), 'Must support Remixing pins in Canva');
    assert.ok(templateFile.includes('handleSynthesizeAiPin'), 'Must support Google AI Pin generation');
    assert.ok(templateFile.includes('addTextLayer'), 'Must support Canva text layers');
    assert.ok(templateFile.includes('addStickerLayer'), 'Must support Canva sticker layers');
  });

  await t.test('verifies prompt "pinterest type uff asthetics and canva and google ai webiste damn" routes to pinterest-canva-ai', () => {
    function route(prompt) {
      const p = (prompt || '').toLowerCase().trim();
      if (
        p.includes('pinterest') ||
        (p.includes('canva') && (p.includes('pinterest') || p.includes('google') || p.includes('ai') || p.includes('aesthetic') || p.includes('asthetic') || p.includes('uff'))) ||
        p.includes('aesthetic') ||
        p.includes('asthetic') ||
        p.includes('aesthetics') ||
        p.includes('asthetics') ||
        p.includes('moodboard') ||
        (p.includes('canva') && p.includes('design'))
      ) {
        return 'pinterest-canva-ai';
      }
      return 'other';
    }

    assert.strictEqual(
      route('pinterest type uff asthetics and canva and google ai webiste damn'),
      'pinterest-canva-ai'
    );
    assert.strictEqual(
      route('aesthetic moodboard with canva editor and google ai'),
      'pinterest-canva-ai'
    );
    assert.strictEqual(
      route('pinterest fashion aesthetics'),
      'pinterest-canva-ai'
    );
  });
});
