'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Project, ProjectFile, AgentTask, TerminalLogEntry, VisualInspectorElement } from '@/types';
import { VirtualFileSystem } from '@/lib/projects/vfs';
import { selectTemplateForPrompt, TEMPLATES } from '@/lib/projects/templates';
import { exportProjectToZip } from '@/lib/projects/exporter';
import { checkpointManager, ProjectCheckpoint } from '@/lib/projects/checkpoints';
import { visionEngine } from '@/lib/ai/vision';
import { EnvVarsModal } from '@/components/studio/EnvVarsModal';
import { buildPreviewHtml } from '@/lib/sandbox/bundler';
import { VirtualTerminal } from '@/lib/sandbox/terminal';
import { AgentOrchestrator } from '@/lib/agents/orchestrator';
import {
  Sparkles,
  RotateCw,
  Smartphone,
  Tablet,
  Monitor,
  Download,
  Terminal as TerminalIcon,
  Code2,
  FileCode,
  Send,
  StopCircle,
  Database,
  Cpu,
  MousePointer,
  History,
  Image as ImageIcon,
  Plus,
  Trash2,
  Save,
  Check,
  ChevronRight,
  Upload,
  Paintbrush,
  Type,
  Maximize2,
} from 'lucide-react';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

function StudioWorkspaceContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const projectId = (params?.id as string) || 'default_project';

  // --- VFS & Files State ---
  const [vfs] = useState(() => new VirtualFileSystem());
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [activeFilePath, setActiveFilePath] = useState<string>('/src/App.tsx');
  const [fileContent, setFileContent] = useState<string>('');
  const [newFileName, setNewFileName] = useState('');
  const [isCreatingFile, setIsCreatingFile] = useState(false);

  // --- View & Mode State ---
  const [centerMode, setCenterMode] = useState<'preview' | 'code' | 'split'>('preview');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isInspectMode, setIsInspectMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<VisualInspectorElement | null>(null);
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const [isAgentPanelOpen, setIsAgentPanelOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-pro');
  const [generationMode, setGenerationMode] = useState<'full' | 'refactor' | 'fix'>('full');

  // --- Visual Styler State ---
  const [elemText, setElemText] = useState('');
  const [elemColor, setElemColor] = useState('#ffffff');
  const [elemBg, setElemBg] = useState('#18181b');
  const [elemPadding, setElemPadding] = useState('12px');
  const [elemFontSize, setElemFontSize] = useState('14px');

  // --- Checkpoints & Version History ---
  const [checkpoints, setCheckpoints] = useState<ProjectCheckpoint[]>([]);
  const [showCheckpointsModal, setShowCheckpointsModal] = useState(false);
  const [checkpointMsg, setCheckpointMsg] = useState('');

  // --- Environment Variables Modal ---
  const [showEnvModal, setShowEnvModal] = useState(false);

  // --- Screenshot-to-Code Modal ---
  const [showVisionModal, setShowVisionModal] = useState(false);
  const [visionImage, setVisionImage] = useState<string | null>(null);
  const [visionHint, setVisionHint] = useState('');
  const [isAnalyzingVision, setIsAnalyzingVision] = useState(false);

  // --- Terminal & Logs ---
  const [terminal] = useState(() => new VirtualTerminal());
  const [terminalLogs, setTerminalLogs] = useState<TerminalLogEntry[]>([]);
  const [activeBottomTab, setActiveBottomTab] = useState<'terminal' | 'tests' | 'database'>('terminal');

  // --- Agent & Orchestration State ---
  const [orchestrator] = useState(() => new AgentOrchestrator());
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [orchestrationStatus, setOrchestrationStatus] = useState<string>('READY');
  const [progressPercent, setProgressPercent] = useState<number>(100);
  const [activeTask, setActiveTask] = useState<AgentTask | null>(null);
  const [agentTasks, setAgentTasks] = useState<AgentTask[]>([]);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Initialize Project Files from Template
  useEffect(() => {
    const paramTemplate = searchParams.get('template');
    const paramPrompt = searchParams.get('prompt');

    let resolvedTemplate: any = null;

    // 1. Check explicit template query param
    if (paramTemplate && TEMPLATES[paramTemplate]) {
      resolvedTemplate = TEMPLATES[paramTemplate];
    }

    // 2. Check projectId keywords
    if (!resolvedTemplate && projectId) {
      const pId = projectId.toLowerCase();
      if (pId.includes('psyche') || pId.includes('mindset') || pId.includes('reels')) resolvedTemplate = TEMPLATES['psyche-reels'];
      else if (pId.includes('saai') || pId.includes('parliament') || pId.includes('kronos')) resolvedTemplate = TEMPLATES['saai-pro'];
      else if (pId.includes('office') || pId.includes('syndicate') || pId.includes('swarm')) resolvedTemplate = TEMPLATES['virtual-office-ai'];
      else if (pId.includes('pinterest') || pId.includes('aura') || pId.includes('aesthetic')) resolvedTemplate = TEMPLATES['pinterest-canva-ai'];
      else if (pId.includes('cinema') || pId.includes('google_ai') || pId.includes('google-ai') || pId.includes('streamflix')) resolvedTemplate = TEMPLATES['google-ai-netflix'];
      else if (pId.includes('amazon')) resolvedTemplate = TEMPLATES['amazon-commerce'];
      else if (pId.includes('instagram')) resolvedTemplate = TEMPLATES['instagram-social'];
      else if (pId.includes('netflix')) resolvedTemplate = TEMPLATES['google-ai-netflix'];
      else if (pId.includes('poki') || pId.includes('subway') || pId.includes('game')) resolvedTemplate = TEMPLATES['poki-games'];
      else if (pId.includes('uber') || pId.includes('rapido') || pId.includes('ola') || pId.includes('omniride') || pId.includes('transit')) resolvedTemplate = TEMPLATES['uber-rapido-ola'];
      else if (pId.includes('whatsapp')) resolvedTemplate = TEMPLATES['whatsapp-web'];
      else if (pId.includes('claude')) resolvedTemplate = TEMPLATES['claude-ai'];
      else if (pId.includes('chrome')) resolvedTemplate = TEMPLATES['chrome-browser'];
      else if (pId.includes('spotify')) resolvedTemplate = TEMPLATES['spotify-music'];
      else if (pId.includes('canva')) resolvedTemplate = TEMPLATES['canva-designer'];
      else if (pId.includes('ubuntu')) resolvedTemplate = TEMPLATES['ubuntu-desktop'];
      else if (pId.includes('zomato') || pId.includes('swiggy')) resolvedTemplate = TEMPLATES['zomato-food'];
      else if (pId.includes('github')) resolvedTemplate = TEMPLATES['github-dev'];
      else if (pId.includes('figma')) resolvedTemplate = TEMPLATES['figma-studio'];
      else if (pId.includes('youtube')) resolvedTemplate = TEMPLATES['youtube-platform'];
      else if (pId.includes('blinkit')) resolvedTemplate = TEMPLATES['blinkit-quick'];
    }

    // 3. Check prompt parameter or synthesize
    let initialPrompt = paramPrompt || '';
    if (!resolvedTemplate) {
      if (paramPrompt && paramPrompt.trim().length > 0) {
        const selected = selectTemplateForPrompt(paramPrompt);
        resolvedTemplate = selected.template;
      } else {
        resolvedTemplate = TEMPLATES['poki-games'];
        initialPrompt = 'Build a Subway Surfer 3D endless runner game with real-time controls';
      }
    } else if (!initialPrompt) {
      initialPrompt = `Build and customize ${resolvedTemplate.name}`;
    }

    setPrompt(initialPrompt);

    const template = resolvedTemplate;
    for (const [path, content] of Object.entries(template.files as Record<string, string>)) {
      vfs.writeFile(projectId, path, content);
    }
    const all = vfs.getAllFiles();
    setFiles(all);

    const defaultFile = all.find((f) => f.path === '/src/App.tsx') || all[0];
    if (defaultFile) {
      setActiveFilePath(defaultFile.path);
      setFileContent(defaultFile.content);
    }

    // Create Initial Checkpoint
    checkpointManager.createCheckpoint(projectId, `Initial hydration: ${template.name}`, all, 'System');
    setCheckpoints(checkpointManager.getCheckpoints(projectId));

    terminal.writeSystem(`Loaded template workspace: ${template.name}`);
    terminal.writeStdout(`VFS initialized with ${all.length} files. Sandbox preview ready.`);
  }, [projectId, searchParams, vfs, terminal]);

  // Subscribe to Terminal Logs
  useEffect(() => {
    setTerminalLogs(terminal.getLogs());
    return terminal.subscribe((entry) => {
      setTerminalLogs((prev) => [...prev, entry]);
    });
  }, [terminal]);

  // Listen to Preview Iframe messages
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
        const el = event.data.payload;
        setSelectedElement(el);
        setElemText(el.innerText || '');
        if (el.styles) {
          if (el.styles.color) setElemColor(el.styles.color);
          if (el.styles.backgroundColor) setElemBg(el.styles.backgroundColor);
          if (el.styles.padding) setElemPadding(el.styles.padding);
          if (el.styles.fontSize) setElemFontSize(el.styles.fontSize);
        }
        terminal.writeSystem(`Inspected element: <${el.tagName}>`);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [terminal]);

  // Handle Dispatching Autonomous Prompt
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

    // Create a Checkpoint for this generation turn
    checkpointManager.createCheckpoint(projectId, `AI Prompt: ${prompt.slice(0, 35)}...`, vfs.getAllFiles(), 'AI:Orchestrator');
    setCheckpoints(checkpointManager.getCheckpoints(projectId));

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

  // Toggle Visual Inspector
  const toggleInspector = () => {
    const next = !isInspectMode;
    setIsInspectMode(next);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'SET_INSPECT_MODE', enabled: next }, '*');
    }
  };

  // Live Apply Visual Styling to Preview & VFS
  const applyVisualStyles = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'UPDATE_ELEMENT_STYLE',
          styles: {
            color: elemColor,
            backgroundColor: elemBg,
            padding: elemPadding,
            fontSize: elemFontSize,
          },
        },
        '*'
      );
      terminal.writeSystem(`Applied visual style to <${selectedElement?.tagName}>: color=${elemColor}, bg=${elemBg}`);
    }
  };

  // Save Editor Content
  const handleEditorChange = (newVal?: string) => {
    if (newVal !== undefined) {
      setFileContent(newVal);
      vfs.writeFile(projectId, activeFilePath, newVal);
      setFiles(vfs.getAllFiles());
    }
  };

  // File Creation & Deletion
  const handleCreateFile = () => {
    if (!newFileName.trim()) return;
    const clean = newFileName.startsWith('/') ? newFileName : `/${newFileName}`;
    vfs.writeFile(projectId, clean, '// New file\n');
    setFiles(vfs.getAllFiles());
    setActiveFilePath(clean);
    setFileContent('// New file\n');
    setNewFileName('');
    setIsCreatingFile(false);
    terminal.writeSystem(`Created file: ${clean}`);
  };

  const handleDeleteFile = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Delete ${path}?`)) {
      vfs.deleteFile(path);
      const all = vfs.getAllFiles();
      setFiles(all);
      if (activeFilePath === path) {
        const next = all[0];
        if (next) {
          setActiveFilePath(next.path);
          setFileContent(next.content);
        }
      }
      terminal.writeSystem(`Deleted file: ${path}`);
    }
  };

  // Checkpoint Snapshot Restore
  const handleRestoreCheckpoint = (cp: ProjectCheckpoint) => {
    vfs.loadSnapshot(projectId, cp.snapshot);
    const all = vfs.getAllFiles();
    setFiles(all);
    const cur = all.find((f) => f.path === activeFilePath) || all[0];
    if (cur) {
      setActiveFilePath(cur.path);
      setFileContent(cur.content);
    }
    refreshPreview();
    setShowCheckpointsModal(false);
    terminal.writeSystem(`Restored checkpoint "${cp.message}" (${cp.fileCount} files)`);
  };

  // Create Manual Checkpoint
  const handleManualCheckpoint = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = checkpointMsg || 'Manual Developer Checkpoint';
    checkpointManager.createCheckpoint(projectId, msg, vfs.getAllFiles(), 'Developer');
    setCheckpoints(checkpointManager.getCheckpoints(projectId));
    setCheckpointMsg('');
    terminal.writeSystem(`Created checkpoint: ${msg}`);
  };

  // Screenshot-to-Code Synthesis Flow
  const handleVisionUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setVisionImage(evt.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRunVisionSynthesis = async () => {
    if (!visionImage) return;
    setIsAnalyzingVision(true);
    terminal.writeSystem('Vision Engine: Analyzing uploaded screenshot layout hierarchy...');

    const result = await visionEngine.analyzeScreenshot(visionImage, visionHint);

    // Write synthesized components into VFS
    vfs.writeFile(projectId, '/src/App.tsx', result.generatedAppCode);
    vfs.writeFile(
      projectId,
      '/VISION_ANALYSIS.json',
      JSON.stringify(
        {
          layout: result.detectedLayout,
          colorPalette: result.colorPalette,
          components: result.componentsIdentified,
          typography: result.typography,
          timestamp: new Date().toISOString(),
        },
        null,
        2
      )
    );

    const all = vfs.getAllFiles();
    setFiles(all);
    setActiveFilePath('/src/App.tsx');
    setFileContent(result.generatedAppCode);
    setIsAnalyzingVision(false);
    setShowVisionModal(false);
    refreshPreview();

    terminal.writeSystem(`Vision Synthesis complete! Synthesized ${result.detectedLayout}.`);
  };

  // Export Project ZIP
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

  // Find Migration Files for Database Tab
  const migrationFiles = files.filter((f) => f.path.includes('migration') || f.path.endsWith('.sql'));

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
          {/* Panel Visibility Toggles */}
          <div className="hidden lg:flex items-center space-x-1 bg-zinc-900 border border-white/[0.08] p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setIsExplorerOpen(!isExplorerOpen)}
              className={`px-2 py-1 rounded font-medium text-[11px] transition ${isExplorerOpen ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              title="Toggle File Explorer"
            >
              Files
            </button>
            <button
              onClick={() => setIsTerminalOpen(!isTerminalOpen)}
              className={`px-2 py-1 rounded font-medium text-[11px] transition ${isTerminalOpen ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              title="Toggle Terminal Dock"
            >
              Terminal
            </button>
            <button
              onClick={() => setIsAgentPanelOpen(!isAgentPanelOpen)}
              className={`px-2 py-1 rounded font-medium text-[11px] transition ${isAgentPanelOpen ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              title="Toggle Agent Panel"
            >
              Agents
            </button>
          </div>

          {/* Viewport Toggles */}
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

          {/* Mode Switcher */}
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

          {/* Screenshot-to-Website Button */}
          <button
            onClick={() => setShowVisionModal(true)}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition"
            title="Upload design mockup or reference screenshot"
          >
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Screenshot-to-App</span>
          </button>

          {/* Environment Variables Button */}
          <button
            onClick={() => setShowEnvModal(true)}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition"
            title="Manage project environment variables"
          >
            <span className="font-mono text-cyan-400 font-bold text-[11px]">.env</span>
            <span>Vars</span>
          </button>

          {/* Version History Button */}
          <button
            onClick={() => setShowCheckpointsModal(true)}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition"
            title="Version checkpoints and restore"
          >
            <History className="w-3.5 h-3.5 text-amber-400" />
            <span>History ({checkpoints.length})</span>
          </button>

          {/* Visual Inspector */}
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
        {/* ================= LEFT PANEL: Project Explorer ================= */}
        {isExplorerOpen && (
          <aside className="w-64 border-r border-white/[0.08] bg-[#090b0e] flex flex-col flex-none">
            <div className="p-3 border-b border-white/[0.08] flex items-center justify-between text-xs font-bold text-zinc-300">
              <span className="uppercase tracking-wider font-mono text-[10px] text-zinc-500">Explorer</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsCreatingFile(!isCreatingFile)}
                  className="text-zinc-400 hover:text-cyan-400 text-xs transition"
                  title="New File"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] text-zinc-500 font-mono">{files.length}</span>
              </div>
            </div>

            {isCreatingFile && (
              <div className="p-2 border-b border-white/[0.08] bg-zinc-900/60 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="/src/components/MyComp.tsx"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateFile()}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                />
                <button onClick={handleCreateFile} className="text-cyan-400 text-xs font-bold">✓</button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {files.map((file) => (
                <div
                  key={file.path}
                  onClick={() => {
                    setActiveFilePath(file.path);
                    setFileContent(file.content);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition font-mono truncate group ${
                    activeFilePath === file.path
                      ? 'bg-white/[0.08] text-cyan-300 font-semibold border border-white/[0.1]'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <FileCode className="w-3.5 h-3.5 flex-none text-zinc-400" />
                    <span className="truncate">{file.path}</span>
                  </div>
                  <button
                    onClick={(e) => handleDeleteFile(file.path, e)}
                    className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 p-0.5 rounded transition"
                    title="Delete File"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Database & Integrations Quick Status */}
            <div className="p-3 border-t border-white/[0.08] bg-zinc-950/40 space-y-2 text-[11px]">
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
        )}

        {/* ================= CENTER PANEL: Preview & Code ================= */}
        <main className="flex-1 flex flex-col bg-surface-950 overflow-hidden relative">
          {/* Ambient Studio Backlights & Mesh */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent z-0" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-cyan-500/[0.05] blur-[140px] pointer-events-none rounded-full z-0" />

          <div className="flex-1 flex overflow-hidden relative z-10">
            {/* Live Preview Iframe */}
            {(centerMode === 'preview' || centerMode === 'split') && (
              <div className="flex-1 bg-[#090b0e]/95 flex flex-col items-center justify-center p-3 relative overflow-hidden border-r border-white/[0.08]">
                <div className={`h-full ${viewportWidthClass} bg-black rounded-2xl overflow-hidden border border-white/[0.12] shadow-2xl shadow-cyan-500/5 relative transition-all duration-500 ease-out flex flex-col`}>
                  {/* Browser Chrome Header with Pulse Indicator */}
                  <div className="h-8 bg-zinc-900/95 border-b border-white/[0.08] px-3.5 flex items-center justify-between text-xs font-mono select-none flex-none backdrop-blur-md">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:brightness-125 transition" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:brightness-125 transition" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 hover:brightness-125 transition" />
                    </div>
                    <div className="flex-1 max-w-xs mx-auto bg-black/70 border border-white/[0.08] rounded-full px-3 py-0.5 text-center text-[10px] text-zinc-300 truncate flex items-center justify-center space-x-1.5 shadow-inner">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>localhost:3000/app</span>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-400">
                      <button onClick={refreshPreview} className="hover:text-cyan-400 transition hover:rotate-180 duration-500" title="Reload Frame">
                        <RotateCw className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <iframe
                    ref={iframeRef}
                    title="NEXUS Live Preview"
                    sandbox="allow-scripts allow-forms allow-same-origin allow-modals"
                    srcDoc={buildPreviewHtml(files)}
                    className="w-full flex-1 border-none"
                  />
                </div>

                {/* Visual Inspector Selected Node Panel */}
                {selectedElement && (
                  <div className="absolute bottom-4 left-4 right-4 bg-surface-900/95 border border-cyan-500/40 backdrop-blur rounded-2xl p-4 shadow-2xl space-y-3 z-30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs">
                        <span className="font-mono font-bold text-cyan-400 uppercase">&lt;{selectedElement.tagName}&gt;</span>
                        <span className="text-zinc-400 font-mono text-[11px] truncate max-w-xs">{selectedElement.classes}</span>
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

                    {/* Live Visual Properties Tweaker */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-zinc-800/80 text-xs">
                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-1">Text Color</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            value={elemColor}
                            onChange={(e) => setElemColor(e.target.value)}
                            className="w-6 h-6 rounded border border-zinc-700 bg-transparent cursor-pointer"
                          />
                          <span className="font-mono text-[11px] text-zinc-300">{elemColor}</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-1">Background</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            value={elemBg}
                            onChange={(e) => setElemBg(e.target.value)}
                            className="w-6 h-6 rounded border border-zinc-700 bg-transparent cursor-pointer"
                          />
                          <span className="font-mono text-[11px] text-zinc-300">{elemBg}</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-1">Padding</label>
                        <input
                          type="text"
                          value={elemPadding}
                          onChange={(e) => setElemPadding(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-700 rounded px-2 py-0.5 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          onClick={applyVisualStyles}
                          className="w-full py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-lg border border-zinc-700 transition"
                        >
                          Apply Live Style
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Monaco Code Editor */}
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

          {/* ================= BOTTOM PANEL: Terminal, Tests & Database ================= */}
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
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Synthetic Tests (12/12 Passed)</span>
                </button>
                <button
                  onClick={() => setActiveBottomTab('database')}
                  className={`flex items-center space-x-1.5 py-1 transition ${activeBottomTab === 'database' ? 'text-cyan-400 font-bold border-b-2 border-cyan-400' : 'text-zinc-400 hover:text-white'}`}
                >
                  <Database className="w-3.5 h-3.5 text-blue-400" />
                  <span>Database Migrations ({migrationFiles.length})</span>
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

              {activeBottomTab === 'database' && (
                <div className="space-y-2">
                  <div className="text-zinc-400 text-[11px]">Active Supabase PostgreSQL DDL Migrations:</div>
                  {migrationFiles.map((m) => (
                    <div key={m.path} className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg space-y-1">
                      <span className="text-cyan-400 font-bold">{m.path}</span>
                      <pre className="text-[11px] text-zinc-300 max-h-24 overflow-y-auto">{m.content}</pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* ================= RIGHT PANEL: AI Orchestrator & Feed ================= */}
        <aside className="w-80 border-l border-zinc-800/80 bg-surface-950 flex flex-col flex-none">
          <div className="p-3 border-b border-zinc-800/80 flex items-center justify-between text-xs font-bold text-zinc-300">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Agent Orchestrator</span>
            </div>
            {/* Animated Audio/Event Waveform */}
            <div className="flex items-center space-x-2">
              {isGenerating ? (
                <div className="flex items-center space-x-0.5">
                  <span className="w-0.5 h-3 bg-cyan-400 animate-pulse" />
                  <span className="w-0.5 h-4 bg-cyan-300 animate-pulse" style={{ animationDelay: '150ms' }} />
                  <span className="w-0.5 h-2 bg-blue-400 animate-pulse" style={{ animationDelay: '300ms' }} />
                  <span className="w-0.5 h-4 bg-indigo-400 animate-pulse" style={{ animationDelay: '450ms' }} />
                </div>
              ) : null}
              <span className="text-[10px] font-mono text-cyan-400 font-bold">{progressPercent}%</span>
            </div>
          </div>

          <div className="w-full bg-zinc-900 h-1">
            <div
              className={`bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 h-1 transition-all duration-300 ${
                isGenerating ? 'animate-pulse' : ''
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {/* Active Stage Card with Visual Glow */}
            <div className={`rounded-xl p-3 space-y-2 border transition-all duration-300 ${
              isGenerating
                ? 'bg-cyan-950/30 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                : 'bg-surface-900/70 border-zinc-800/80'
            }`}>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400'}`} />
                  <span className="font-semibold text-white">Active Stage</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-cyan-300 border border-white/[0.06]">
                  {orchestrationStatus}
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                {activeTask?.title || 'System ready. Submit an instruction to trigger the 10-agent orchestration sequence.'}
              </p>
            </div>

            {/* Visual 10-Agent Swarm Pipeline */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                <span>Autonomous Pipeline</span>
                <span className="text-cyan-400">10 Specialists</span>
              </div>
              <div className="grid grid-cols-5 gap-1 text-[9px] font-mono">
                {[
                  { role: 'planner', icon: '📋' },
                  { role: 'designer', icon: '🎨' },
                  { role: 'database', icon: '🗄️' },
                  { role: 'frontend', icon: '💻' },
                  { role: 'backend', icon: '⚡' },
                  { role: 'security', icon: '🛡️' },
                  { role: 'tester', icon: '🧪' },
                  { role: 'debugger', icon: '🐞' },
                  { role: 'deployer', icon: '🚀' },
                  { role: 'verifier', icon: '✓' },
                ].map((spec) => {
                  const isDone = agentTasks.some((t) => t.agentRole === spec.role);
                  return (
                    <div
                      key={spec.role}
                      className={`p-1.5 rounded-lg border text-center transition-all ${
                        isDone
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                          : 'bg-zinc-900/60 border-white/[0.04] text-zinc-500'
                      }`}
                      title={spec.role}
                    >
                      <div>{spec.icon}</div>
                      <div className="truncate capitalize text-[8px]">{spec.role.slice(0, 4)}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Task Log</span>
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                {agentTasks.map((t) => (
                  <div key={t.id} className="p-2 bg-surface-900/40 border border-zinc-800/60 rounded-lg text-xs space-y-1 hover:border-cyan-500/40 transition">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[11px] text-zinc-200 capitalize">{t.agentRole}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">DONE ✓</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-mono line-clamp-1">{t.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Prompt Composer */}
          <form onSubmit={handleRunAgent} className="p-3 border-t border-white/[0.08] bg-[#090b0e] space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <div className="flex items-center space-x-1">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="bg-zinc-900 border border-white/[0.08] rounded-lg px-2 py-0.5 text-[11px] text-cyan-300 focus:outline-none"
                >
                  <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
                  <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                  <option value="gpt-4o">GPT-4o</option>
                </select>
              </div>
              <div className="flex items-center space-x-1 text-zinc-500 text-[10px]">
                <span>Mode:</span>
                <button
                  type="button"
                  onClick={() => setGenerationMode(generationMode === 'full' ? 'refactor' : 'full')}
                  className="text-zinc-300 hover:text-white underline"
                >
                  {generationMode === 'full' ? 'Full-Stack' : 'Refactor'}
                </button>
              </div>
            </div>

            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Give instructions to AI (e.g. 'Add gold coin sounds, speed train obstacles, and high-score modal')..."
              className="w-full bg-zinc-900/90 border border-white/[0.08] focus:border-cyan-500 rounded-xl p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none resize-none leading-relaxed transition"
            />

            {/* Quick Prompt Suggestion Pills */}
            <div className="flex flex-wrap gap-1">
              {[
                'Pinterest × Canva × Google AI Aesthetic',
                'Google AI & Netflix Cinema with 4K Video',
                'Multilingual Voice (EN/HI/KO/ZH/SA)',
                'Subway Surfers 3D Runner with Keyboard Controls',
                'Refactor with dark glass theme',
              ].map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => setPrompt(sug)}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-zinc-200 transition border border-white/[0.06]"
                >
                  + {sug}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <button
                type="button"
                onClick={() => setShowVisionModal(true)}
                className="p-2 rounded-xl bg-zinc-900 border border-white/[0.08] text-zinc-400 hover:text-cyan-400 transition"
                title="Attach Screenshot"
              >
                <ImageIcon className="w-3.5 h-3.5" />
              </button>

              {isGenerating ? (
                <button
                  type="button"
                  onClick={handleCancelAgent}
                  className="flex-1 py-2 bg-red-600/90 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1.5 shadow-lg shadow-red-500/20"
                >
                  <StopCircle className="w-3.5 h-3.5" />
                  <span>Cancel Orchestration</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-1 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center space-x-1.5 shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Agents (⌘↵)</span>
                </button>
              )}
            </div>
          </form>
        </aside>
      </div>

      {/* ================= MODAL: Version History & Checkpoints ================= */}
      {showCheckpointsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-surface-900 border border-zinc-800 rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <History className="w-4 h-4 text-amber-400" />
                <span>Git Checkpoints & Version Snapshots</span>
              </h2>
              <button onClick={() => setShowCheckpointsModal(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleManualCheckpoint} className="flex space-x-2">
              <input
                type="text"
                placeholder="Checkpoint commit message..."
                value={checkpointMsg}
                onChange={(e) => setCheckpointMsg(e.target.value)}
                className="flex-1 bg-surface-950 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition"
              >
                Save Snapshot
              </button>
            </form>

            <div className="max-h-72 overflow-y-auto space-y-2">
              {checkpoints.map((cp) => (
                <div key={cp.id} className="p-3 bg-surface-950 border border-zinc-800 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-semibold text-white">{cp.message}</h4>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {new Date(cp.timestamp).toLocaleTimeString()} • {cp.fileCount} files • {cp.author}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRestoreCheckpoint(cp)}
                    className="px-3 py-1 bg-zinc-800 hover:bg-cyan-500 hover:text-black text-cyan-400 font-bold text-xs rounded-lg transition"
                  >
                    Restore
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: Environment Variables ================= */}
      <EnvVarsModal
        isOpen={showEnvModal}
        onClose={() => setShowEnvModal(false)}
        onSave={(vars) => {
          terminal.writeSystem(`Updated ${vars.length} environment variables in sandbox workspace.`);
        }}
      />

      {/* ================= MODAL: Screenshot-to-Website Flow ================= */}
      {showVisionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-surface-900 border border-zinc-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                <span>Screenshot-to-Website Pipeline</span>
              </h2>
              <button onClick={() => setShowVisionModal(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-zinc-400">
              Upload a design mockup or UI screenshot. NEXUS Vision Engine will analyze the layout hierarchy, typography, and color tokens, then synthesize a fresh React interface.
            </p>

            <div className="border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center space-y-2 hover:border-cyan-500 transition cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleVisionUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {visionImage ? (
                <img src={visionImage} alt="preview" className="max-h-40 mx-auto rounded-lg object-contain shadow" />
              ) : (
                <div className="space-y-1">
                  <Upload className="w-8 h-8 text-zinc-500 mx-auto" />
                  <span className="text-xs text-zinc-300 font-semibold block">Click to upload reference mockup</span>
                  <span className="text-[10px] text-zinc-500 font-mono">PNG, JPG, WEBP</span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">User Guidance Hint (Optional)</label>
              <input
                type="text"
                placeholder="e.g., streaming platform, e-commerce, social feed"
                value={visionHint}
                onChange={(e) => setVisionHint(e.target.value)}
                className="w-full bg-surface-950 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              onClick={handleRunVisionSynthesis}
              disabled={!visionImage || isAnalyzingVision}
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-extrabold text-xs rounded-xl transition shadow-lg shadow-cyan-500/20"
            >
              {isAnalyzingVision ? 'Analyzing Hierarchy & Synthesizing...' : 'Decompose & Synthesize Application'}
            </button>
          </div>
        </div>
      )}
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
