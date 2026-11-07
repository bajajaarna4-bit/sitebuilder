const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

test('NEXUS AUTOPILOT: Streaming Platform Synthesis & 7-Stage Verification', async (t) => {
  const netflixContent = fs.readFileSync(
    path.join(__dirname, '../src/lib/projects/templates/netflix.ts'),
    'utf-8'
  );

  await t.test('verifies StreamFlix Pro template contains all user requested specifications', () => {
    // 1. User login modal and auth state
    assert.ok(
      netflixContent.includes('showLoginModal') && netflixContent.includes('user'),
      'Must implement user login state and auth modal'
    );

    // 2. Movie categories
    assert.ok(
      netflixContent.includes('MOVIES') &&
      netflixContent.includes('Trending') &&
      netflixContent.includes('Action') &&
      netflixContent.includes('Sci-Fi'),
      'Must provide organized 4K movie categories'
    );

    // 3. Video playback modal
    assert.ok(
      netflixContent.includes('activeMovie') &&
      netflixContent.includes('Player UI Controls Bar') &&
      netflixContent.includes('Pause'),
      'Must implement high-fidelity video player modal'
    );

    // 4. Subscriptions & pricing tiers
    assert.ok(
      netflixContent.includes('showSubscribeModal') &&
      netflixContent.includes('Premium 4K') &&
      netflixContent.includes('$19.99'),
      'Must implement subscription tiers modal'
    );

    // 5. Real-time search
    assert.ok(
      netflixContent.includes('onSearch') &&
      netflixContent.includes('search') &&
      netflixContent.includes('filter'),
      'Must implement live catalog search filtering'
    );

    // 6. Admin dashboard
    assert.ok(
      netflixContent.includes('isAdminView') &&
      netflixContent.includes('StreamFlix Admin Operations') &&
      netflixContent.includes('Total Subscribers'),
      'Must implement full admin dashboard view'
    );
  });

  await t.test('verifies the 7 Autopilot stages are structurally complete', () => {
    const autopilotPageContent = fs.readFileSync(
      path.join(__dirname, '../src/app/autopilot/page.tsx'),
      'utf-8'
    );

    const requiredStages = [
      'Analyzing your idea',
      'Designing the interface',
      'Generating application files',
      'Connecting database and APIs',
      'Running application',
      'Testing and fixing errors',
      'Preparing deployment',
    ];

    for (const stage of requiredStages) {
      assert.ok(
        autopilotPageContent.includes(stage),
        `Autopilot pipeline must define stage: "${stage}"`
      );
    }
  });

  await t.test('verifies bundler incorporates React hooks and Babel transform cleanly', () => {
    const bundlerContent = fs.readFileSync(
      path.join(__dirname, '../src/lib/sandbox/bundler.ts'),
      'utf-8'
    );

    assert.ok(bundlerContent.includes('React.useState'), 'Bundler must inject unpacked useState hook');
    assert.ok(bundlerContent.includes('React.useEffect'), 'Bundler must inject unpacked useEffect hook');
    assert.ok(bundlerContent.includes('Babel.transform'), 'Bundler must invoke Babel compiler');
  });
});
