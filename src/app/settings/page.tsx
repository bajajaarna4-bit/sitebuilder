'use client';

import React, { useState } from 'react';
import { NavigationBar } from '@/components/navigation/Navbar';
import { Sliders, Shield, Terminal, Key, Lock, Check } from 'lucide-react';

export default function SettingsPage() {
  const [autoFix, setAutoFix] = useState(true);
  const [strictTesting, setStrictTesting] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-surface-950 text-zinc-100 flex flex-col font-sans">
      <NavigationBar />

      <main className="max-w-4xl mx-auto px-6 py-10 w-full space-y-8 flex-1">
        <div className="border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Platform & Account Settings</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Configure autonomous agent execution thresholds, security boundaries, and preferences.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Agent Automation Policy */}
          <div className="bg-surface-900/60 border border-zinc-800/80 rounded-2xl p-6 space-y-5">
            <h2 className="text-base font-bold text-white">Autonomous Agent Execution Policy</h2>

            <div className="flex items-center justify-between py-2 border-b border-zinc-800/60">
              <div>
                <h4 className="text-xs font-semibold text-white">Automated Error Diagnostics (Auto-Fix)</h4>
                <p className="text-[11px] text-zinc-400">
                  Allow Debugging Engineer agent to automatically inspect and patch runtime hydration errors.
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoFix}
                onChange={(e) => setAutoFix(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-surface-950 border-zinc-700"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="text-xs font-semibold text-white">Strict Synthetic Test Gate</h4>
                <p className="text-[11px] text-zinc-400">
                  Require Testing Engineer agent to pass 100% of DOM assertions before marking a build READY.
                </p>
              </div>
              <input
                type="checkbox"
                checked={strictTesting}
                onChange={(e) => setStrictTesting(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-surface-950 border-zinc-700"
              />
            </div>
          </div>

          {/* Security & Secrets Guard */}
          <div className="bg-surface-900/60 border border-zinc-800/80 rounded-2xl p-6 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Security & Sandbox Guard</span>
            </h2>
            <div className="text-xs text-zinc-400 space-y-1">
              <div>• Host Isolation: Main application server never executes generated project code.</div>
              <div>• Client-Side Sandboxing: Previews run in sandboxed iframes with origin restrictions.</div>
              <div>• Secret Encryption: Server-side master key envelope encryption (AES-256-GCM).</div>
              <div>• PostgreSQL Kernel RLS: All project files and runs are isolated per tenant.</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {saved && <span className="text-xs text-emerald-400 font-semibold">Settings saved successfully ✓</span>}
            <button
              type="submit"
              className="ml-auto px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs rounded-xl transition shadow-lg shadow-cyan-500/20"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

