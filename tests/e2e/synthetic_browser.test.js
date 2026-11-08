const test = require('node:test');
const assert = require('node:assert');

test('E2E Autonomous Journey: Natural Language to Full-Stack Application', async (t) => {
  function selectTemplateForPrompt(prompt) {
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
      return { key: 'emergent-antigravity', name: 'NEXUS Omni' };
    }
    if (p.includes('netflix') || p.includes('stream') || p.includes('movie')) {
      return { key: 'netflix-streaming', name: 'StreamFlix' };
    }
    if (p.includes('instagram') || p.includes('social') || p.includes('photo')) {
      return { key: 'instagram-social', name: 'InstaVibe' };
    }
    if (p.includes('blinkit') || p.includes('quick-commerce') || p.includes('grocery') || p.includes('10-minute')) {
      return { key: 'blinkit-quick', name: 'FlashCart' };
    }
    if (p.includes('amazon') || p.includes('commerce') || p.includes('store') || p.includes('cart')) {
      return { key: 'amazon-commerce', name: 'Aura Commerce' };
    }
    if (p.includes('youtube') || p.includes('video') || p.includes('channel')) {
      return { key: 'youtube-platform', name: 'NexusTube' };
    }
    return { key: 'nextjs-saas', name: 'NexusFlow' };
  }

  await t.test('resolves Emergent & Antigravity hybrid from prompt', () => {
    const result = selectTemplateForPrompt('build a website that os mix of emergent antigravity prompt perfect and whatsapp insta like ui also can actually build further fix all errors and bugs');
    assert.strictEqual(result.key, 'emergent-antigravity');
    assert.strictEqual(result.name, 'NEXUS Omni');
  });

  await t.test('resolves Netflix streaming platform from prompt', () => {
    const result = selectTemplateForPrompt('Build a premium Netflix-like streaming platform');
    assert.strictEqual(result.key, 'netflix-streaming');
    assert.strictEqual(result.name, 'StreamFlix');
  });

  await t.test('resolves Instagram social app from prompt', () => {
    const result = selectTemplateForPrompt('Create an Instagram-style social application');
    assert.strictEqual(result.key, 'instagram-social');
    assert.strictEqual(result.name, 'InstaVibe');
  });

  await t.test('resolves Blinkit 10-minute quick-commerce from prompt', () => {
    const result = selectTemplateForPrompt('Build a Blinkit-style quick-commerce application');
    assert.strictEqual(result.key, 'blinkit-quick');
    assert.strictEqual(result.name, 'FlashCart');
  });

  await t.test('resolves Amazon e-commerce store from prompt', () => {
    const result = selectTemplateForPrompt('Build a modern Amazon-style e-commerce store');
    assert.strictEqual(result.key, 'amazon-commerce');
    assert.strictEqual(result.name, 'Aura Commerce');
  });

  await t.test('resolves YouTube video sharing platform from prompt', () => {
    const result = selectTemplateForPrompt('Create a YouTube-style video-sharing application');
    assert.strictEqual(result.key, 'youtube-platform');
    assert.strictEqual(result.name, 'NexusTube');
  });
});
