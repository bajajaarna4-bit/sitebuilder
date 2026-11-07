'use client';

import React from 'react';
import Link from 'next/link';
import { NavigationBar } from '@/components/navigation/Navbar';
import {
  Sparkles,
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Play,
  Monitor,
  Smartphone,
  Tablet,
  Check,
} from 'lucide-react';

export default function MarketingPage() {
  const lifecycleSteps = [
    { title: 'IDEA', desc: 'Natural language prompt' },
    { title: 'PLAN', desc: 'Spec & acceptance criteria' },
    { title: 'DESIGN', desc: 'Theme & responsive tokens' },
    { title: 'CODE', desc: 'React 19 & TypeScript' },
    { title: 'EXECUTE', desc: 'Isolated sandbox runner' },
    { title: 'TEST', desc: 'DOM assertion checks' },
    { title: 'DEBUG', desc: 'Zero runtime exceptions' },
    { title: 'DEPLOY', desc: 'Production live hosting' },
  ];

  const agentRoles = [
    { name: 'Product Planner', role: 'Architects specifications and pages' },
    { name: 'UI/UX Designer', role: 'Synthesizes layouts & color tokens' },
    { name: 'Frontend Developer', role: 'Builds interactive React components' },
    { name: 'Backend Developer', role: 'Engineers APIs and data handlers' },
    { name: 'Database Engineer', role: 'Creates PostgreSQL & RLS schemas' },
    { name: 'Debugging Engineer', role: 'Diagnoses runtime errors & traces' },
    { name: 'Testing Engineer', role: 'Validates viewport DOM assertions' },
    { name: 'Security Engineer', role: 'Guards sandboxes & client boundaries' },
    { name: 'Performance Engineer', role: 'Optimizes latency & layout shifts' },
    { name: 'Deployment Engineer', role: 'Publishes production build artifacts' },
  ];

  const showcaseTemplates = [
    { name: 'Netflix Clone', prompt: 'Build a premium Netflix-like streaming platform', cat: 'Media Streaming' },
    { name: 'Instagram Social', prompt: 'Create a full Instagram-style social application', cat: 'Social Platform' },
    { name: 'Amazon E-Commerce', prompt: 'Build a modern Amazon-style e-commerce store', cat: 'E-Commerce' },
    { name: 'YouTube Video App', prompt: 'Create a YouTube-style video-sharing application', cat: 'Video & Community' },
    { name: 'Blinkit Quick-Commerce', prompt: 'Build a Blinkit-style quick-commerce application', cat: '10-Min Delivery' },
  ];

  return (
    <div className="min-h-screen bg-surface-950 text-zinc-100 flex flex-col font-sans">
      <NavigationBar />

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-16 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AUTONOMOUS MULTI-AGENT PLATFORM 2.0</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
          From an idea to a fully functional application.{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
            Designed, developed, tested, and deployed by AI.
          </span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          NEXUS AI orchestrates 10 specialized autonomous AI agents to turn natural language instructions into real full-stack web applications with live preview, Monaco code editing, and database generation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm rounded-xl transition flex items-center justify-center space-x-2 shadow-xl shadow-cyan-500/20"
          >
            <span>Launch NEXUS Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/models"
            className="w-full sm:w-auto px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-sm rounded-xl transition border border-zinc-800 flex items-center justify-center space-x-2"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Model Control Center</span>
          </Link>
        </div>

        {/* 8-Stage Lifecycle Visualization */}
        <div className="pt-12">
          <div className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase mb-4">
            Autonomous Engineering Lifecycle
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 bg-surface-900/60 p-3 rounded-2xl border border-zinc-800/80 backdrop-blur">
            {lifecycleSteps.map((step, idx) => (
              <div
                key={step.title}
                className="p-3 bg-surface-950/80 border border-zinc-800/60 rounded-xl flex flex-col items-center justify-center text-center space-y-1 hover:border-cyan-500/40 transition"
              >
                <span className="text-[10px] font-mono font-bold text-cyan-400">{`0${idx + 1}`}</span>
                <span className="font-extrabold text-xs text-white tracking-wider">{step.title}</span>
                <span className="text-[10px] text-zinc-400 line-clamp-1">{step.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Quick Prompts Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Full-Stack Generation Presets</h2>
            <p className="text-zinc-400 text-sm mt-1">
              Select any real-world architecture to explore the full autonomous build workflow.
            </p>
          </div>
          <Link href="/dashboard" className="text-xs text-cyan-400 hover:text-cyan-300 font-mono mt-2 md:mt-0">
            View All Templates →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {showcaseTemplates.map((t) => (
            <div
              key={t.name}
              className="bg-surface-900/70 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 transition group"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-zinc-800 text-cyan-300 border border-zinc-700">
                  {t.cat}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition">{t.name}</h3>
                <p className="text-xs text-zinc-400 italic">"{t.prompt}"</p>
              </div>
              <Link
                href={`/dashboard?prompt=${encodeURIComponent(t.prompt)}`}
                className="mt-6 flex items-center justify-between text-xs font-bold text-zinc-300 group-hover:text-white pt-4 border-t border-zinc-800/60"
              >
                <span>Build with NEXUS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 10 Specialized Agents Grid */}
      <section className="px-6 py-16 bg-surface-900/30 border-y border-zinc-800/80">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              10 Specialized Autonomous Agents
            </h2>
            <p className="text-zinc-400 text-sm">
              Each phase is executed by an autonomous co-processor with its own tools, context, and verification criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {agentRoles.map((agent, i) => (
              <div
                key={agent.name}
                className="bg-surface-950/80 border border-zinc-800/80 rounded-xl p-4 space-y-2 hover:border-zinc-700 transition"
              >
                <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-mono font-bold text-cyan-400">
                  {i + 1}
                </div>
                <h4 className="font-bold text-xs text-white">{agent.name}</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{agent.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-800/80 py-8 px-6 text-center text-xs text-zinc-500 font-mono">
        <p>NEXUS AI Platform • Production-Grade Autonomous Software Engineering</p>
      </footer>
    </div>
  );
}

