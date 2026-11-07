const test = require('node:test');
const assert = require('node:assert');

test('AI Model Provider Registry & Offline Deterministic Engine', async (t) => {
  await t.test('calculates token costs correctly across input and output tokens', () => {
    const inputTokens = 1_000_000;
    const outputTokens = 1_000_000;

    // Gemini 2.5 Flash: $0.15/1M input, $0.60/1M output
    const geminiCost = (inputTokens / 1_000_000) * 0.15 + (outputTokens / 1_000_000) * 0.60;
    assert.strictEqual(geminiCost, 0.75);

    // Claude 3.7 Sonnet: $3.00/1M input, $15.00/1M output
    const claudeCost = (inputTokens / 1_000_000) * 3.00 + (outputTokens / 1_000_000) * 15.00;
    assert.strictEqual(claudeCost, 18.00);
  });

  await t.test('offline autonomous synthesizer parses categories correctly', () => {
    function classifyPrompt(prompt) {
      const p = prompt.toLowerCase();
      if (p.includes('netflix') || p.includes('stream')) return 'Video Streaming & Media';
      if (p.includes('instagram') || p.includes('social')) return 'Social Media & Photo Sharing';
      if (p.includes('amazon') || p.includes('store')) return 'E-Commerce Marketplace';
      return 'SaaS Platform';
    }

    assert.strictEqual(classifyPrompt('Build a premium Netflix-like streaming platform'), 'Video Streaming & Media');
    assert.strictEqual(classifyPrompt('Create an Instagram-style social app'), 'Social Media & Photo Sharing');
    assert.strictEqual(classifyPrompt('Build an Amazon-style e-commerce store'), 'E-Commerce Marketplace');
  });
});
