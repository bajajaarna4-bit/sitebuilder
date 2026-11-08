'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  Database,
  Workflow,
  Zap,
} from 'lucide-react';

export default function MarketingPage() {
  const router = useRouter();
  const [heroPrompt, setHeroPrompt] = useState('');

  const PROMPT_SUGGESTIONS = [
    { label: 'Google AI & Netflix Cinema', prompt: 'Build a premium Google AI Studio and Netflix Cinema streaming platform with 4K video playback, category carousels, and multilingual voice' },
    { label: 'Subway Surfers 3D Runner', prompt: 'Build a premium Subway Surfers 3D endless runner game with real-time controls' },
    { label: 'Uber + Rapido + Ola Transit', prompt: 'Build OmniRide unified ride-hailing with bike taxi, auto, and sedan fare compare' },
    { label: 'WhatsApp Web Messaging', prompt: 'Build WhatsApp Web clone with real-time chats, audio notes, and video calls' },
    { label: 'Claude 3.5 Sonnet Studio', prompt: 'Build an interactive Claude AI workspace with side-by-side Artifacts preview' },
    { label: 'Canva Design Studio', prompt: 'Build a Canva graphic design editor with artboards, text shapes, and export' },
    { label: 'Ubuntu 24.04 LTS OS', prompt: 'Build an Ubuntu Linux desktop simulator with Bash terminal and Neofetch' },
  ];

  const handleLaunchPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPrompt = heroPrompt.trim() || 'Build a premium Subway Surfers 3D endless runner game with real-time controls';
    const projId = `proj_${Date.now()}`;
    router.push(`/studio/${projId}?prompt=${encodeURIComponent(finalPrompt)}`);
  };

  const handleSelectSuggestion = (p: string) => {
    const projId = `proj_${Date.now()}`;
    router.push(`/studio/${projId}?prompt=${encodeURIComponent(p)}`);
  };

  return (
    <div className="min-h-screen bg-[#07090d] text-zinc-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200 overflow-x-hidden">
      <NavigationBar />

      {/* Atmospheric Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-[140px]" />
        <div className="absolute top-[600px] -left-48 w-96 h-96 bg-indigo-500/5 blur-[120px]" />
        <div className="absolute top-[800px] -right-48 w-96 h-96 bg-cyan-500/5 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-24 pb-20 max-w-5xl mx-auto text-center space-y-8">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-300 shadow-sm backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-zinc-200 font-semibold tracking-wide">NEXUS AI 2.0</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-400">Autonomous Multi-Agent Engine</span>
        </div>

        {/* Primary Editorial Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Your imagination.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Our intelligence.
            </span>{' '}
            Infinite possibilities.
          </h1>

          <p className="text-zinc-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
            Build stunning websites and powerful applications by simply describing your ideas.
          </p>
        </div>

        {/* Central Intelligent Prompt Composer */}
        <div className="max-w-2xl mx-auto pt-2">
          <form
            onSubmit={handleLaunchPrompt}
            className="relative bg-zinc-950/90 border border-white/[0.1] hover:border-cyan-500/40 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 rounded-2xl p-2 shadow-2xl backdrop-blur-xl transition-all duration-200"
          >
            <div className="flex items-center px-3 pt-2 pb-1 space-x-2 text-zinc-500 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Describe the application you envision...</span>
            </div>

            <textarea
              rows={2}
              value={heroPrompt}
              onChange={(e) => setHeroPrompt(e.target.value)}
              placeholder="e.g. Build a real-time Subway Surfers 3D endless runner game with gold coins and speed trains..."
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 px-3 py-1.5 focus:outline-none resize-none font-medium leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06] px-2">
              <div className="flex items-center space-x-2 text-[11px] font-mono text-zinc-500">
                <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">Next.js 15</span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">React 19</span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">Supabase</span>
              </div>

              <div className="flex items-center space-x-2">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-zinc-400 hover:text-white text-xs font-semibold rounded-xl hover:bg-white/[0.04] transition"
                >
                  Explore the Workspace
                </Link>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl transition-all duration-150 flex items-center space-x-2 shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  <span>Start Building</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>

          {/* Quick Prompt Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <span className="text-[11px] text-zinc-500 font-mono">Preset inspirations:</span>
            {PROMPT_SUGGESTIONS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleSelectSuggestion(item.prompt)}
                className="px-3 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-cyan-500/40 text-xs text-zinc-300 hover:text-white transition-all duration-150 flex items-center space-x-1"
              >
                <span>⚡</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Studio Mockup (High-End Frame) */}
        <div className="pt-10 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-white/[0.1] bg-zinc-950/80 shadow-2xl shadow-cyan-500/5 overflow-hidden backdrop-blur-md">
            {/* Window Chrome Header */}
            <div className="px-4 py-3 bg-zinc-900/60 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-zinc-400 pl-2">nexus-studio-workspace • live execution</span>
              </div>
              <div className="flex items-center space-x-3 text-xs font-mono text-zinc-400">
                <span className="text-emerald-400">● 10 Agents Active</span>
                <span className="text-zinc-600">|</span>
                <span>Port 3000 Ready</span>
              </div>
            </div>

            {/* Simulated Side-by-Side Studio Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/[0.06] min-h-[380px]">
              {/* Left VFS File Tree & Agent Stream */}
              <div className="md:col-span-4 p-5 text-left space-y-4 bg-zinc-950/40">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-white/[0.06] pb-2">
                  <span>AUTONOMOUS PIPELINE</span>
                  <span className="text-cyan-400 font-bold">100% VERIFIED</span>
                </div>
                <div className="space-y-2.5 font-mono text-xs">
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">Product Specification Ingested</span>
                  </div>
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">React 19 Interactive State Compiled</span>
                  </div>
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">PostgreSQL / Supabase Schema Synced</span>
                  </div>
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">Zero Console Exceptions Confirmed</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-1.5">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Live VFS Artifact</div>
                  <div className="bg-zinc-900/90 rounded-xl p-3 border border-white/[0.06] text-[11px] font-mono text-cyan-300">
                    &lt;App /&gt; mounted with 60FPS loop
                  </div>
                </div>
              </div>

              {/* Right Live Application Interactive Preview & Cinematic Video Showcase */}
              <div className="md:col-span-8 p-4 md:p-6 text-left flex flex-col justify-between bg-[#07090e]">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span className="text-xs font-black text-white tracking-wider uppercase">STREAMFLIX • 4K AI Showcase</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-[10px] font-mono font-bold">
                      LIVE STREAM
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">60 FPS</span>
                  </div>
                </div>

                {/* Embedded Auto-Playing Cinematic Video Reel with Live Controls */}
                <div className="relative my-3 rounded-xl overflow-hidden bg-black border border-white/[0.08] shadow-2xl group aspect-video flex items-center justify-center">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                  {/* Floating Cinematic Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div className="space-y-0.5">
                      <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[9px] font-black uppercase tracking-wider">
                        Google AI Original
                      </span>
                      <h4 className="text-sm font-black text-white drop-shadow">DeepMind: Synthetic Consciousness</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-white text-[11px] font-mono font-bold">
                      ▶ 4K HDR
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-400">● 100% Zero-Latency Render</span>
                  </div>
                  <Link
                    href="/studio/proj_cinema_01?prompt=Build%20a%20premium%20Google%20AI%20Studio%20and%20Netflix%20Cinema%20streaming%20platform"
                    className="text-cyan-400 hover:text-cyan-300 font-bold transition flex items-center space-x-1"
                  >
                    <span>Launch Full Cinema Suite →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connected 8-Stage Autonomous Lifecycle */}
      <section className="relative z-10 py-16 border-t border-white/[0.06] max-w-6xl mx-auto px-6 w-full space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            The Autonomous Engineering Engine
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Continuous orchestrated execution from natural language idea to production deployment.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {[
            { step: '01', title: 'IDEA', desc: 'Natural Prompt' },
            { step: '02', title: 'PLAN', desc: 'Acceptance Spec' },
            { step: '03', title: 'DESIGN', desc: 'Design Tokens' },
            { step: '04', title: 'CODE', desc: 'React 19 & TS' },
            { step: '05', title: 'EXECUTE', desc: 'VFS Sandbox' },
            { step: '06', title: 'TEST', desc: 'DOM Assertions' },
            { step: '07', title: 'DEBUG', desc: 'Zero Errors' },
            { step: '08', title: 'DEPLOY', desc: 'Live Hosting' },
          ].map((item) => (
            <div
              key={item.step}
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/40 transition-colors flex flex-col justify-between space-y-2 text-center"
            >
              <span className="text-[10px] font-mono font-bold text-cyan-400">{item.step}</span>
              <div className="font-extrabold text-xs text-white tracking-wider">{item.title}</div>
              <div className="text-[10px] text-zinc-500 line-clamp-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="mt-auto border-t border-white/[0.06] py-8 px-6 text-center text-xs text-zinc-500 font-mono">
        <p>NEXUS AI Platform • Production-Grade Autonomous Software Engineering</p>
      </footer>
    </div>
  );
}
