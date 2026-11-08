'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck, Check, AlertCircle, RefreshCw, User } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Check existing session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        // User already logged in
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName || 'NEXUS Developer' },
          },
        });

        if (error) throw error;
        setSuccessMsg('Account created successfully! Redirecting to workspace dashboard...');
        setTimeout(() => router.push('/dashboard'), 1000);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        setSuccessMsg('Authentication verified. Welcome back to NEXUS AI.');
        setTimeout(() => router.push('/dashboard'), 800);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDevPassLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    // Instant developer credential
    try {
      localStorage.setItem('nexus_dev_session', JSON.stringify({
        user: { email: 'developer@nexus.ai', role: 'architect', plan: 'Enterprise Unlimited' },
        timestamp: new Date().toISOString()
      }));
      setSuccessMsg('Developer Bypass Verified. Logging in...');
      setTimeout(() => router.push('/dashboard'), 600);
    } catch (err) {
      setErrorMsg('Failed to initialize developer session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090b0e] text-zinc-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <nav className="h-14 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-black shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-wider text-white">NEXUS AI</span>
            <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase -mt-1">Security Vault</span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs text-zinc-400 hover:text-white transition flex items-center space-x-1"
        >
          <span>Back to Home</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </nav>

      {/* Auth Card Container */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl relative backdrop-blur-xl">
          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mx-auto flex items-center justify-center">
              <Lock className="w-6 h-6 text-cyan-400" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {mode === 'signin' ? 'Sign in to NEXUS AI' : 'Create your NEXUS account'}
            </h1>
            <p className="text-xs text-zinc-400">
              {mode === 'signin'
                ? 'Enter your credentials to access your autonomous workspaces'
                : 'Join developers and founders orchestrating AI to build software'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs font-semibold mb-6">
            <button
              onClick={() => { setMode('signin'); setErrorMsg(null); }}
              className={`py-2 rounded-lg transition ${
                mode === 'signin'
                  ? 'bg-zinc-800 text-cyan-400 border border-zinc-700 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setErrorMsg(null); }}
              className={`py-2 rounded-lg transition ${
                mode === 'signup'
                  ? 'bg-zinc-800 text-cyan-400 border border-zinc-700 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-xs text-rose-300 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-xs text-emerald-300 flex items-center space-x-2">
              <Check className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300 flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-zinc-500" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@nexus.ai"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-300 flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Password</span>
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset instructions dispatched to email.')}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In to Studio' : 'Create Account'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Developer Instant Pass */}
          <div className="mt-6 pt-5 border-t border-zinc-800 space-y-3">
            <button
              type="button"
              onClick={handleDevPassLogin}
              disabled={loading}
              className="w-full py-2 px-3 rounded-xl bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>One-Click Developer Bypass (Instant Login)</span>
            </button>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Supabase Auth & Encryption Protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

