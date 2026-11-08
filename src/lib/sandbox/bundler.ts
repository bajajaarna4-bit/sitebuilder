import { ProjectFile } from '@/types';

/**
 * Builds an isolated, browser-executable HTML application bundle from project files.
 * Uses Cloudflare CDNJS for ultra-low latency, high-reliability delivery.
 * Features:
 * 1. Safe dependency ordering (data models -> helper components -> App entrypoint)
 * 2. Proper multi-line import/export stripping
 * 3. In-browser Babel transformation with filename: 'app.tsx' for full TSX support
 * 4. Runtime error capture posting back to parent studio
 * 5. Visual element inspector bridge
 */
export function buildPreviewHtml(files: ProjectFile[], activeRoute = '/'): string {
  // Find App.tsx or main entrypoint
  const appFile = files.find(
    (f) => f.path === '/src/App.tsx' || f.path === '/src/app/page.tsx' || f.path === '/src/index.tsx'
  );

  // Filter and sort component files so data models are declared first, then components
  // Strictly exclude API routes, migrations, markdown, tests, and server files from browser preview
  const componentFiles = files
    .filter(
      (f) =>
        !f.isDirectory &&
        (f.path.endsWith('.tsx') || f.path.endsWith('.ts') || f.path.endsWith('.jsx') || f.path.endsWith('.js')) &&
        f.path !== appFile?.path &&
        !f.path.includes('/api/') &&
        !f.path.startsWith('/tests/') &&
        !f.path.includes('.test.') &&
        !f.path.includes('.spec.')
    )
    .sort((a, b) => {
      // Prioritize data/ and types/ before components/
      const aIsData = a.path.includes('/data/') || a.path.includes('/types/');
      const bIsData = b.path.includes('/data/') || b.path.includes('/types/');
      if (aIsData && !bIsData) return -1;
      if (!aIsData && bIsData) return 1;
      return a.path.localeCompare(b.path);
    });

  function sanitizeCode(code: string): string {
    return code
      // Remove multi-line and single-line imports
      .replace(/import\s+[\s\S]*?from\s+['"][^'"]*?['"];?/g, '')
      .replace(/import\s+['"][^'"]*?['"];?/g, '')
      // Remove export * from ...
      .replace(/export\s+\*\s+from\s+['"][^'"]*?['"];?/g, '')
      // Replace default export functions and classes
      .replace(/export\s+default\s+async\s+function\s*([A-Za-z0-9_]*)/g, 'async function $1')
      .replace(/export\s+default\s+function\s*([A-Za-z0-9_]*)/g, 'function $1')
      .replace(/export\s+default\s+class\s*([A-Za-z0-9_]*)/g, 'class $1')
      // Remove export default followed by identifier, expression, or arrow
      .replace(/export\s+default\s+/g, '')
      // Remove named export keywords (with optional async)
      .replace(/export\s+(async\s+)?(const|let|var|function|class|interface|type|enum)\s+/g, '$1$2 ')
      // Remove export { ... } blocks
      .replace(/export\s*\{[\s\S]*?\};?/g, '')
      // Catch any remaining standalone 'export ' keywords
      .replace(/\bexport\s+/g, '')
      .trim();
  }

  let mergedCode = '';

  for (const file of componentFiles) {
    mergedCode += `\n// --- File: ${file.path} ---\n` + sanitizeCode(file.content) + '\n';
  }

  if (appFile) {
    mergedCode += `\n// --- Entrypoint: ${appFile.path} ---\n` + sanitizeCode(appFile.content) + '\n';
  }

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NEXUS Live Preview</title>
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            surface: { 900: '#12141a', 950: '#090b0e' }
          }
        }
      }
    };
  </script>
  <!-- React 18 UMD from Cloudflare CDNJS -->
  <script crossorigin="anonymous" src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
  <script crossorigin="anonymous" src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
  <!-- Babel Standalone from Cloudflare CDNJS -->
  <script crossorigin="anonymous" src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.24.4/babel.min.js"></script>
  <style>
    body { margin: 0; background-color: #090b0e; color: #f4f4f5; font-family: system-ui, -apple-system, sans-serif; overflow-x: hidden; }
    /* Visual Inspector Outline */
    .nexus-inspect-hover {
      outline: 2px dashed #06b6d4 !important;
      outline-offset: -2px;
      cursor: crosshair !important;
    }
    .nexus-inspect-selected {
      outline: 2px solid #3b82f6 !important;
      outline-offset: -2px;
    }
    /* Hide scrollbar for carousels */
    .scrollbar-none::-webkit-scrollbar { display: none; }
    .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
</head>
<body class="bg-zinc-950 text-white min-h-screen">
  <div id="root">
    <div style="padding: 40px; text-align: center; color: #a1a1aa; font-family: system-ui;">
      <div style="display: inline-block; width: 24px; height: 24px; border: 2px solid #06b6d4; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 12px;"></div>
      <div style="font-size: 13px; font-weight: 600;">Mounting Application Preview...</div>
    </div>
  </div>

  <style>
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>

  <!-- NEXUS Sandbox Bridge & Inspector Script -->
  <script>
    // Capture runtime errors
    window.onerror = function(msg, url, lineNo, columnNo, error) {
      window.parent.postMessage({
        type: 'NEXUS_RUNTIME_ERROR',
        payload: {
          message: msg,
          line: lineNo,
          column: columnNo,
          stack: error ? error.stack : ''
        }
      }, '*');
      return false;
    };

    // Capture console.log / warn / error
    ['log', 'warn', 'error', 'info'].forEach(function(level) {
      var original = console[level];
      console[level] = function() {
        var args = Array.prototype.slice.call(arguments);
        var text = args.map(function(a) { return typeof a === 'object' ? JSON.stringify(a) : String(a); }).join(' ');
        window.parent.postMessage({
          type: 'NEXUS_CONSOLE_LOG',
          payload: { level: level, message: text, timestamp: new Date().toISOString() }
        }, '*');
        if (original) original.apply(console, arguments);
      };
    });

    // Visual Inspector Listener
    var isInspectMode = false;
    var hoveredEl = null;
    var selectedEl = null;

    window.addEventListener('message', function(event) {
      if (!event.data) return;
      if (event.data.type === 'SET_INSPECT_MODE') {
        isInspectMode = event.data.enabled;
        if (!isInspectMode && hoveredEl) {
          hoveredEl.classList.remove('nexus-inspect-hover');
        }
      }
      if (event.data.type === 'UPDATE_ELEMENT_STYLE' && selectedEl) {
        var styles = event.data.styles;
        for (var prop in styles) {
          selectedEl.style[prop] = styles[prop];
        }
      }
    });

    document.addEventListener('mouseover', function(e) {
      if (!isInspectMode) return;
      if (hoveredEl) hoveredEl.classList.remove('nexus-inspect-hover');
      hoveredEl = e.target;
      hoveredEl.classList.add('nexus-inspect-hover');
    });

    document.addEventListener('click', function(e) {
      if (!isInspectMode) return;
      e.preventDefault();
      e.stopPropagation();

      if (selectedEl) selectedEl.classList.remove('nexus-inspect-selected');
      selectedEl = e.target;
      selectedEl.classList.add('nexus-inspect-selected');

      var computed = window.getComputedStyle(selectedEl);
      window.parent.postMessage({
        type: 'NEXUS_ELEMENT_SELECTED',
        payload: {
          tagName: selectedEl.tagName.toLowerCase(),
          classes: selectedEl.className,
          innerText: selectedEl.innerText ? selectedEl.innerText.slice(0, 100) : '',
          styles: {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            padding: computed.padding,
            fontSize: computed.fontSize
          }
        }
      }, '*');
    }, true);
  </script>

  <!-- Application Component Compilation and Mount -->
  <script>
    window.addEventListener('DOMContentLoaded', function() {
      try {
        var rawSource = ${JSON.stringify(mergedCode)};

        if (typeof Babel === 'undefined') {
          throw new Error('Babel compiler failed to load from CDN. Check your internet connection.');
        }

        // Expose React hooks globally on window so any component or helper function can access them
        if (typeof React !== 'undefined') {
          window.useState = React.useState;
          window.useEffect = React.useEffect;
          window.useMemo = React.useMemo;
          window.useCallback = React.useCallback;
          window.useRef = React.useRef;
          window.createContext = React.createContext;
          window.useContext = React.useContext;
        }

        // Compile TSX/JSX source using Babel Standalone
        var transformResult = Babel.transform(rawSource, {
          presets: [
            ['react', { runtime: 'classic' }],
            ['typescript', { isTSX: true, allExtensions: true }]
          ],
          filename: 'app.tsx'
        });

        // Run the compiled JavaScript inside a scoped Function with all React hooks unpacked
        var scopeRunner = new Function(
          'React',
          'ReactDOM',
          'var useState = React.useState;\\n' +
          'var useEffect = React.useEffect;\\n' +
          'var useMemo = React.useMemo;\\n' +
          'var useCallback = React.useCallback;\\n' +
          'var useRef = React.useRef;\\n' +
          'var createContext = React.createContext;\\n' +
          'var useContext = React.useContext;\\n' +
          transformResult.code + '\\nreturn typeof App !== "undefined" ? App : null;'
        );

        var AppComponent = scopeRunner(React, ReactDOM);

        var container = document.getElementById('root');
        var root = ReactDOM.createRoot(container);

        if (AppComponent) {
          root.render(React.createElement(AppComponent));
          console.log('[NEXUS Preview] Application mounted successfully.');
        } else {
          container.innerHTML = '<div style="padding: 32px; text-align: center; color: #a1a1aa; font-family: monospace;"><h3>App component not found in VFS</h3></div>';
        }
      } catch (err) {
        console.error("Compilation / Runtime Error:", err);
        var container = document.getElementById('root');
        if (container) {
          container.innerHTML = '<div style="padding: 24px; color: #f87171; background: #18181b; border: 1px solid #7f1d1d; border-radius: 8px; margin: 24px; font-family: monospace;"><h3 style="font-weight: bold; margin-bottom: 8px;">Compilation / Runtime Error</h3><p>' + err.message + '</p></div>';
        }
      }
    });
  </script>
</body>
</html>`;
}
