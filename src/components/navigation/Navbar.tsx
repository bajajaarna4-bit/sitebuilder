'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MultilingualVoiceGuide } from '@/components/guidance/MultilingualVoiceGuide';
import {
  Sparkles,
  LayoutGrid,
  Database,
  Cpu,
  Rocket,
  Sliders,
  CreditCard,
  Layers,
  ChevronRight,
  Menu,
  X,
  Search,
} from 'lucide-react';

interface NavLinkItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function NavigationBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links: NavLinkItem[] = [
    { href: '/dashboard', label: 'Workspaces', icon: LayoutGrid },
    { href: '/database', label: 'Database', icon: Database },
    { href: '/models', label: 'Models', icon: Cpu },
    { href: '/deployments', label: 'Deployments', icon: Rocket },
    { href: '/integrations', label: 'Integrations', icon: Layers },
    { href: '/billing', label: 'Usage', icon: CreditCard },
    { href: '/settings', label: 'Settings', icon: Sliders },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#090b0e]/80 backdrop-blur-xl border-b border-white/[0.06] transition-all">
      <div className="max-w-7xl mx-auto h-14 px-4 sm:px-6 flex items-center justify-between">
        {/* Brand & Left Navigation */}
        <div className="flex items-center space-x-6 lg:space-x-8">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center font-black text-white shadow-lg shadow-cyan-500/15 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-4 h-4 text-cyan-100" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                NEXUS AI
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase -mt-0.5">
                Studio 2.0
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 relative ${
                    isActive
                      ? 'text-cyan-300 bg-white/[0.06] shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-zinc-400'}`} />
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-3 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Status & Actions */}
        <div className="flex items-center space-x-3">
          {/* Multilingual Voice & Visual Guide Pill */}
          <MultilingualVoiceGuide />

          {/* Subtle Live Engine Pills */}
          <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300">Supabase Connected</span>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-200 active:scale-95"
          >
            <span>Launch Studio</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          {/* User Avatar */}
          <Link
            href="/settings"
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-white/[0.1] hover:border-cyan-500/50 flex items-center justify-center text-xs font-bold text-zinc-300 transition-colors"
          >
            NX
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#090b0e] p-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition ${
                  isActive ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-800/40' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
