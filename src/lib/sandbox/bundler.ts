import { ProjectFile } from '@/types';

/**
 * Builds an isolated, browser-executable HTML application bundle from project files.
 * Injects:
 * 1. Tailwind CSS CDN
 * 2. React 19 UMD & ReactDOM
 * 3. Babel standalone for live JSX/TSX compilation
 * 4. Error boundary & Console log interceptor (posting back to parent IDE)
 * 5. Visual Inspector instrumentation (hover outline, click-to-inspect)
 */
export function buildPreviewHtml(files: ProjectFile[], activeRoute = '/'): string {
  // Find App.tsx or main entrypoint
  const appFile = files.find(
    (f) => f.path === '/src/App.tsx' || f.path === '/src/app/page.tsx' || f.path === '/src/index.tsx'
  );

  const componentFiles = files.filter(
    (f) =>
      !f.isDirectory &&
      (f.path.endsWith('.tsx') || f.path.endsWith('.ts') || f.path.endsWith('.jsx') || f.path.endsWith('.js')) &&
      f.path !== appFile?.path
  );

  let mergedCode = '';

  // Bundle data & components
  for (const file of componentFiles) {
    let cleanContent = file.content
      .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
      .replace(/export\s+default\s+/g, '')
      .replace(/export\s+/g, '')
      .trim();

    mergedCode += `\n// File: ${file.path}\n` + cleanContent + '\n';
  }

  // Bundle App entrypoint
  if (appFile) {
    let appContent = appFile.content
      .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
      .replace(/export\s+default\s+function\s+([A-Za-z0-9_]+)/g, 'function $1')
      .replace(/export\s+default\s+/g, '')
      .replace(/export\s+/g, '')
      .trim();

    mergedCode += `\n// Entrypoint: ${appFile.path}\n` + appContent + '\n';
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
    }
  </script>
  <!-- React 18 / 19 UMD -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <!-- Babel Standalone for live TSX/JSX parsing -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { margin: 0; background-color: #090b0e; color: #f4f4f5; font-family: system-ui, -apple-system, sans-serif; }
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
  </style>
</head>
<body class="bg-zinc-950 text-white min-h-screen">
  <div id="root"></div>

  <!-- NEXUS Sandbox Bridge & Inspector Script -->
  <script>
    // Capture runtime errors
    window.onerror = function(msg, url, lineNo, columnNo, error) {
      window.parent.postMessage({
        type: 'NEXUS_RUNTIME_ERROR',
        payload: { message: msg, line: lineNo, column: columnNo, stack: error ? error.stack : '' }
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
        original.apply(console, arguments);
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

  <!-- Application Component Code Execution -->
  <script type="text/babel" data-presets="react,typescript">
    const { useState, useEffect, useRef, useMemo, useCallback } = React;

    try {
      ${mergedCode}

      // Mount App
      const container = document.getElementById('root');
      const root = ReactDOM.createRoot(container);
      if (typeof App !== 'undefined') {
        root.render(<App />);
      } else {
        root.render(
          <div className="p-8 text-center text-zinc-400">
            <h2 className="text-xl font-bold text-white mb-2">Awaiting Component Synthesis</h2>
            <p className="text-xs">Submit an application prompt in the AI Assistant panel to generate your interface.</p>
          </div>
        );
      }
    } catch (err) {
      console.error("Hydration Error:", err);
      document.getElementById('root').innerHTML = '<div style="padding: 24px; color: #f87171; background: #18181b; border: 1px solid #7f1d1d; border-radius: 8px; margin: 24px; font-family: monospace;"><h3 style="font-weight: bold; margin-bottom: 8px;">Compilation / Runtime Error</h3><p>' + err.message + '</p></div>';
    }
  </script>
</body>
</html>`;
}

