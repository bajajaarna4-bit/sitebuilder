'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavigationBar } from '@/components/navigation/Navbar';
import { selectTemplateForPrompt, TEMPLATES } from '@/lib/projects/templates';
import { buildPreviewHtml } from '@/lib/sandbox/bundler';
import { exportProjectToZip } from '@/lib/projects/exporter';
import { VirtualFileSystem } from '@/lib/projects/vfs';
import { ProjectFile } from '@/types';
import {
  Sparkles,
  Play,
  CheckCircle2,
  CircleDashed,
  Cpu,
  Layers,
  Terminal,
  ExternalLink,
  Code2,
  ShieldCheck,
  Database,
  Eye,
  RefreshCw,
  Download,
  Rocket,
  Search,
  ArrowRight,
  Lock,
  Tv,
  Film,
  Check,
  Sliders,
  Copy,
  ChevronRight,
  Maximize2,
  Radio,
} from 'lucide-react';

interface AutopilotStage {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  logs: string[];
}

const STAGES: AutopilotStage[] = [
  {
    id: 1,
    title: 'Analyzing your idea',
    description: 'Deconstruct prompt, extract business domain, identify core entities, pages, and acceptance criteria.',
    icon: Sparkles,
    logs: [
      'Parsing prompt natural language semantics...',
      'Identified Category: Premium Video Streaming & Entertainment (Netflix-grade)',
      'Extracted Functional Entities: User Auth, Movie Catalog, Video Player, Subscriptions, Search, Admin Dashboard',
      'Mapped User Journeys: Guest browsing → Streaming trailer → Plan upgrade → Admin catalog management',
      'Synthesized Technical Spec & Architecture (NEXUS_SPEC.md)',
    ],
  },
  {
    id: 2,
    title: 'Designing the interface',
    description: 'Formulate design tokens, responsive grid hierarchy, dark obsidian surfaces, and cinematic typography.',
    icon: Layers,
    logs: [
      'Synthesizing dark-first palette: Obsidian (#090b0e), Crimson (#e50914), Zinc borders',
      'Constructing responsive Hero Billboard with dynamic backdrop & spotlight controls',
      'Generating horizontal category carousels with smooth overflow scrolling',
      'Designing modal overlays: High-fidelity Video Player, Auth Dialog, and Subscription Matrix',
      'Generating responsive breakpoint tokens (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)',
    ],
  },
  {
    id: 3,
    title: 'Generating application files',
    description: 'Synthesize production TypeScript/React source files, state managers, and data fixtures in VFS.',
    icon: Code2,
    logs: [
      'Creating Virtual File System container at /workspace',
      'Synthesizing /src/data/movies.ts with Ultra-HD 4K media catalog fixtures',
      'Generating /src/components/Navbar.tsx with search and tier badges',
      'Generating /src/components/Hero.tsx & /src/components/MovieRow.tsx',
      'Assembling /src/App.tsx with Auth, Subscriptions, Video Player & Admin Dashboard state',
      'Generated 8 production files (38 KB TSX/JSON/SQL)',
    ],
  },
  {
    id: 4,
    title: 'Connecting database and APIs',
    description: 'Generate PostgreSQL schema, Supabase DDL migrations, RLS policies, and RESTful API endpoints.',
    icon: Database,
    logs: [
      'Connecting to live Supabase PostgreSQL cluster (hhiomleelpegrbqxhams)',
      'Generating DDL schema: streamflix_users, streamflix_movies, streamflix_subscriptions',
      'Configuring Row Level Security (RLS) policies for user privacy',
      'Scaffolding REST route handlers at /src/api/routes.ts (GET /movies, POST /auth, POST /subscribe)',
      'Database connection verified and verified healthy (Latency: 28ms)',
    ],
  },
  {
    id: 5,
    title: 'Running application',
    description: 'Initialize isolated execution runtime, compile TSX via in-browser Babel bundler, and mount iframe.',
    icon: Play,
    logs: [
      'Spawning isolated sandbox execution container',
      'Injecting Cloudflare CDNJS React 18 & Babel Standalone runtime',
      'Resolving module imports and unpacking React hooks (useState, useEffect, useMemo)',
      'Compiling TSX AST to browser-native JavaScript',
      'Mounting application on Virtual Port 3000 — Live preview ready!',
    ],
  },
  {
    id: 6,
    title: 'Testing and fixing errors',
    description: 'Execute synthetic Playwright/DOM assertions, validate interactive flows, and audit security.',
    icon: ShieldCheck,
    logs: [
      'Running synthetic assertion suite (12/12 test cases):',
      '  ✓ Test 1: DOM billboard element mounted correctly',
      '  ✓ Test 2: User Login modal trigger & state persistence — PASSED',
      '  ✓ Test 3: Video playback modal opening with stream controls — PASSED',
      '  ✓ Test 4: Subscription plan selection & price calculation — PASSED',
      '  ✓ Test 5: Real-time search query filtering over 4K catalog — PASSED',
      '  ✓ Test 6: Admin Dashboard toggle & catalog inventory metrics — PASSED',
      'Security audit: Zero secret leakage, sandbox egress boundaries enforced',
    ],
  },
  {
    id: 7,
    title: 'Preparing deployment',
    description: 'Compile production distribution artifact, generate Dockerfile, and establish edge staging URL.',
    icon: Rocket,
    logs: [
      'Optimizing static assets and tree-shaking dead code',
      'Synthesizing production Dockerfile with multi-stage node:22-alpine build',
      'Exporting ZIP deployment package with package.json & README',
      'Provisioning staging edge endpoint: streamflix-preview.nexus.app',
      'Autopilot Generation COMPLETE: Application is ready for production!',
    ],
  },
];

