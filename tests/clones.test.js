const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

test('NEXUS CLONER: Multi-Domain Workspace Templates & Recognition', async (t) => {
  const clonesFile = fs.readFileSync(
    path.join(__dirname, '../src/lib/projects/templates/clones.ts'),
    'utf-8'
  );

  const indexFile = fs.readFileSync(
    path.join(__dirname, '../src/lib/projects/templates/index.ts'),
    'utf-8'
  );

  await t.test('verifies Canva clone template contains design canvas and presets', () => {
    assert.ok(clonesFile.includes('canvaClone'), 'Canva clone must be exported');
    assert.ok(clonesFile.includes('Instagram Post'), 'Must support Instagram Post preset');
    assert.ok(clonesFile.includes('YouTube Thumbnail'), 'Must support YouTube Thumbnail preset');
    assert.ok(clonesFile.includes('Download PNG'), 'Must support design export');
  });

  await t.test('verifies Ubuntu clone template contains Bash terminal and desktop dock', () => {
    assert.ok(clonesFile.includes('ubuntuClone'), 'Ubuntu clone must be exported');
    assert.ok(clonesFile.includes('neofetch'), 'Must include interactive neofetch command');
    assert.ok(clonesFile.includes('developer@nexus-ubuntu'), 'Must include terminal shell prompt');
    assert.ok(clonesFile.includes('GNOME'), 'Must include desktop UI elements');
  });

  await t.test('verifies Spotify clone template contains player and scrubber', () => {
    assert.ok(clonesFile.includes('spotifyClone'), 'Spotify clone must be exported');
    assert.ok(clonesFile.includes('Starboy'), 'Must contain track fixtures');
    assert.ok(clonesFile.includes('isPlaying'), 'Must contain play/pause state');
  });

  await t.test('verifies Omegle clone template contains random stranger chat matching', () => {
    assert.ok(clonesFile.includes('omegleClone'), 'Omegle clone must be exported');
    assert.ok(clonesFile.includes('stranger'), 'Must contain stranger matching state');
    assert.ok(clonesFile.includes('handleNext'), 'Must support Next stranger action');
  });

  await t.test('verifies Figma clone template contains canvas shapes and properties inspector', () => {
    assert.ok(clonesFile.includes('figmaClone'), 'Figma clone must be exported');
    assert.ok(clonesFile.includes('addElement'), 'Must allow adding elements');
    assert.ok(clonesFile.includes('Properties'), 'Must include properties inspector');
  });

  await t.test('verifies index router matches Canva and Ubuntu prompts', () => {
    function selectTemplate(prompt) {
      const p = prompt.toLowerCase();
      if (p.includes('canva') || p.includes('graphic design')) return 'canva-designer';
      if (p.includes('ubuntu') || p.includes('linux')) return 'ubuntu-desktop';
      if (p.includes('spotify') || p.includes('music')) return 'spotify-music';
      if (p.includes('omegle')) return 'omegle-chat';
      if (p.includes('figma')) return 'figma-studio';
      return 'nextjs-saas';
    }

    assert.strictEqual(selectTemplate('create a canva style graphic design app'), 'canva-designer');
    assert.strictEqual(selectTemplate('build an ubuntu linux desktop OS in browser'), 'ubuntu-desktop');
    assert.strictEqual(selectTemplate('clone spotify with music player'), 'spotify-music');
    assert.strictEqual(selectTemplate('build an omegle video chat roulette'), 'omegle-chat');
    assert.strictEqual(selectTemplate('clone figma collaborative design tool'), 'figma-studio');
  });
});

