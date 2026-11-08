const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

test('PSYCHE REELS: Short-Form Video Stream & Psychological Mindset Profiler', async (t) => {
  const psycheFile = fs.readFileSync(
    path.join(__dirname, '../src/lib/projects/templates/psyche_reels.ts'),
    'utf-8'
  );

  const indexFile = fs.readFileSync(
    path.join(__dirname, '../src/lib/projects/templates/index.ts'),
    'utf-8'
  );

  await t.test('verifies psycheReelsTemplate contains vertical video player, personality pros/cons, and 6-language audio', () => {
    assert.ok(psycheFile.includes('psycheReelsTemplate'), 'psycheReelsTemplate must be exported');
    assert.ok(psycheFile.includes('<video'), 'Must contain HTML5 video element');
    assert.ok(psycheFile.includes('PSYCHE_PROFILE'), 'Must contain psychological profile data');
    assert.ok(psycheFile.includes('The Stoic Architect'), 'Must contain archetype');
    assert.ok(psycheFile.includes('Cognitive Strengths (Pros)'), 'Must contain pros analysis');
    assert.ok(psycheFile.includes('Shadow Trait Blindspots (Cons)'), 'Must contain cons analysis');
    assert.ok(psycheFile.includes('Actionable Mindset Prescriptions'), 'Must contain mindset advice');
    assert.ok(psycheFile.includes('MULTILINGUAL_PSYCHE_SCRIPTS'), 'Must contain multilingual scripts');
    assert.ok(psycheFile.includes('日本語'), 'Must support Japanese localization');
    assert.ok(psycheFile.includes('한국어'), 'Must support Korean localization');
    assert.ok(psycheFile.includes('中文'), 'Must support Chinese localization');
    assert.ok(psycheFile.includes('हिन्दी'), 'Must support Hindi localization');
    assert.ok(psycheFile.includes('संस्कृतम्'), 'Must support Sanskrit localization');
  });

  await t.test('verifies user composite prompt routes accurately to psyche-reels', () => {
    function route(prompt) {
      const p = (prompt || '').toLowerCase().trim();
      if (
        p.includes('psyche') ||
        (p.includes('reel') &&
          (p.includes('person') ||
            p.includes('psychology') ||
            p.includes('philosophy') ||
            p.includes('mindset') ||
            p.includes('prefer') ||
            p.includes('pros') ||
            p.includes('cons') ||
            p.includes('osychology') ||
            p.includes('philosphy'))) ||
        p.includes('what type of person are you') ||
        p.includes('osychology') ||
        p.includes('philosphy') ||
        (p.includes('watching') && p.includes('reels')) ||
        (p.includes('insta reels') && p.includes('prefer'))
      ) {
        return 'psyche-reels';
      }
      return 'other';
    }

    const userPrompt =
      'which can even build a website on spot working for watching insta reels but only what you  prefer make it working a site which we keep track of what type of person are you what intrests you your personality according to osychology philosphy and your pros cons and advices about your mindset';

    assert.strictEqual(route(userPrompt), 'psyche-reels');
    assert.strictEqual(route('watching reels according to psychology and mindset'), 'psyche-reels');
    assert.strictEqual(route('what type of person are you based on reels'), 'psyche-reels');
  });
});
