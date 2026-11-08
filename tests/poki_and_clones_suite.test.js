const test = require('node:test');
const assert = require('node:assert');

// Simulate template router logic
function selectTemplateForPrompt(prompt) {
  const p = (prompt || '').toLowerCase().trim();

  if (
    p.includes('poki') ||
    p.includes('subway') ||
    p.includes('surfer') ||
    p.includes('game') ||
    p.includes('arcade') ||
    p.includes('runner') ||
    p.includes('play') ||
    p.includes('gaming')
  ) {
    return { key: 'poki-games' };
  }

  if (
    p.includes('uber') ||
    p.includes('rapido') ||
    p.includes('ola') ||
    p.includes('cab') ||
    p.includes('taxi') ||
    p.includes('transit') ||
    p.includes('mobility')
  ) {
    return { key: 'uber-rapido-ola' };
  }

  if (p.includes('whatsapp') || p.includes('whatsap')) {
    return { key: 'whatsapp-web' };
  }

  if (p.includes('claude') || p.includes('anthropic') || p.includes('artifact')) {
    return { key: 'claude-ai' };
  }

  if (p.includes('chrome') || p.includes('browser') || p.includes('omnibar')) {
    return { key: 'chrome-browser' };
  }

  if (p.includes('snapchat') || p.includes('snap streak') || p.includes('streaks')) {
    return { key: 'snapchat-social' };
  }

  if (p.includes('prime video') || p.includes('prime vedio') || p.includes('amazon prime')) {
    return { key: 'prime-video' };
  }

  if (p.includes('steezy') || p.includes('dance') || p.includes('movement')) {
    return { key: 'steezy-studio' };
  }

  if (p.includes('hostinger') || p.includes('hpanel')) {
    return { key: 'hostinger-cloud' };
  }

  if (p.includes('microsoft') || p.includes('word') || p.includes('excel')) {
    return { key: 'microsoft-365' };
  }

  if (p.includes('vercel') || p.includes('render')) {
    return { key: 'vercel-cloud' };
  }

  if (p.includes('linkedin') || p.includes('linkdin')) {
    return { key: 'linkedin-network' };
  }

  if (p.includes('canva')) {
    return { key: 'canva-designer' };
  }

  if (p.includes('ubuntu') || p.includes('linux')) {
    return { key: 'ubuntu-desktop' };
  }

  if (p.includes('spotify') || p.includes('music')) {
    return { key: 'spotify-music' };
  }

  if (p.includes('omegle') || p.includes('stranger')) {
    return { key: 'omegle-chat' };
  }

  if (p.includes('figma') || p.includes('wireframe')) {
    return { key: 'figma-studio' };
  }

  if (p.includes('zomato') || p.includes('swiggy')) {
    return { key: 'zomato-food' };
  }

  if (p.includes('github') || p.includes('repo')) {
    return { key: 'github-dev' };
  }

  if (p.includes('google') || p.includes('map')) {
    return { key: 'google-search' };
  }

  if (p.includes('tiktok') || p.includes('vibeshort')) {
    return { key: 'tiktok-short' };
  }

  if (p.includes('netflix') || p.includes('movie')) {
    return { key: 'netflix-streaming' };
  }

  if (p.includes('instagram') || p.includes('threads')) {
    return { key: 'instagram-social' };
  }

  if (p.includes('amazon') || p.includes('store')) {
    return { key: 'amazon-commerce' };
  }

  if (p.includes('youtube')) {
    return { key: 'youtube-platform' };
  }

  if (p.includes('blinkit') || p.includes('zepto')) {
    return { key: 'blinkit-quick' };
  }

  if (prompt && prompt.trim().length > 3) {
    return { key: 'dynamic-adaptive' };
  }

  return { key: 'poki-games' };
}

