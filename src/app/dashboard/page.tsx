'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { NavigationBar } from '@/components/navigation/Navbar';
import { Project } from '@/types';
import { TEMPLATES } from '@/lib/projects/templates';
import { exportProjectToZip } from '@/lib/projects/exporter';
import {
  Plus,
  FolderCode,
  Sparkles,
  ArrowRight,
  Trash2,
  Clock,
  CheckCircle2,
  Search,
  Copy,
  Edit2,
  Archive,
  RotateCcw,
  Download,
  Filter,
  Gamepad2,
  Car,
  MessageSquare,
  Sparkle,
  Layout,
  Terminal,
} from 'lucide-react';

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj_poki_games',
    userId: 'user_default',
    name: 'Poki Arcade — Subway Surfers 3D',
    slug: 'poki-arcade-subway-surfers',
    description: 'Instant web games platform with real-time playable Subway Surfer endless runner (Arrow keys, jump, slide, coins).',
    template: 'poki-games',
    currentStatus: 'READY',
    framework: 'Next.js 15 + React 19',
    isArchived: false,
    settings: { theme: 'dark', autoFix: true, strictTesting: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fileCount: 7,
  },
  {
    id: 'proj_omniride_01',
    userId: 'user_default',
    name: 'OmniRide — Uber, Rapido & Ola',
    slug: 'omniride-transit',
    description: 'Unified urban mobility aggregator: Rapido bike-taxis, Ola autos, and Uber sedans with live fare calculation and GPS simulation.',
    template: 'uber-rapido-ola',
    currentStatus: 'READY',
    framework: 'Next.js 15 + React 19',
    isArchived: false,
    settings: { theme: 'dark', autoFix: true, strictTesting: true },
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date().toISOString(),
    fileCount: 8,
  },
  {
    id: 'proj_whatsapp_02',
    userId: 'user_default',
    name: 'WhatsApp Web',
    slug: 'whatsapp-web',
    description: 'Instant messaging suite with chat threads, message bubbles, audio playback, and audio/video calling overlay.',
    template: 'whatsapp-web',
    currentStatus: 'READY',
    framework: 'Next.js 15 + React 19',
    isArchived: false,
    settings: { theme: 'dark', autoFix: true, strictTesting: true },
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date().toISOString(),
    fileCount: 6,
  },
  {
    id: 'proj_claude_03',
    userId: 'user_default',
    name: 'Claude 3.5 Sonnet Studio',
    slug: 'claude-ai-studio',
    description: 'Interactive AI assistant with side-by-side Artifacts canvas, markdown code preview, and 200k context model switcher.',
    template: 'claude-ai',
    currentStatus: 'READY',
    framework: 'Next.js 15 + React 19',
    isArchived: false,
    settings: { theme: 'dark', autoFix: true, strictTesting: true },
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date().toISOString(),
    fileCount: 6,
  },
  {
    id: 'proj_ubuntu_04',
    userId: 'user_default',
    name: 'Ubuntu 24.04 LTS Desktop',
    slug: 'ubuntu-desktop-os',
    description: 'Interactive Linux GNOME desktop simulator with top bar, dock launcher, neofetch terminal, and app windows.',
    template: 'ubuntu-desktop',
    currentStatus: 'READY',
    framework: 'Next.js 15 + React 19',
    isArchived: false,
    settings: { theme: 'dark', autoFix: true, strictTesting: true },
    createdAt: new Date(Date.now() - 3600000 * 16).toISOString(),
    updatedAt: new Date().toISOString(),
    fileCount: 7,
  },
  {
    id: 'proj_canva_05',
    userId: 'user_default',
    name: 'Canva Design Studio',
    slug: 'canva-design-studio',
    description: 'Vector graphic design studio with drag-and-drop templates, canvas artboard, shape tools, and layer inspector.',
    template: 'canva-designer',
    currentStatus: 'READY',
    framework: 'Next.js 15 + React 19',
    isArchived: false,
    settings: { theme: 'dark', autoFix: true, strictTesting: true },
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    updatedAt: new Date().toISOString(),
    fileCount: 8,
  },
  {
    id: 'proj_spotify_06',
    userId: 'user_default',
    name: 'Spotify Web Player',
    slug: 'spotify-music-player',
    description: 'Audio streaming application with interactive now-playing bar, playlist manager, track scrubber, and search.',
    template: 'spotify-music',
    currentStatus: 'READY',
    framework: 'Next.js 15 + React 19',
    isArchived: false,
    settings: { theme: 'dark', autoFix: true, strictTesting: true },
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date().toISOString(),
    fileCount: 7,
  },
  {
    id: 'proj_netflix_01',
    userId: 'user_default',
    name: 'StreamFlix Media',
    slug: 'streamflix-media',
    description: 'Premium video streaming application with hero billboard, video playback modal, and category carousels.',
    template: 'netflix-streaming',
    currentStatus: 'READY',
    framework: 'Next.js 15 + React 19',
    isArchived: false,
    settings: { theme: 'dark', autoFix: true, strictTesting: true },
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    updatedAt: new Date().toISOString(),
    fileCount: 8,
  },
  {
    id: 'proj_instagram_02',
    userId: 'user_default',
    name: 'InstaVibe Social',
    slug: 'instavibe-social',
    description: 'Social photo sharing platform with stories, likes, comment threads, and direct profile explorer.',
    template: 'instagram-social',
    currentStatus: 'READY',
    framework: 'Next.js 15 + React 19',
    isArchived: false,
    settings: { theme: 'dark', autoFix: true, strictTesting: true },
    createdAt: new Date(Date.now() - 3600000 * 32).toISOString(),
    updatedAt: new Date().toISOString(),
    fileCount: 6,
  },
  {
    id: 'proj_amazon_03',
    userId: 'user_default',
    name: 'Aura Commerce',
    slug: 'aura-commerce',
    description: 'Modern Amazon-style e-commerce store with live cart drawer, customer reviews, and fast checkout.',
    template: 'amazon-commerce',
    currentStatus: 'READY',
    framework: 'Next.js 15 + React 19',
    isArchived: false,
    settings: { theme: 'dark', autoFix: true, strictTesting: true },
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    updatedAt: new Date().toISOString(),
    fileCount: 7,
  },
];

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [search, setSearch] = useState('');
  const [filterTab, setFilterTab] = useState<'active' | 'archived' | 'all'>('active');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectPrompt, setNewProjectPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('poki-games');

  // Rename modal state
  const [renamingProject, setRenamingProject] = useState<Project | null>(null);
  const [renameValue, setRenameValue] = useState('');

  useEffect(() => {
    const initialPrompt = searchParams.get('prompt');
    if (initialPrompt) {
      setNewProjectPrompt(initialPrompt);
      setNewProjectName(initialPrompt.slice(0, 30) + ' App');
      setIsModalOpen(true);
    }
  }, [searchParams]);

  // Create Project
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `proj_${Date.now()}`;
    const name = newProjectName || 'Untitled Project';

    const newProject: Project = {
      id,
      userId: 'user_default',
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: newProjectPrompt || 'Autonomous AI synthesized application',
      template: selectedTemplate,
      currentStatus: 'READY',
      framework: 'Next.js 15 + React 19',
      isArchived: false,
      settings: { theme: 'dark', autoFix: true, strictTesting: true },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fileCount: 7,
    };

    setProjects([newProject, ...projects]);
    setIsModalOpen(false);
    router.push(`/studio/${id}?template=${selectedTemplate}&prompt=${encodeURIComponent(newProjectPrompt)}`);
  };

  // Delete Project
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  // Duplicate Project
  const handleDuplicate = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    const dup: Project = {
      ...project,
      id: `proj_${Date.now()}`,
      name: `${project.name} (Copy)`,
      slug: `${project.slug}-copy`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects([dup, ...projects]);
  };

  // Archive / Restore Project
  const handleToggleArchive = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjects(
      projects.map((p) =>
        p.id === project.id ? { ...p, isArchived: !p.isArchived, updatedAt: new Date().toISOString() } : p
      )
    );
  };

  // Rename Project
  const openRenameModal = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setRenamingProject(project);
    setRenameValue(project.name);
  };

  const handleSaveRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (!renamingProject || !renameValue.trim()) return;
    setProjects(
      projects.map((p) =>
        p.id === renamingProject.id
          ? { ...p, name: renameValue.trim(), slug: renameValue.toLowerCase().replace(/[^a-z0-9]+/g, '-') }
          : p
      )
    );
    setRenamingProject(null);
  };

  // Direct ZIP download from dashboard
  const handleDownloadZip = async (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    const tmpl = TEMPLATES[project.template] || TEMPLATES['poki-games'];
    const virtualFiles = Object.entries(tmpl.files).map(([path, content]) => ({
      id: path,
      projectId: project.id,
      path,
      name: path.split('/').pop() || path,
      content,
      isDirectory: false,
      language: 'typescript',
      sizeBytes: content.length,
      version: 1,
      lastModifiedBy: 'agent:frontend',
      updatedAt: new Date().toISOString(),
    }));

    const blob = await exportProjectToZip(project.name, virtualFiles);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.slug}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter projects by search, tab, and category
  const filtered = projects
    .filter((p) => {
      if (filterTab === 'active') return !p.isArchived;
      if (filterTab === 'archived') return p.isArchived;
      return true;
    })
    .filter((p) => {
      if (categoryFilter === 'gaming') return p.template.includes('poki') || p.description.toLowerCase().includes('game');
      if (categoryFilter === 'mobility') return p.template.includes('uber') || p.description.toLowerCase().includes('transit');
      if (categoryFilter === 'social') return p.template.includes('whatsapp') || p.template.includes('instagram');
      if (categoryFilter === 'ai') return p.template.includes('claude') || p.template.includes('emergent');
      if (categoryFilter === 'design') return p.template.includes('canva') || p.template.includes('figma');
      if (categoryFilter === 'os') return p.template.includes('ubuntu') || p.template.includes('chrome');
      return true;
    })
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 w-full space-y-8 flex-1">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/[0.06] pb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
            <span>●</span>
            <span>AUTONOMOUS WORKSPACE REGISTRY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Workspaces</h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-normal">
            Select any live simulated application or initialize a new autonomous workspace.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => {
              setNewProjectPrompt('Build a Subway Surfer 3D endless runner game with real-time controls');
              setNewProjectName('Subway Surfer 3D');
              setSelectedTemplate('poki-games');
              setIsModalOpen(true);
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-red-500 hover:opacity-95 text-black font-extrabold text-xs rounded-xl transition flex items-center justify-center space-x-2 shadow-lg shadow-yellow-500/10 active:scale-95"
          >
            <span>🎮</span>
            <span>Play Subway Surfers</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-white hover:bg-zinc-200 text-black font-extrabold text-xs rounded-xl transition flex items-center justify-center space-x-2 shadow-lg shadow-white/5 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>New Application</span>
          </button>
        </div>
      </div>

      {/* Fluid Filter & Command Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All Workspaces' },
            { id: 'gaming', label: 'Games & Arcade' },
            { id: 'mobility', label: 'Mobility & Cabs' },
            { id: 'social', label: 'Social & Chat' },
            { id: 'ai', label: 'AI & Artifacts' },
            { id: 'design', label: 'Design & Canvas' },
            { id: 'os', label: 'OS & Simulator' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-150 font-medium ${
                categoryFilter === cat.id
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search environments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-950/80 border border-white/[0.08] focus:border-cyan-500/50 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition"
          />
        </div>
      </div>

      {/* Workspaces Continuous Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((project) => (
          <div
            key={project.id}
            onClick={() =>
              router.push(
                `/studio/${project.id}?template=${project.template}&prompt=${encodeURIComponent(
                  project.description || project.name
                )}`
              )
            }
            className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer group flex flex-col justify-between space-y-4 ${
              project.isArchived
                ? 'bg-zinc-950/30 border-white/[0.04] opacity-50'
                : 'bg-zinc-950/60 border-white/[0.06] hover:border-cyan-500/40 hover:bg-zinc-900/40 shadow-sm hover:shadow-cyan-500/5'
            }`}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-cyan-300">
                  {project.template}
                </span>

                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-emerald-400 font-bold">{project.currentStatus}</span>
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-white group-hover:text-cyan-300 transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Contextual Actions Toolbar */}
            <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs text-zinc-500">
              <span className="font-mono text-[11px] text-zinc-500">
                {new Date(project.createdAt).toLocaleDateString()}
              </span>

              <div className="flex items-center space-x-1">
                <button
                  onClick={(e) => openRenameModal(project, e)}
                  className="p-1.5 hover:text-white rounded hover:bg-white/[0.05] transition opacity-0 group-hover:opacity-100"
                  title="Rename"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => handleDownloadZip(project, e)}
                  className="p-1.5 hover:text-cyan-400 rounded hover:bg-white/[0.05] transition opacity-0 group-hover:opacity-100"
                  title="Export ZIP"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => handleDuplicate(project, e)}
                  className="p-1.5 hover:text-blue-400 rounded hover:bg-white/[0.05] transition opacity-0 group-hover:opacity-100"
                  title="Duplicate"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => handleDelete(project.id, e)}
                  className="p-1.5 hover:text-red-400 rounded hover:bg-white/[0.05] transition opacity-0 group-hover:opacity-100"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-semibold text-cyan-400 flex items-center space-x-1 pl-2 group-hover:translate-x-0.5 transition-transform">
                  <span>Open Studio</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rename Modal */}
      {renamingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-zinc-950 border border-white/[0.1] rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Rename Workspace</h3>
            <form onSubmit={handleSaveRename} className="space-y-4">
              <input
                type="text"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                className="w-full bg-zinc-900 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setRenamingProject(null)}
                  className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-zinc-950 border border-white/[0.1] rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <h2 className="text-base font-bold text-white">Initialize New Application</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Configure your prompt and architecture foundation.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subway Surfers 3D, OmniRide Transit"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/[0.1] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Application Intent / Prompt</label>
                <textarea
                  rows={3}
                  placeholder="Describe your desired application features, state behavior, and visual aesthetic..."
                  value={newProjectPrompt}
                  onChange={(e) => setNewProjectPrompt(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/[0.1] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Select Foundation Architecture</label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/[0.1] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="poki-games">Poki Arcade & Subway Surfers 3D Runner</option>
                  <option value="uber-rapido-ola">OmniRide — Uber, Rapido & Ola Unified Mobility</option>
                  <option value="whatsapp-web">WhatsApp Web — Chats & Real-time Calling</option>
                  <option value="claude-ai">Claude 3.5 Sonnet — Interactive AI & Artifacts</option>
                  <option value="canva-designer">Canva Studio — Graphic Design & Vectors</option>
                  <option value="ubuntu-desktop">Ubuntu 24.04 LTS — Linux Desktop Simulator</option>
                  <option value="spotify-music">Spotify Player — Audio & Podcast Streaming</option>
                  <option value="netflix-streaming">StreamFlix Pro — Video Streaming & Media</option>
                  <option value="instagram-social">Instagram Social — Stories, Feed & Profiles</option>
                  <option value="amazon-commerce">Aura Commerce — Store, Cart & Reviews</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl transition shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  Initialize & Launch Studio →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#07090d] text-zinc-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      <NavigationBar />
      <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-zinc-500">Loading workspaces...</div>}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
