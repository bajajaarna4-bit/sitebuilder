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
  Sliders,
  Eye,
  Bot,
  FileCode,
  Rocket,
  Paintbrush,
  Sparkle,
  ShoppingBag,
  Film,
  Camera,
  Layout,
  Briefcase,
  X,
} from 'lucide-react';

export default function MarketingPage() {
  const router = useRouter();
  const [heroPrompt, setHeroPrompt] = useState('');
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [activePlan, setActivePlan] = useState<any>(null);

  // Core Example Chips specified by user:
  // "Grocery delivery app", "Movie streaming site", "Photo-sharing app", "SaaS landing page", "Portfolio"
  const EXAMPLE_CHIPS = [
    {
      label: 'Grocery delivery app',
      icon: '🛒',
      genre: 'Quick-Commerce (Blinkit-style)',
      prompt: 'Build a quick-commerce grocery delivery app with 10-minute delivery badges, category grids, fresh produce cards, and sticky cart drawer',
      template: 'blinkit-quick',
      palette: ['#10b981', '#064e3b', '#f59e0b', '#090b0e'],
      pages: ['/', '/categories', '/product/[id]', '/cart', '/checkout'],
      components: ['DeliveryBanner', 'CategoryGrid', 'ProductCard', 'StickyCart', 'QuickSearch'],
      models: ['products', 'categories', 'orders', 'delivery_slots'],
      font: 'Inter Display (8px grid)',
    },
    {
      label: 'Movie streaming site',
      icon: '🎬',
      genre: 'Cinematic Media (Netflix/Prime-style)',
      prompt: 'Build a cinematic movie streaming platform with 4K hero video trailer, horizontal genre carousels, hover video previews, and profile selector',
      template: 'google-ai-netflix',
      palette: ['#e50914', '#141414', '#221f1f', '#ffffff'],
      pages: ['/', '/browse', '/watch/[id]', '/my-list', '/profiles'],
      components: ['HeroVideoBanner', 'MovieRowCarousel', 'TrailerModal', 'ProfileSwitcher', 'WatchScrubber'],
      models: ['titles', 'episodes', 'genres', 'watch_history'],
      font: 'Plus Jakarta Sans + JetBrains Mono',
    },
    {
      label: 'Photo-sharing app',
      icon: '📸',
      genre: 'Social & Reels (Instagram-style)',
      prompt: 'Build a photo-sharing social application with top stories bar, image feed, interactive double-tap likes, comments modal, and profile grid',
      template: 'instagram-social',
      palette: ['#ec4899', '#8b5cf6', '#f43f5e', '#090b0e'],
      pages: ['/', '/explore', '/reels', '/messages', '/profile'],
      components: ['StoriesBar', 'PostCard', 'DoubleTapHeart', 'CommentsDrawer', 'UserGrid'],
      models: ['posts', 'stories', 'comments', 'likes', 'followers'],
      font: 'Inter + SF Pro Rounded',
    },
    {
      label: 'SaaS landing page',
      icon: '🚀',
      genre: 'Developer SaaS (Linear/Vercel-style)',
      prompt: 'Build a high-conversion modern dark-mode SaaS landing page with animated feature bento grid, pricing toggle, testimonial carousel, and live interactive demo',
      template: 'nextjs-saas',
      palette: ['#06b6d4', '#3b82f6', '#10b981', '#090b0e'],
      pages: ['/', '/pricing', '/features', '/docs', '/auth'],
      components: ['HeroGradient', 'BentoGrid', 'PricingCards', 'InteractiveTerminal', 'AuthModal'],
      models: ['users', 'subscriptions', 'api_keys', 'organizations'],
      font: 'Geist / JetBrains Mono (8px grid)',
    },
    {
      label: 'Portfolio',
      icon: '💼',
      genre: 'AI Systems Architect (SAAI.PRO-style)',
      prompt: 'Build an AI systems architect laboratory portfolio with Multi-LLM Parliament 6-shard cognitive debate model, AIT Kronos time series SVG chart, and dynamical latent field',
      template: 'saai-pro',
      palette: ['#38bdf8', '#818cf8', '#34d399', '#090b0e'],
      pages: ['/', '/parliament', '/research', '/models', '/contact'],
      components: ['ArchitectHero', 'MultiLLMParliament', 'KronosChart', 'PaperViewer', 'TerminalDock'],
      models: ['research_papers', 'benchmarks', 'neural_weights', 'system_logs'],
      font: 'Space Grotesk + Fira Code',
    },
  ];

  // Open Plan Approval Modal before building
  const handleOpenPlanForPrompt = (promptText: string, chip?: any) => {
    const p = promptText.trim() || 'Build a modern web application';
    const matchedChip = chip || EXAMPLE_CHIPS.find((c) => p.toLowerCase().includes(c.label.toLowerCase())) || EXAMPLE_CHIPS[0];

    setActivePlan({
      prompt: p,
      genre: matchedChip.genre,
      template: matchedChip.template,
      pages: matchedChip.pages,
      components: matchedChip.components,
      palette: matchedChip.palette,
      models: matchedChip.models,
      font: matchedChip.font,
      features: [
        'Responsive layout (Desktop 1440px, Tablet 768px, Mobile 375px)',
        'Human-crafted typography & 8px spacing hierarchy',
        'Realistic production copy (Zero "Lorem ipsum" or generic placeholders)',
        'Full-stack PostgreSQL / Supabase schema & REST API handlers',
        'Lovable-style surgical click-to-edit visual inspector',
        'Automated multi-agent QA testing and self-healing runtime',
      ],
    });
    setShowPlanModal(true);
  };

  const handleApproveAndLaunch = () => {
    if (!activePlan) return;
    const projId = `proj_${Date.now()}`;
    const url = `/studio/${projId}?template=${activePlan.template}&prompt=${encodeURIComponent(activePlan.prompt)}`;
    router.push(url);
  };

  const handleDirectLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPrompt = heroPrompt.trim() || EXAMPLE_CHIPS[0].prompt;
    handleOpenPlanForPrompt(finalPrompt);
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

      {/* ================= HERO SECTION ================= */}
      <section className="relative z-10 px-6 pt-24 pb-16 max-w-5xl mx-auto text-center space-y-8">
        {/* Brand Tag: Suggested Name "Verve AI" (SiteForge AI evolution) */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300 shadow-sm backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-white font-bold tracking-wide">VERVE AI</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-400">Lovable × Google AI Studio × Emergent × Antigravity</span>
        </div>

        {/* Primary Editorial Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Describe your application.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              AI agents build it live.
            </span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
            Generate complete, premium, human-looking full-stack websites with live preview, agentic planning, and instant surgical edits.
          </p>
        </div>

        {/* Central Intelligent Prompt Box */}
        <div className="max-w-3xl mx-auto pt-2">
          <form
            onSubmit={handleDirectLaunch}
            className="relative bg-zinc-950/90 border border-white/[0.1] hover:border-cyan-500/40 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 rounded-2xl p-2.5 shadow-2xl backdrop-blur-xl transition-all duration-200"
          >
            <div className="flex items-center px-3 pt-2 pb-1 space-x-2 text-zinc-500 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Step 1: Describe the site or app you want to build...</span>
            </div>

            <textarea
              rows={3}
              value={heroPrompt}
              onChange={(e) => setHeroPrompt(e.target.value)}
              placeholder="e.g. Build a quick-commerce grocery app with 10-minute delivery badges, category grids, fresh produce cards, and sticky cart drawer..."
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 px-3 py-1.5 focus:outline-none resize-none font-medium leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06] px-2">
              <div className="flex items-center space-x-2 text-[11px] font-mono text-zinc-500">
                <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">Next.js 15</span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">React 19</span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">Supabase</span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">Claude 3.5</span>
              </div>

              <div className="flex items-center space-x-2">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-zinc-400 hover:text-white text-xs font-semibold rounded-xl hover:bg-white/[0.04] transition"
                >
                  Workspaces
                </Link>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl transition-all duration-150 flex items-center space-x-2 shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  <span>Review Plan &amp; Build</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>

          {/* Example Chips Required by User */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <span className="text-[11px] text-zinc-500 font-mono">Example inspirations:</span>
            {EXAMPLE_CHIPS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => handleOpenPlanForPrompt(chip.prompt, chip)}
                className="px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-cyan-500/40 text-xs text-zinc-300 hover:text-white transition-all duration-150 flex items-center space-x-1.5 shadow-sm active:scale-95"
              >
                <span>{chip.icon}</span>
                <span className="font-medium">{chip.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= THE 4 ARCHITECTURAL PILLARS ================= */}
      <section className="relative z-10 py-12 max-w-6xl mx-auto px-6 w-full space-y-6">
        <div className="text-center space-y-1.5 max-w-xl mx-auto">
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400">System Architecture</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Four Breakthrough Paradigms in One Platform
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/[0.08] hover:border-pink-500/40 transition space-y-3">
            <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center text-lg">
              ❤️
            </div>
            <h4 className="font-extrabold text-sm text-white">Lovable Paradigm</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Chat-to-app with live split-screen preview. Visual click-to-edit inspector and instant surgical updates without full page reloads.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/[0.08] hover:border-blue-500/40 transition space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center text-lg">
              🧠
            </div>
            <h4 className="font-extrabold text-sm text-white">Google AI Studio Controls</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Model selection (Claude 3.5 Sonnet, Gemini 2.5 Pro, GPT-4o), system instruction prompts, temperature sliders, and token metering.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/[0.08] hover:border-amber-500/40 transition space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center text-lg">
              ⚡
            </div>
            <h4 className="font-extrabold text-sm text-white">Emergent Full-Stack</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Frontend, backend API routes, PostgreSQL / Supabase schemas, DDL migrations, and auth generated synchronously from a single prompt.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/[0.08] hover:border-emerald-500/40 transition space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-lg">
              🛸
            </div>
            <h4 className="font-extrabold text-sm text-white">Antigravity Multi-Agent</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Autonomous swarm (Planner, Designer, Frontend, Backend, QA, Reviewer) visible in real-time task stream with self-repairing runtime.
            </p>
          </div>
        </div>
      </section>

      {/* ================= GENRE-AWARE TEMPLATE GALLERY ================= */}
      <section className="relative z-10 py-12 max-w-6xl mx-auto px-6 w-full space-y-8 border-t border-white/[0.06]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400">Design Quality Rules</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Hand-Crafted Agency Polish, Not Generic AI
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Genre-aware UX patterns, authentic copy (no &quot;Lorem ipsum&quot;), 8px typographic hierarchy, and original branding.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition flex items-center space-x-1"
          >
            <span>View All Workspaces →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXAMPLE_CHIPS.map((card) => (
            <div
              key={card.label}
              className="p-5 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-cyan-500/40 transition flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{card.icon}</span>
                    <span className="font-extrabold text-sm text-white">{card.label}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-zinc-400">
                    Verified Genre
                  </span>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {card.prompt}
                </p>

                {/* Color Palette Swatches */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500">Design Palette:</span>
                  <div className="flex items-center space-x-1.5">
                    {card.palette.map((color) => (
                      <span
                        key={color}
                        className="w-5 h-5 rounded-md border border-white/20 shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                    <span className="text-[10px] font-mono text-zinc-400 pl-2">{card.font}</span>
                  </div>
                </div>

                {/* Pages & Models */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {card.pages.map((page) => (
                    <span
                      key={page}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-white/[0.06] text-cyan-300"
                    >
                      {page}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPlanForPrompt(card.prompt, card)}
                className="w-full py-2 bg-white/[0.04] hover:bg-cyan-500 hover:text-black text-white font-extrabold text-xs rounded-xl transition-all border border-white/[0.08] hover:border-cyan-400 flex items-center justify-center space-x-1.5 active:scale-95"
              >
                <span>Preview Plan &amp; Launch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= STEP 2: INTERACTIVE PLAN APPROVAL MODAL ================= */}
      {showPlanModal && activePlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-[#0b0e14] border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPlanModal(false)}
              className="absolute top-5 right-5 text-zinc-500 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Plan Header */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-cyan-500/30">
                  Step 2: Architecture Plan Approval
                </span>
                <span className="text-xs text-zinc-500 font-mono">Antigravity Planner Agent</span>
              </div>
              <h3 className="text-xl font-black text-white tracking-tight">
                Review &amp; Approve Specification
              </h3>
              <p className="text-xs text-zinc-400">
                The Planner Agent has synthesized your request into pages, design tokens, components, and data models before coding.
              </p>
            </div>

            {/* Prompt Recall */}
            <div className="p-3 rounded-xl bg-zinc-950 border border-white/[0.08] text-xs text-cyan-200 font-mono">
              &quot;{activePlan.prompt}&quot;
            </div>

            {/* Pages & Sitemap */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 flex items-center space-x-1.5">
                <Layout className="w-3.5 h-3.5 text-cyan-400" />
                <span>1. Pages &amp; Sitemap</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {activePlan.pages.map((p: string) => (
                  <span
                    key={p}
                    className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Components Matrix */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 flex items-center space-x-1.5">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span>2. Reusable Component Tree</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {activePlan.components.map((c: string) => (
                  <span
                    key={c}
                    className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-300"
                  >
                    &lt;{c} /&gt;
                  </span>
                ))}
              </div>
            </div>

            {/* Design System & Typography */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 flex items-center space-x-1.5">
                  <Paintbrush className="w-3.5 h-3.5 text-pink-400" />
                  <span>3. Color Palette Tokens</span>
                </label>
                <div className="flex items-center space-x-2">
                  {activePlan.palette.map((color: string) => (
                    <div key={color} className="flex flex-col items-center space-x-1">
                      <span
                        className="w-8 h-8 rounded-lg border border-white/20 shadow-md"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-[10px] font-mono text-zinc-500 pt-1">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 flex items-center space-x-1.5">
                  <Database className="w-3.5 h-3.5 text-amber-400" />
                  <span>4. PostgreSQL Database Schema</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {activePlan.models.map((m: string) => (
                    <span
                      key={m}
                      className="px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono text-amber-300"
                    >
                      public.{m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Acceptance Criteria */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>5. Verified Feature Acceptance Criteria</span>
              </label>
              <div className="space-y-1 text-xs text-zinc-400">
                {activePlan.features.map((feat: string) => (
                  <div key={feat} className="flex items-center space-x-2">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setShowPlanModal(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition"
              >
                Edit Instruction
              </button>
              <button
                type="button"
                onClick={handleApproveAndLaunch}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition active:scale-95 flex items-center space-x-2"
              >
                <span>Approve Plan &amp; Launch Swarm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clean Footer */}
      <footer className="mt-auto border-t border-white/[0.06] py-8 px-6 text-center text-xs text-zinc-500 font-mono flex flex-wrap items-center justify-between max-w-6xl mx-auto w-full">
        <p>VERVE AI (SiteForge Engine) • Lovable × Google AI Studio × Emergent × Antigravity</p>
        <p>Next.js 15 • React 19 • Tailwind CSS • Supabase • Claude 3.5 Sonnet</p>
      </footer>
    </div>
  );
}
