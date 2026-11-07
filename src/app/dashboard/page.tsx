'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { NavigationBar } from '@/components/navigation/Navbar';
import { Project } from '@/types';
import { TEMPLATES } from '@/lib/projects/templates';
import {
  Plus,
  FolderCode,
  Sparkles,
  ArrowRight,
  Trash2,
  Clock,
  CheckCircle2,
  Search,
} from 'lucide-react';

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj_netflix_01',
    userId: 'user_default',
    name: 'StreamFlix Media',
    slug: 'streamflix-media',
    description: 'Premium video streaming application with hero billboard and watchlist.',
    template: 'netflix-streaming',
    currentStatus: 'READY',
    framework: 'Next.js 15 + React 19',
    isArchived: false,
    settings: { theme: 'dark', autoFix: true, strictTesting: true },
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date().toISOString(),
    fileCount: 8,
  },
  {
    id: 'proj_instagram_02',
    userId: 'user_default',
    name: 'InstaVibe Social',
    slug: 'instavibe-social',
    description: 'Social photo sharing platform with stories, likes, and comment threads.',
    template: 'instagram-social',
    currentStatus: 'READY',
    framework: 'Next.js 15 + React 19',
    isArchived: false,
    settings: { theme: 'dark', autoFix: true, strictTesting: true },
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date().toISOString(),
    fileCount: 6,
  },
];

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectPrompt, setNewProjectPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('nextjs-saas');

  useEffect(() => {
    const initialPrompt = searchParams.get('prompt');
    if (initialPrompt) {
      setNewProjectPrompt(initialPrompt);
      setNewProjectName(initialPrompt.slice(0, 30) + ' App');
      setIsModalOpen(true);
    }
  }, [searchParams]);

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
    router.push(`/studio/${id}?prompt=${encodeURIComponent(newProjectPrompt)}`);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 w-full space-y-8 flex-1">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Project Workspaces</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Autonomous applications managed by NEXUS AI orchestration engine.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs rounded-xl transition flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/10"
        >
          <Plus className="w-4 h-4" />
          <span>New Application</span>
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-900/60 border border-zinc-800/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 font-medium">Active Projects</span>
            <div className="text-2xl font-black text-white">{projects.length}</div>
          </div>
          <FolderCode className="w-8 h-8 text-cyan-400 opacity-60" />
        </div>
        <div className="bg-surface-900/60 border border-zinc-800/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 font-medium">Monthly Token Quota</span>
            <div className="text-2xl font-black text-white">482,100 / 500k</div>
          </div>
          <Sparkles className="w-8 h-8 text-blue-400 opacity-60" />
        </div>
        <div className="bg-surface-900/60 border border-zinc-800/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 font-medium">Active Agents</span>
            <div className="text-2xl font-black text-emerald-400">10 Ready</div>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-400 opacity-60" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-surface-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((project) => (
          <div
            key={project.id}
            onClick={() => router.push(`/studio/${project.id}`)}
            className="bg-surface-900/80 border border-zinc-800/80 hover:border-cyan-500/50 rounded-2xl p-5 flex flex-col justify-between transition cursor-pointer group shadow-sm hover:shadow-cyan-500/5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-cyan-300 border border-zinc-700">
                  {project.template}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{project.currentStatus}</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition">
                {project.name}
              </h3>
              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => handleDelete(project.id, e)}
                  className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <span className="font-semibold text-cyan-400 group-hover:translate-x-0.5 transition flex items-center space-x-1">
                  <span>Studio</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-surface-900 border border-zinc-800 rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-lg font-bold text-white">Create New Application</h2>
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
                  placeholder="e.g., StreamFlix Pro, Aura Commerce"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full bg-surface-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Application Intent / Prompt</label>
                <textarea
                  rows={3}
                  placeholder="Describe your application: e.g. Build a premium Netflix-like streaming platform with dark aesthetic, hero carousel, and video player modal."
                  value={newProjectPrompt}
                  onChange={(e) => setNewProjectPrompt(e.target.value)}
                  className="w-full bg-surface-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Select Architecture Template</label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full bg-surface-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="netflix-streaming">Netflix Clone (Video Streaming & Media)</option>
                  <option value="instagram-social">Instagram Social (Feed, Stories, Likes)</option>
                  <option value="amazon-commerce">Amazon E-Commerce (Catalog, Cart, Reviews)</option>
                  <option value="youtube-platform">YouTube Platform (Video Grid, Comments)</option>
                  <option value="blinkit-quick">Blinkit Quick-Commerce (10-Min Delivery Cart)</option>
                  <option value="nextjs-saas">Modern Next.js 15 SaaS Starter</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs rounded-xl transition shadow-lg shadow-cyan-500/20"
                >
                  Initialize & Launch Studio
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
    <div className="min-h-screen bg-surface-950 text-zinc-100 flex flex-col font-sans">
      <NavigationBar />
      <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-zinc-500">Loading workspaces...</div>}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
