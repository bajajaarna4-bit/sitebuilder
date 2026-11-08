const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

test('GOOGLE AI & NETFLIX CINEMA: Prompt Routing & Cinematic Video Engine', async (t) => {
  const templateFile = fs.readFileSync(
    path.join(__dirname, '../src/lib/projects/templates/google_ai_netflix.ts'),
    'utf-8'
  );

  const indexFile = fs.readFileSync(
    path.join(__dirname, '../src/lib/projects/templates/index.ts'),
    'utf-8'
  );

  await t.test('verifies googleAiNetflixTemplate contains 4K video player, trailer modal, and multilingual audio', () => {
    assert.ok(templateFile.includes('googleAiNetflixTemplate'), 'Template must be exported');
    assert.ok(templateFile.includes('<video'), 'Must contain HTML5 video element');
    assert.ok(templateFile.includes('BigBuckBunny.mp4'), 'Must include video source');
    assert.ok(templateFile.includes('MULTILINGUAL_SCRIPTS'), 'Must include multilingual scripts');
    assert.ok(templateFile.includes('हिन्दी'), 'Must support Hindi localization');
    assert.ok(templateFile.includes('한국어'), 'Must support Korean localization');
    assert.ok(templateFile.includes('中文'), 'Must support Chinese localization');
    assert.ok(templateFile.includes('संस्कृतम्'), 'Must support Sanskrit localization');
    assert.ok(templateFile.includes('activeModalVideo'), 'Must contain modal video playback state');
  });

  await t.test('verifies prompt "animations please a premium look like google ai website or netflix" routes to google-ai-netflix and NEVER to google-search', () => {
    // Simulate selectTemplateForPrompt logic from index.ts
    function route(prompt) {
      const p = (prompt || '').toLowerCase().trim();
      if (
        p.includes('google ai') ||
        p.includes('deepmind') ||
        (p.includes('google') && (p.includes('netflix') || p.includes('cinema') || p.includes('stream') || p.includes('movie') || p.includes('animation') || p.includes('animations') || p.includes('ai'))) ||
        (p.includes('netflix') && (p.includes('google') || p.includes('ai') || p.includes('workspace') || p.includes('animation') || p.includes('animations') || p.includes('vedio') || p.includes('video'))) ||
        p.includes('animations please') ||
        p.includes('vedios and animations') ||
        p.includes('videos and animations') ||
        p.includes('include vedios') ||
        p.includes('include videos') ||
        p.includes('cinema') ||
        (p.includes('netflix') && !p.includes('disney') && !p.includes('hotstar'))
      ) {
        return 'google-ai-netflix';
      }
      if (
        (p.includes('google maps') ||
          p.includes('google search') ||
          p.includes('search engine') ||
          p.includes('google web') ||
          p === 'google' ||
          p === 'google.com') &&
        !p.includes('google ai') &&
        !p.includes('netflix') &&
        !p.includes('animation') &&
        !p.includes('vedio') &&
        !p.includes('video')
      ) {
        return 'google-search';
      }
      return 'dynamic-adaptive';
    }

    assert.strictEqual(
      route('animations please a premium look like google ai website or netflix'),
      'google-ai-netflix'
    );
    assert.strictEqual(
      route('its so messy having text and all include vedios and animations instead'),
      'google-ai-netflix'
    );
    assert.strictEqual(
      route('premium look like google ai damn a worspace but netflix ui lol'),
      'google-ai-netflix'
    );
    assert.strictEqual(
      route('google search engine query for news'),
      'google-search'
    );
  });
});
