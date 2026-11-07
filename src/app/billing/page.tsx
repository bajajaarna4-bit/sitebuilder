'use client';

import React, { useState } from 'react';
import { NavigationBar } from '@/components/navigation/Navbar';
import { CreditCard, Check, Sparkles, Shield, Cpu, Users } from 'lucide-react';

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'team' | 'enterprise'>('pro');

  const plans = [
    {
      id: 'free',
      name: 'Free Starter',
      price: '$0',
      period: 'forever',
      description: 'Ideal for experimenting with autonomous AI software generation.',
      tokens: '500,000 tokens / mo',
      projects: '3 Active Projects',
      features: ['NEXUS Autonomous Core Engine', 'Monaco Code Editor', 'Live Browser Sandbox', 'Community Support'],
    },
    {
      id: 'pro',
      name: 'Pro Developer',
      price: '$39',
      period: 'per month',
      description: 'For founders, creators, and engineers shipping full applications.',
      tokens: '5,000,000 tokens / mo',
      projects: 'Unlimited Projects',
      popular: true,
      features: [
        'All 10 Specialized Autonomous Agents',
        'Google Gemini 2.5 Pro & Flash',
        'OpenAI GPT-4o & GPT-4o Mini',
        'Anthropic Claude 3.7 Sonnet',
        'Encrypted BYOK Key Vault',
        'Supabase Production DB Sync',
        'Direct ZIP Code Export',
      ],
    },
    {
      id: 'team',
      name: 'Team & Studio',
      price: '$129',
      period: 'per month',
      description: 'Collaborative development with multi-seat controls and shared environments.',
      tokens: '25,000,000 tokens / mo',
      projects: 'Unlimited Projects',
      features: [
        'Everything in Pro',
        '5 Team Member Seats',
        'Parallel Agent Orchestration',
        'Custom Domain Deployments',
        'Centralized Audit Logging',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'annually',
      description: 'Custom quotas, dedicated VPC sandboxing, and enterprise SLA.',
      tokens: 'Custom Token Allotments',
      projects: 'Unlimited Projects',
      features: [
        'Everything in Team',
        'Dedicated gVisor / Firecracker Execution',
        'SSO / SAML Authentication',
        '99.99% Uptime Guarantee',
        '24/7 Dedicated Solutions Engineer',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-surface-950 text-zinc-100 flex flex-col font-sans">
      <NavigationBar />

      <main className="max-w-6xl mx-auto px-6 py-10 w-full space-y-10 flex-1">
        <div className="border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Usage Quotas & Billing</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Predictable resource quotas and transparent token accounting for autonomous AI software engineering.
          </p>
        </div>

        {/* Current Usage Meter */}
        <section className="bg-surface-900/60 border border-zinc-800/80 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-400 font-medium">Monthly Active Tokens</span>
              <div className="text-2xl font-black text-white">482,100 / 5,000,000</div>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold px-2.5 py-1 rounded bg-cyan-950 border border-cyan-800">
              9.6% USED
            </span>
          </div>

          <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full w-[9.6%]" />
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>Cycle resets on Dec 1, 2026</span>
            <span>Current Plan: Pro Developer</span>
          </div>
        </section>

        {/* Plan Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {plans.map((p) => {
            const isSelected = selectedPlan === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPlan(p.id as any)}
                className={`bg-surface-900/70 border rounded-2xl p-6 flex flex-col justify-between transition cursor-pointer relative ${
                  isSelected
                    ? 'border-cyan-500 shadow-xl shadow-cyan-500/10'
                    : 'border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                    Recommended
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="font-extrabold text-base text-white">{p.name}</h3>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{p.description}</p>
                  </div>

                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-black text-white">{p.price}</span>
                    <span className="text-xs text-zinc-500">/{p.period}</span>
                  </div>

                  <div className="py-2 border-y border-zinc-800/80 text-xs font-mono text-cyan-400">
                    {p.tokens}
                  </div>

                  <div className="space-y-2">
                    {p.features.map((feat) => (
                      <div key={feat} className="flex items-center space-x-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 flex-none" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className={`mt-6 w-full py-2.5 rounded-xl font-bold text-xs transition ${
                    isSelected
                      ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {isSelected ? 'Active Plan' : 'Select Plan'}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