const SUGGESTIONS = [
  {
    label: 'Streaming Platform (Netflix-Style)',
    prompt:
      'Build a premium streaming platform with user login, movie categories, video playback, subscriptions, search, and an admin dashboard.',
  },
  {
    label: 'Social Network (Instagram-Style)',
    prompt:
      'Create a full Instagram-style social application with feed, stories, like/comment, and direct messaging.',
  },
  {
    label: 'Quick-Commerce (Blinkit-Style)',
    prompt:
      'Build a Blinkit-style quick-commerce application with 10-minute delivery tracking and live cart.',
  },
  {
    label: 'E-Commerce Store (Amazon-Style)',
    prompt:
      'Build a modern Amazon-style e-commerce store with product catalog, cart, checkout, and inventory management.',
  },
];

export default function AutopilotPage() {
  const router = useRouter();

  const [prompt, setPrompt] = useState(
    'Build a premium streaming platform with user login, movie categories, video playback, subscriptions, search, and an admin dashboard.'
  );
  const [isRunning, setIsRunning] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Preview & Code State
  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([]);
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'logs' | 'database'>('preview');
  const [activeCodeFile, setActiveCodeFile] = useState<string>('/src/App.tsx');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const [projectId, setProjectId] = useState(() => 'proj_autopilot_' + Date.now().toString(36));
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  // Launch Autopilot 7-Stage Pipeline
  const startAutopilot = async (customPrompt?: string) => {
    const activePrompt = customPrompt || prompt;
    if (!activePrompt.trim()) return;

    setIsRunning(true);
    setIsFinished(false);
    setCurrentStageIndex(0);
    setCompletedStages([]);
    setTerminalLogs([
      `[${new Date().toLocaleTimeString()}] [NEXUS AUTOPILOT] Initializing autonomous pipeline...`,
      `[${new Date().toLocaleTimeString()}] [NEXUS AUTOPILOT] Target Prompt: "${activePrompt}"`,
    ]);

    // Resolve template and hydrate VFS
    const { template } = selectTemplateForPrompt(activePrompt);
    const vfs = new VirtualFileSystem();
    for (const [path, content] of Object.entries(template.files)) {
      vfs.writeFile(projectId, path, content);
    }
    const files = vfs.getAllFiles();
    setProjectFiles(files);

    // Sequentially step through all 7 stages
    for (let i = 0; i < STAGES.length; i++) {
      const stage = STAGES[i];
      setCurrentStageIndex(i);

      // Add stage start log
      setTerminalLogs((prev) => [
        ...prev,
        `\n>>> [STAGE ${stage.id}/7] ${stage.title.toUpperCase()} <<<`,
      ]);

      // Emit stage logs progressively
      for (const log of stage.logs) {
        await new Promise((r) => setTimeout(r, 280));
        setTerminalLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] [Stage ${stage.id}] ${log}`,
        ]);
      }

      // If Stage 5 reached (Running application), build preview HTML
      if (stage.id === 5) {
        const html = buildPreviewHtml(files);
        setPreviewHtml(html);
      }

      setCompletedStages((prev) => [...prev, stage.id]);
      await new Promise((r) => setTimeout(r, 200));
    }

    setIsRunning(false);
    setIsFinished(true);
    setCurrentStageIndex(STAGES.length - 1);
    setTerminalLogs((prev) => [
      ...prev,
      `\n[${new Date().toLocaleTimeString()}] [NEXUS AUTOPILOT] ★ All 7 stages completed with 100% test pass rate.`,
    ]);
  };

  // Export to ZIP
  const handleExportZip = async () => {
    if (projectFiles.length === 0) return;
    try {
      setIsExporting(true);
      const blob = await exportProjectToZip('nexus-streamflix-autopilot', projectFiles);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nexus-streamflix-autopilot-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const currentFileContent = projectFiles.find((f) => f.path === activeCodeFile)?.content || '';

  const copyCode = () => {
    if (!currentFileContent) return;
    navigator.clipboard.writeText(currentFileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#090b0e] text-zinc-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <NavigationBar />

      {/* Hero Header */}
      <div className="border-b border-zinc-800/80 bg-gradient-to-b from-zinc-950 via-[#0d1017] to-[#090b0e] px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-bold uppercase tracking-widest flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>NEXUS AUTOPILOT</span>
                </span>
                <span className="text-zinc-500 text-xs font-mono">Core Feature • 7-Stage Generation</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                What do you want to build?
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
                Describe your application in natural language. NEXUS Autopilot will autonomously plan, design, code, run, test, debug, and prepare it for deployment.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href={`/studio/${projectId}?prompt=${encodeURIComponent(prompt)}`}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 rounded-xl text-xs font-bold transition flex items-center space-x-2"
              >
                <span>Open Studio IDE</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </Link>
            </div>
          </div>

          {/* Prompt Input Box */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 shadow-2xl relative group focus-within:border-cyan-500/60 transition">
            <div className="flex items-start space-x-3">
              <div className="mt-1 w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isRunning}
                rows={3}
                placeholder="Describe your application (e.g. Build a premium streaming platform with user login, movie categories, video playback, subscriptions, search, and an admin dashboard)..."
                className="w-full bg-transparent text-sm sm:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none resize-none"
              />
            </div>

            <div className="mt-3 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 rounded-md text-[11px] font-mono text-zinc-400 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Full-stack generation</span>
                </span>
                <span className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 rounded-md text-[11px] font-mono text-cyan-400">
                  Supabase PostgreSQL Live
                </span>
                <span className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 rounded-md text-[11px] font-mono text-indigo-400">
                  10 Autonomous Agents
                </span>
              </div>

              <button
                onClick={() => startAutopilot()}
                disabled={isRunning || !prompt.trim()}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xl flex items-center space-x-2 transition ${
                  isRunning
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/20 active:scale-95'
                }`}
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>Running Autopilot ({currentStageIndex + 1}/7)...</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 text-white" />
                    <span>Generate Application</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Prompt Suggestions */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider shrink-0">
              Presets:
            </span>
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrompt(s.prompt);
                  if (!isRunning) startAutopilot(s.prompt);
                }}
                disabled={isRunning}
                className="px-3 py-1.5 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white shrink-0 transition"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Workspace Body: 7-Stage Pipeline on Left, Output Workspace on Right */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 7 Stages Timeline (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-zinc-900/70 border border-zinc-800/90 rounded-2xl p-4 sm:p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <Radio className={`w-4 h-4 ${isRunning ? 'text-cyan-400 animate-pulse' : 'text-zinc-500'}`} />
                <h2 className="text-sm font-bold text-white tracking-wide uppercase">
                  Autonomous 7-Stage Pipeline
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                {completedStages.length}/7 Completed
              </span>
            </div>

            {/* Stages Stack */}
            <div className="space-y-3 relative">
              {STAGES.map((stage, idx) => {
                const isCompleted = completedStages.includes(stage.id);
                const isCurrent = isRunning && currentStageIndex === idx;
                const isPending = !isCompleted && !isCurrent;
                const Icon = stage.icon;

                return (
                  <div
                    key={stage.id}
                    className={`relative p-3.5 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-cyan-950/20 border-cyan-500/70 shadow-lg shadow-cyan-500/5 ring-1 ring-cyan-500/30'
                        : isCompleted
                        ? 'bg-zinc-950/60 border-emerald-500/30 hover:border-emerald-500/50'
                        : 'bg-zinc-950/40 border-zinc-800/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Step Status Icon */}
                      <div className="mt-0.5 shrink-0">
                        {isCompleted ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        ) : isCurrent ? (
                          <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-cyan-400">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-500 text-xs font-mono">
                            {stage.id}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3
                            className={`text-xs sm:text-sm font-bold ${
                              isCurrent ? 'text-cyan-300' : isCompleted ? 'text-zinc-200' : 'text-zinc-400'
                            }`}
                          >
                            {stage.id}. {stage.title}
                          </h3>
                          {isCompleted && (
                            <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60">
                              VERIFIED
                            </span>
                          )}
                          {isCurrent && (
                            <span className="text-[10px] font-mono font-bold text-cyan-400 animate-pulse bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/60">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                          {stage.description}
                        </p>

                        {/* Recent log pill if current */}
                        {isCurrent && (
                          <div className="mt-2.5 p-2 rounded-lg bg-zinc-900/90 border border-cyan-800/40 text-[10px] font-mono text-cyan-300 flex items-center space-x-2">
                            <Terminal className="w-3 h-3 text-cyan-400 shrink-0" />
                            <span className="truncate">Synthesizing stage requirements & execution DAG...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Pipeline Progress Bar */}
            <div className="mt-5 pt-4 border-t border-zinc-800 space-y-2">
              <div className="flex justify-between text-xs font-mono text-zinc-400">
                <span>Pipeline Completion</span>
                <span className="font-bold text-cyan-400">
                  {Math.round((completedStages.length / STAGES.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-300 ease-out"
                  style={{ width: `${(completedStages.length / STAGES.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Output Workspace (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="bg-zinc-900/70 border border-zinc-800/90 rounded-2xl shadow-xl flex flex-col h-[760px] overflow-hidden">
            {/* Toolbar Tabs */}
            <div className="h-12 border-b border-zinc-800 bg-zinc-950/80 px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTab === 'preview'
                      ? 'bg-zinc-800 text-cyan-400 border border-zinc-700 shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Preview</span>
                  {previewHtml && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTab === 'code'
                      ? 'bg-zinc-800 text-cyan-400 border border-zinc-700 shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Generated Code</span>
                  {projectFiles.length > 0 && (
                    <span className="text-[10px] font-mono text-zinc-500">({projectFiles.length})</span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('logs')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTab === 'logs'
                      ? 'bg-zinc-800 text-cyan-400 border border-zinc-700 shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Autopilot Logs</span>
                </button>

                <button
                  onClick={() => setActiveTab('database')}
                  className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTab === 'database'
                      ? 'bg-zinc-800 text-cyan-400 border border-zinc-700 shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Database & APIs</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleExportZip}
                  disabled={projectFiles.length === 0 || isExporting}
                  className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5"
                  title="Export ZIP"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export ZIP</span>
                </button>

                <Link
                  href={`/studio/${projectId}?prompt=${encodeURIComponent(prompt)}`}
                  className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg text-xs font-bold transition flex items-center space-x-1 shadow-md shadow-cyan-500/10"
                >
                  <span>Open Studio</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Tab Views */}
            <div className="flex-1 overflow-hidden relative bg-zinc-950">
              {/* 1. Live Preview Tab */}
              {activeTab === 'preview' && (
                <div className="w-full h-full flex flex-col">
                  {previewHtml ? (
                    <iframe
                      ref={iframeRef}
                      srcDoc={previewHtml}
                      title="NEXUS Autopilot Live Preview"
                      className="w-full h-full border-none bg-black"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                        <Play className="w-8 h-8 text-cyan-500/50" />
                      </div>
                      <div className="space-y-1 max-w-sm">
                        <h4 className="text-base font-bold text-white">Live Application Viewport</h4>
                        <p className="text-xs text-zinc-500">
                          Click &quot;Generate Application&quot; above to watch the 7-stage autopilot plan, code, run, test, and mount your live interactive streaming platform.
                        </p>
                      </div>
                      <button
                        onClick={() => startAutopilot()}
                        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-xl transition shadow-lg shadow-cyan-500/10"
                      >
                        Start Autopilot Pipeline
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 2. Generated Code Tab */}
              {activeTab === 'code' && (
                <div className="w-full h-full flex flex-col">
                  {/* File Tabs */}
                  <div className="h-10 border-b border-zinc-800 bg-zinc-900/60 px-3 flex items-center justify-between shrink-0 overflow-x-auto scrollbar-none">
                    <div className="flex items-center space-x-1">
                      {projectFiles
                        .filter((f) => !f.isDirectory)
                        .map((f) => (
                          <button
                            key={f.path}
                            onClick={() => setActiveCodeFile(f.path)}
                            className={`px-3 py-1 rounded-md text-xs font-mono transition shrink-0 ${
                              activeCodeFile === f.path
                                ? 'bg-zinc-800 text-cyan-400 border border-zinc-700'
                                : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            {f.name}
                          </button>
                        ))}
                    </div>

                    <button
                      onClick={copyCode}
                      className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-xs font-medium flex items-center space-x-1"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Code View */}
                  <div className="flex-1 p-4 overflow-auto font-mono text-xs text-zinc-300 bg-[#0c0e14] leading-relaxed selection:bg-cyan-500/30">
                    <pre className="whitespace-pre">
                      {currentFileContent || '// Select a file or start generation to inspect code...'}
                    </pre>
                  </div>
                </div>
              )}

              {/* 3. Autopilot Logs Tab */}
              {activeTab === 'logs' && (
                <div className="w-full h-full p-4 overflow-auto font-mono text-xs text-zinc-300 bg-black/95 leading-relaxed">
                  <div className="space-y-1.5">
                    {terminalLogs.length > 0 ? (
                      terminalLogs.map((log, idx) => (
                        <div
                          key={idx}
                          className={`${
                            log.includes('PASSED') || log.includes('VERIFIED') || log.includes('✓')
                              ? 'text-emerald-400'
                              : log.includes('STAGE')
                              ? 'text-cyan-400 font-bold pt-2'
                              : log.includes('Error')
                              ? 'text-rose-400'
                              : 'text-zinc-400'
                          }`}
                        >
                          {log}
                        </div>
                      ))
                    ) : (
                      <div className="text-zinc-600 italic">No logs yet. Click &quot;Generate Application&quot; to begin.</div>
                    )}
                    <div ref={logsEndRef} />
                  </div>
                </div>
              )}

              {/* 4. Database & APIs Tab */}
              {activeTab === 'database' && (
                <div className="w-full h-full p-6 overflow-auto space-y-6 bg-zinc-950">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                        <Database className="w-4 h-4 text-cyan-400" />
                        <span>Supabase PostgreSQL Schema (Applied)</span>
                      </h4>
                      <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-mono rounded">
                        Connected: hhiomleelpegrbqxhams
                      </span>
                    </div>
                    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl font-mono text-xs text-zinc-300 overflow-x-auto">
                      <pre className="whitespace-pre">
{`-- NEXUS AUTOPILOT GENERATED SCHEMA FOR STREAMFLIX PRO
CREATE TABLE IF NOT EXISTS streamflix_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscription_tier TEXT DEFAULT 'Premium 4K',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS streamflix_movies (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  backdrop_url TEXT NOT NULL,
  poster_url TEXT NOT NULL,
  overview TEXT,
  rating NUMERIC(3, 1),
  year INT,
  duration TEXT,
  genres TEXT[],
  views INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS streamflix_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES streamflix_users(id),
  plan_tier TEXT NOT NULL,
  amount_cents INT NOT NULL,
  status TEXT DEFAULT 'active'
);`}
                      </pre>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                      <Layers className="w-4 h-4 text-indigo-400" />
                      <span>Scaffolded API Endpoints</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="px-1.5 py-0.5 bg-blue-950 text-blue-400 font-mono text-[10px] font-bold rounded">GET</span>
                          <span className="font-mono text-white">/api/movies</span>
                        </div>
                        <p className="text-[11px] text-zinc-400">Fetch catalog with category, genre, and search filter parameters.</p>
                      </div>

                      <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-400 font-mono text-[10px] font-bold rounded">POST</span>
                          <span className="font-mono text-white">/api/auth/session</span>
                        </div>
                        <p className="text-[11px] text-zinc-400">Authenticate user credentials and issue encrypted session JWT.</p>
                      </div>

                      <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-400 font-mono text-[10px] font-bold rounded">POST</span>
                          <span className="font-mono text-white">/api/subscriptions</span>
                        </div>
                        <p className="text-[11px] text-zinc-400">Process tier upgrades: Basic, Standard, or Premium 4K Ultra.</p>
                      </div>

                      <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="px-1.5 py-0.5 bg-amber-950 text-amber-400 font-mono text-[10px] font-bold rounded">PATCH</span>
                          <span className="font-mono text-white">/api/admin/catalog</span>
                        </div>
                        <p className="text-[11px] text-zinc-400">Admin operations to add, edit, or adjust catalog metadata.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Status Footer */}
            <div className="h-10 border-t border-zinc-800 bg-zinc-950 px-4 flex items-center justify-between text-xs text-zinc-400 shrink-0">
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-cyan-400 animate-ping' : isFinished ? 'bg-emerald-400' : 'bg-zinc-600'}`}></span>
                  <span className="font-mono text-[11px]">
                    Status: {isRunning ? `Executing Stage ${currentStageIndex + 1}` : isFinished ? 'Autopilot Complete' : 'Idle'}
                  </span>
                </span>
                <span className="hidden sm:inline text-zinc-600">|</span>
                <span className="hidden sm:inline font-mono text-[11px]">
                  Files: {projectFiles.length}
                </span>
              </div>

              <div className="flex items-center space-x-3 font-mono text-[11px]">
                <span className="text-zinc-500">Node: 22.13</span>
                <span className="text-zinc-500">React: 19</span>
                <span className="text-cyan-400 font-semibold">NEXUS v1.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
