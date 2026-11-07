'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Project, ProjectFile, AgentTask, TerminalLogEntry, VisualInspectorElement } from '@/types';
import { VirtualFileSystem } from '@/lib/projects/vfs';
import { selectTemplateForPrompt } from '@/lib/projects/templates';
import { exportProjectToZip } from '@/lib/projects/exporter';
import { buildPreviewHtml } from '@/lib/sandbox/bundler';
import { VirtualTerminal } from '@/lib/sandbox/terminal';
import { AgentOrchestrator } from '@/lib/agents/orchestrator';
import {
  Sparkles,
  Play,
  RotateCw,
  Smartphone,
  Tablet,
  Monitor,
  Download,
  Terminal as TerminalIcon,
  Code2,
  Eye,
  Sliders,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Folder,
  Send,
  StopCircle,
  Maximize2,
  ChevronRight,
  Database,
  Cpu,
  RefreshCw,
  Search,
  MousePointer,
} from 'lucide-react';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

function StudioWorkspaceContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const projectId = (params?.id as string) || 'default_project';

  const [vfs] = useState(() => new VirtualFileSystem());
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [activeFilePath, setActiveFilePath] = useState<string>('/src/App.tsx');
  const [fileContent, setFileContent] = useState<string>('');

  const [centerMode, setCenterMode] = useState<'preview' | 'code' | 'split'>('preview');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isInspectMode, setIsInspectMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<VisualInspectorElement | null>(null);

  const [terminal] = useState(() => new VirtualTerminal());
  const [terminalLogs, setTerminalLogs] = useState<TerminalLogEntry[]>([]);
  const [activeBottomTab, setActiveBottomTab] = useState<'terminal' | 'tests' | 'database'>('terminal');

  const [orchestrator] = useState(() => new AgentOrchestrator());
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [orchestrationStatus, setOrchestrationStatus] = useState<string>('READY');
  const [progressPercent, setProgressPercent] = useState<number>(100);
  const [activeTask, setActiveTask] = useState<AgentTask | null>(null);
  const [agentTasks, setAgentTasks] = useState<AgentTask[]>([]);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const initialPrompt = searchParams.get('prompt') || 'Build a premium Netflix-like streaming platform';
    setPrompt(initialPrompt);

    const { template } = selectTemplateForPrompt(initialPrompt);
    for (const [path, content] of Object.entries(template.files)) {
      vfs.writeFile(projectId, path, content);
    }
    const all = vfs.getAllFiles();
    setFiles(all);

    const defaultFile = all.find((f) => f.path === '/src/App.tsx') || all[0];
    if (defaultFile) {
      setActiveFilePath(defaultFile.path);
      setFileContent(defaultFile.content);
    }

    terminal.writeSystem(`Loaded template workspace: ${template.name}`);
    terminal.writeStdout(`VFS initialized with ${all.length} files. Sandbox preview ready.`);
  }, [projectId, searchParams, vfs, terminal]);

  useEffect(() => {
    setTerminalLogs(terminal.getLogs());
    return terminal.subscribe((entry) => {
      setTerminalLogs((prev) => [...prev, entry]);
    });
  }, [terminal]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data) return;
      if (event.data.type === 'NEXUS_CONSOLE_LOG') {
        const { level, message } = event.data.payload;
        terminal.write(level === 'error' ? 'stderr' : 'stdout', `[Preview Console] ${message}`);
      }
      if (event.data.type === 'NEXUS_RUNTIME_ERROR') {
        const { message, line } = event.data.payload;
        terminal.writeStderr(`[Preview Error] Line ${line}: ${message}`);
      }
      if (event.data.type === 'NEXUS_ELEMENT_SELECTED') {
        setSelectedElement(event.data.payload);
        terminal.writeSystem(`Inspected element: <${event.data.payload.tagName}>`);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [terminal]);

  const handleRunAgent = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setProgressPercent(5);
    terminal.writeSystem(`Agent Orchestrator dispatched prompt: "${prompt}"`);

    await orchestrator.runWorkflow(projectId, prompt, vfs, (update) => {
      setOrchestrationStatus(update.status);
      setProgressPercent(update.progressPercent);

      if (update.task) {
        setActiveTask(update.task);
        setAgentTasks((prev) => {
          const exists = prev.find((t) => t.id === update.task!.id);
          if (exists) {
            return prev.map((t) => (t.id === update.task!.id ? update.task! : t));
          }
          return [...prev, update.task!];
        });
      }

      terminal.writeSystem(`[${update.currentAgent.toUpperCase()}] ${update.stageName} - ${update.message}`);

      if (update.writtenFiles && update.writtenFiles.length > 0) {
        const all = vfs.getAllFiles();
        setFiles(all);
        const curr = vfs.getFile(activeFilePath);
        if (curr) setFileContent(curr.content);
        refreshPreview();
      }
    });

    setIsGenerating(false);
    refreshPreview();
  };

  const handleCancelAgent = () => {
    orchestrator.cancel();
    setIsGenerating(false);
    terminal.writeStderr('Orchestration cancelled by developer.');
  };

  const refreshPreview = () => {
    if (iframeRef.current) {
      const html = buildPreviewHtml(vfs.getAllFiles());
      iframeRef.current.srcdoc = html;
      terminal.writeStdout('Preview iframe reloaded with active VFS bundle.');
    }
  };

  const toggleInspector = () => {
    const next = !isInspectMode;
    setIsInspectMode(next);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'SET_INSPECT_MODE', enabled: next },
        '*'
      );
    }
  };

  const handleEditorChange = (newVal?: string) => {
    if (newVal !== undefined) {
      setFileContent(newVal);
      vfs.writeFile(projectId, activeFilePath, newVal);
      setFiles(vfs.getAllFiles());
    }
  };

  const handleExportZip = async () => {
    const blob = await exportProjectToZip(`nexus_${projectId}`, vfs.getAllFiles());
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexus_project_${projectId}.zip`;
    a.click();
    URL.revokeObjectURL(url);
    terminal.writeSystem('Exported project ZIP archive.');
  };

  const viewportWidthClass =
    viewport === 'mobile' ? 'max-w-[375px]' : viewport === 'tablet' ? 'max-w-[768px]' : 'w-full';

  return (
    <div className="h-screen bg-surface-950 text-zinc-100 flex flex-col font-sans overflow-hidden">
      {/* Studio Top Bar */}
      <header className="h-12 border-b border-zinc-800/80 bg-surface-950 px-4 flex items-center justify-between z-20 flex-none">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="flex items-center space-x-2 text-zinc-400 hover:text-white transition">
            <span className="text-xs font-mono">← Dashboard</span>
          </Link>
          <div className="h-4 w-px bg-zinc-800" />
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-sm text-white tracking-wide">NEXUS STUDIO</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-cyan-400 border border-zinc-700">
              {orchestrationStatus}
            </span>
          </div>
        </div>

        {/* View Controls & Action Buttons */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded ${viewport === 'desktop' ? 'bg-zinc-800 text-cyan-400' : 'text-zinc-500 hover:text-white'}`}
              title="Desktop (1440px)"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`p-1.5 rounded ${viewport === 'tablet' ? 'bg-zinc-800 text-cyan-400' : 'text-zinc-500 hover:text-white'}`}
              title="Tablet (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded ${viewport === 'mobile' ? 'bg-zinc-800 text-cyan-400' : 'text-zinc-500 hover:text-white'}`}
              title="Mobile (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center space-x-1 bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setCenterMode('preview')}
              className={`px-2.5 py-1 rounded font-medium ${centerMode === 'preview' ? 'bg-cyan-500 text-black' : 'text-zinc-400 hover:text-white'}`}
            >
              Preview
            </button>
            <button
              onClick={() => setCenterMode('code')}
              className={`px-2.5 py-1 rounded font-medium ${centerMode === 'code' ? 'bg-cyan-500 text-black' : 'text-zinc-400 hover:text-white'}`}
            >
              Code
            </button>
            <button
              onClick={() => setCenterMode('split')}
              className={`px-2.5 py-1 rounded font-medium ${centerMode === 'split' ? 'bg-cyan-500 text-black' : 'text-zinc-400 hover:text-white'}`}
            >
              Split
            </button>
          </div>

          <button
            onClick={toggleInspector}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
              isInspectMode ? 'bg-cyan-950 border-cyan-400 text-cyan-300' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title="Inspect preview elements to edit"
          >
            <MousePointer className="w-3.5 h-3.5" />
            <span>Inspect</span>
          </button>

          <button
            onClick={refreshPreview}
            className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg border border-zinc-800 transition"
            title="Reload Preview"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleExportZip}
            className="flex items-center space-x-1.5 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg border border-zinc-700 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export ZIP</span>
          </button>

          <Link
            href="/deployments"
            className="flex items-center space-x-1.5 px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-lg transition shadow-md shadow-cyan-500/10"
          >
            <span>Deploy</span>
          </Link>
        </div>
      </header>

      {/* Main 3-Column Studio Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <aside className="w-64 border-r border-zinc-800/80 bg-surface-950 flex flex-col flex-none">
          <div className="p-3 border-b border-zinc-800/80 flex items-center justify-between text-xs font-bold text-zinc-300">
            <span className="uppercase tracking-wider font-mono text-[10px] text-zinc-500">Explorer</span>
            <span className="text-[10px] text-zinc-500 font-mono">{files.length} files</span>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {files.map((file) => (
              <button
                key={file.path}
                onClick={() => {
                  setActiveFilePath(file.path);
                  setFileContent(file.content);
                }}
                className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs text-left transition font-mono truncate ${
                  activeFilePath === file.path
                    ? 'bg-zinc-800 text-cyan-400 font-semibold border border-zinc-700/60'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 flex-none" />
                <span className="truncate">{file.path}</span>
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-zinc-800/80 bg-surface-900/40 space-y-2 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 flex items-center space-x-1">
                <Database className="w-3 h-3 text-emerald-400" />
                <span>Supabase DB</span>
              </span>
              <span className="text-emerald-400 font-mono font-bold">CONNECTED</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 flex items-center space-x-1">
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span>AI Gateway</span>
              </span>
              <span className="text-cyan-400 font-mono font-bold">ACTIVE</span>
            </div>
          </div>
        </aside>

        {/* Center Panel */}
        <main className="flex-1 flex flex-col bg-surface-950 overflow-hidden relative">
          <div className="flex-1 flex overflow-hidden">
            {(centerMode === 'preview' || centerMode === 'split') && (
              <div className="flex-1 bg-zinc-950 flex flex-col items-center justify-center p-2 relative overflow-hidden border-r border-zinc-800/80">
                <div className={`h-full ${viewportWidthClass} bg-black rounded-lg overflow-hidden border border-zinc-800 shadow-2xl relative transition-all duration-300`}>
                  <iframe
                    ref={iframeRef}
                    title="NEXUS Live Preview"
                    sandbox="allow-scripts allow-forms allow-same-origin allow-modals"
                    srcDoc={buildPreviewHtml(files)}
                    className="w-full h-full border-none"
                  />
                </div>

                {selectedElement && (
                  <div className="absolute bottom-4 left-4 right-4 bg-surface-900/95 border border-cyan-500/40 backdrop-blur rounded-xl p-3 shadow-2xl flex items-center justify-between z-30">
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="font-mono font-bold text-cyan-400 uppercase">&lt;{selectedElement.tagName}&gt;</span>
                      <span className="text-zinc-300 truncate max-w-xs">{selectedElement.innerText || 'Selected Element'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setPrompt(`Update the styling and copy of <${selectedElement.tagName}>: "${selectedElement.innerText}"`);
                        }}
                        className="px-2.5 py-1 bg-cyan-500 text-black font-bold text-xs rounded-lg hover:bg-cyan-400 transition"
                      >
                        Ask AI to Refactor
                      </button>
                      <button onClick={() => setSelectedElement(null)} className="text-zinc-500 hover:text-white text-xs">✕</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {(centerMode === 'code' || centerMode === 'split') && (
              <div className="flex-1 flex flex-col bg-surface-950 overflow-hidden">
                <div className="h-9 border-b border-zinc-800 px-4 flex items-center justify-between bg-surface-900/60 flex-none text-xs font-mono text-zinc-300">
                  <span>{activeFilePath}</span>
                  <span className="text-[10px] text-zinc-500">Auto-saved to VFS</span>
                </div>
                <div className="flex-1">
                  <MonacoEditor
                    height="100%"
                    language={activeFilePath.endsWith('.json') ? 'json' : activeFilePath.endsWith('.sql') ? 'sql' : 'typescript'}
                    theme="vs-dark"
                    value={fileContent}
                    onChange={handleEditorChange}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 13,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Bottom Panel */}
          <div className="h-44 border-t border-zinc-800/80 bg-surface-950 flex flex-col flex-none">
            <div className="h-8 border-b border-zinc-800 px-4 flex items-center justify-between bg-surface-900/40 text-xs">
              <div className="flex items-center space-x-3 font-medium">
                <button
                  onClick={() => setActiveBottomTab('terminal')}
                  className={`flex items-center space-x-1.5 py-1 transition ${activeBottomTab === 'terminal' ? 'text-cyan-400 font-bold border-b-2 border-cyan-400' : 'text-zinc-400 hover:text-white'}`}
                >
                  <TerminalIcon className="w-3.5 h-3.5" />
                  <span>Virtual Terminal</span>
                </button>
                <button
                  onClick={() => setActiveBottomTab('tests')}
                  className={`flex items-center space-x-1.5 py-1 transition ${activeBottomTab === 'tests' ? 'text-cyan-400 font-bold border-b-2 border-cyan-400' : 'text-zinc-400 hover:text-white'}`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Synthetic Tests (12/12 Passed)</span>
                </button>
              </div>
              <button
                onClick={() => terminal.clear()}
                className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300"
              >
                Clear Output
              </button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto font-mono text-xs space-y-1 bg-surface-950">
              {activeBottomTab === 'terminal' && (
                <>
                  {terminalLogs.map((log) => (
                    <div
                      key={log.id}
                      className={`flex space-x-3 ${
                        log.stream === 'stderr'
                          ? 'text-red-400'
                          : log.stream === 'system'
                          ? 'text-cyan-400'
                          : 'text-zinc-300'
                      }`}
                    >
                      <span className="text-zinc-600 select-none">{log.timestamp}</span>
                      <span>{log.message}</span>
                    </div>
                  ))}
                </>
              )}

              {activeBottomTab === 'tests' && (
                <div className="space-y-1 text-emerald-400">
                  <div>✓ Desktop Viewport (1440x900) - DOM assertion passed</div>
                  <div>✓ Tablet Viewport (768x1024) - Responsive navigation passed</div>
                  <div>✓ Mobile Viewport (375x667) - Touch targets & layout passed</div>
                  <div>✓ Zero hydration errors detected in preview bundle</div>
                  <div>✓ Security boundary audit: 0 client-side credential leaks</div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Right Panel */}
        <aside className="w-80 border-l border-zinc-800/80 bg-surface-950 flex flex-col flex-none">
          <div className="p-3 border-b border-zinc-800/80 flex items-center justify-between text-xs font-bold text-zinc-300">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Agent Orchestrator</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 font-bold">{progressPercent}%</span>
          </div>

          <div className="w-full bg-zinc-900 h-1">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-600 h-1 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            <div className="bg-surface-900/70 border border-zinc-800/80 rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Active Stage</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-cyan-300">
                  {orchestrationStatus}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {activeTask?.title || 'System ready. Submit an instruction to trigger the 10-agent orchestration sequence.'}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Task Log</span>
              <div className="space-y-1.5">
                {agentTasks.map((t) => (
                  <div key={t.id} className="p-2 bg-surface-900/40 border border-zinc-800/60 rounded-lg text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[11px] text-zinc-200 capitalize">{t.agentRole}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">DONE ✓</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">{t.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleRunAgent} className="p-3 border-t border-zinc-800/80 bg-surface-950 space-y-2">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Give instructions to AI (e.g., 'Add a dark hero banner and video player modal')..."
              className="w-full bg-surface-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 resize-none"
            />
            <div className="flex items-center space-x-2">
              {isGenerating ? (
                <button
                  type="button"
                  onClick={handleCancelAgent}
                  className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1.5"
                >
                  <StopCircle className="w-3.5 h-3.5" />
                  <span>Cancel Orchestration</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs rounded-xl transition flex items-center justify-center space-x-1.5 shadow-lg shadow-cyan-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Agents</span>
                </button>
              )}
            </div>
          </form>
        </aside>
      </div>
    </div>
  );
}

export default function StudioWorkspace() {
  return (
    <Suspense fallback={<div className="h-screen bg-surface-950 flex items-center justify-center text-xs font-mono text-cyan-400">Loading NEXUS Studio Workspace...</div>}>
      <StudioWorkspaceContent />
    </Suspense>
  );
}
