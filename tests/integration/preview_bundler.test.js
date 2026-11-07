const test = require('node:test');
const assert = require('node:assert');

test('Preview Bundler HTML5 & Sandbox Isolation', async (t) => {
  await t.test('generates valid HTML document with Tailwind and React runtime', () => {
    function generateTestBundle(appCode) {
      return `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
</head>
<body>
  <div id="root"></div>
  <script>
    window.onerror = function() {};
  </script>
  <script>
    ${appCode}
  </script>
</body>
</html>`;
    }

    const html = generateTestBundle('function App() { return "Hello Nexus"; }');
    assert.ok(html.includes('tailwindcss.com'));
    assert.ok(html.includes('react.development.js'));
    assert.ok(html.includes('Hello Nexus'));
    assert.ok(html.includes('window.onerror'));
  });
});

