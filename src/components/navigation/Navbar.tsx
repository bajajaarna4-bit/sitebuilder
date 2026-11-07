'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  LayoutGrid,
  Cpu,
  Rocket,
  Sliders,
  CreditCard,
  Layers,
  ChevronRight,
} from 'lucide-react';

export function NavigationBar() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { href: '/models', label: 'Model Control Center', icon: Cpu },
    { href: '/deployments', label: 'Deployments', icon: Rocket },
    { href: '/integrations', label: 'Integrations', icon: Layers },
    { href: '/billing', label: 'Usage & Quotas', icon: CreditCard },
    { href: '/settings', label: 'Settings', icon: Sliders },
  ];

  return (
    <nav className="h-14 border-b border-zinc-800/80 bg-surface-950/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-8">
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-black shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-wider text-white">NEXUS AI</span>
            <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase -mt-1">Autonomous Dev</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  isActive
                    ? 'bg-zinc-800/90 text-cyan-400 border border-zinc-700/60 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Link
          href="/dashboard"
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-lg transition shadow-md shadow-cyan-500/10"
        >
          <span>Open Studio</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300">
          NX
        </div>
      </div>
    </nav>
  );
}