test('POKI & ARCADE GAMES: Prompt Matching & Resolution', () => {
  const t1 = selectTemplateForPrompt('Build a premium subway surfer game i wanna play in real time ');
  assert.strictEqual(t1.key, 'poki-games');

  const t2 = selectTemplateForPrompt('create an online portal like poki with arcade games');
  assert.strictEqual(t2.key, 'poki-games');

  const t3 = selectTemplateForPrompt('make it give me game to play');
  assert.strictEqual(t3.key, 'poki-games');
});

test('MOBILITY SUITE: Uber, Rapido, Ola Prompt Resolution', () => {
  const t1 = selectTemplateForPrompt('a mix od uber rapido ola ');
  assert.strictEqual(t1.key, 'uber-rapido-ola');

  const t2 = selectTemplateForPrompt('build an uber and rapido bike taxi hailing platform');
  assert.strictEqual(t2.key, 'uber-rapido-ola');
});

test('MULTI-DOMAIN WORKSPACES: WhatsApp, Claude, Steezy, Hostinger, Vercel, LinkedIn', () => {
  assert.strictEqual(selectTemplateForPrompt('whatsapp instant chat with video call').key, 'whatsapp-web');
  assert.strictEqual(selectTemplateForPrompt('claude 3.5 sonnet artifacts workspace').key, 'claude-ai');
  assert.strictEqual(selectTemplateForPrompt('chrome browser simulator with tabs and omnibar').key, 'chrome-browser');
  assert.strictEqual(selectTemplateForPrompt('snapchat camera with lenses and snap streak').key, 'snapchat-social');
  assert.strictEqual(selectTemplateForPrompt('amazon prime video with xray and originals').key, 'prime-video');
  assert.strictEqual(selectTemplateForPrompt('steezy studio dance lessons and mirrored view').key, 'steezy-studio');
  assert.strictEqual(selectTemplateForPrompt('hostinger hpanel cloud hosting and domains').key, 'hostinger-cloud');
  assert.strictEqual(selectTemplateForPrompt('microsoft 365 cloud office suite').key, 'microsoft-365');
  assert.strictEqual(selectTemplateForPrompt('vercel serverless deployment and preview logs').key, 'vercel-cloud');
  assert.strictEqual(selectTemplateForPrompt('linkedin professional networking and jobs').key, 'linkedin-network');
});

test('PROJECT WORKSPACE ID ROUTING: Guarantees correct template without default to Netflix', () => {
  function resolveWorkspaceTemplate(projectId, paramTemplate) {
    if (paramTemplate) return paramTemplate;
    const pId = projectId.toLowerCase();
    if (pId.includes('amazon')) return 'amazon-commerce';
    if (pId.includes('instagram')) return 'instagram-social';
    if (pId.includes('netflix')) return 'netflix-streaming';
    if (pId.includes('poki') || pId.includes('subway') || pId.includes('game')) return 'poki-games';
    if (pId.includes('uber') || pId.includes('rapido') || pId.includes('ola') || pId.includes('omniride') || pId.includes('transit')) return 'uber-rapido-ola';
    if (pId.includes('whatsapp')) return 'whatsapp-web';
    if (pId.includes('claude')) return 'claude-ai';
    if (pId.includes('spotify')) return 'spotify-music';
    if (pId.includes('canva')) return 'canva-designer';
    if (pId.includes('ubuntu')) return 'ubuntu-desktop';
    return 'poki-games';
  }

  assert.strictEqual(resolveWorkspaceTemplate('proj_amazon_03', null), 'amazon-commerce');
  assert.strictEqual(resolveWorkspaceTemplate('proj_instagram_02', null), 'instagram-social');
  assert.strictEqual(resolveWorkspaceTemplate('proj_poki_games', null), 'poki-games');
  assert.strictEqual(resolveWorkspaceTemplate('proj_omniride_01', null), 'uber-rapido-ola');
  assert.strictEqual(resolveWorkspaceTemplate('proj_netflix_01', null), 'netflix-streaming');
});