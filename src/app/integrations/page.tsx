'use client';

import React from 'react';
import { NavigationBar } from '@/components/navigation/Navbar';
import { Layers, Database, GitBranch, Cloud, CheckCircle2, ExternalLink } from 'lucide-react';

export default function IntegrationsPage() {
  const integrations = [
    {
      id: 'supabase',
      name: 'Supabase Managed PostgreSQL',
      category: 'Database & Auth',
      description: 'Connected live to db.hhiomleelpegrbqxhams.supabase.co with 8 active master tables.',
      status: 'Connected',
      icon: Database,
      active: true,
    },
    {
      id: 'github',
      name: 'GitHub Version Control',
      category: 'Source Control',
      description: 'Automatic branch checkpoints, commit tracking, and repository synchronization.',
      status: 'Ready to Connect',
      icon: GitBranch,
      active: false,
    },
    {
      id: 'vercel',
      name: 'Vercel Edge Platform',
      category: 'Hosting & Deployment',
      description: 'Deploy generated full-stack Next.js applications directly to edge network.',
      status: 'Ready to Connect',
      icon: Cloud,
      active: false,
    },
  ];

  return (
    <div className="min-h-screen bg-surface-950 text-zinc-100 flex flex-col font-sans">
      <NavigationBar />

      <main className="max-w-6xl mx-auto px-6 py-10 w-full space-y-8 flex-1">
        <div className="border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Ecosystem Integrations</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Connect external cloud providers, version control platforms, and database clusters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {integrations.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-surface-900/60 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        item.active
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-white">{item.name}</h3>
                  <span className="text-[10px] font-mono uppercase text-cyan-400">{item.category}</span>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
                </div>

                <button
                  className={`w-full py-2 rounded-xl text-xs font-bold transition ${
                    item.active
                      ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      : 'bg-cyan-500 text-black hover:bg-cyan-400'
                  }`}
                >
                  {item.active ? 'Manage Connection' : 'Configure Integration'}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

