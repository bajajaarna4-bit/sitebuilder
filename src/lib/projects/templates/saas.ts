export const saasTemplate = {
  name: 'NexusFlow — Modern AI SaaS Platform',
  category: 'Developer Tools & SaaS',
  description: 'Enterprise AI SaaS starter with landing page hero, feature matrix, pricing tiers, analytics dashboard, and API key management.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'nexusflow',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7', 'lucide-react': '^0.475.0' },
      },
      null,
      2
    ),
    '/src/App.tsx': `import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'settings'>('overview');

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between bg-zinc-900/60 backdrop-blur">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center font-bold text-black text-sm">
            NF
          </div>
          <span className="font-bold text-lg text-white">NexusFlow AI</span>
        </div>
        <div className="flex space-x-2 bg-zinc-900 p-1 rounded-lg border border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={\`px-3 py-1.5 rounded-md font-medium transition \${activeTab === 'overview' ? 'bg-cyan-500 text-black' : 'text-zinc-400 hover:text-white'}\`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={\`px-3 py-1.5 rounded-md font-medium transition \${activeTab === 'analytics' ? 'bg-cyan-500 text-black' : 'text-zinc-400 hover:text-white'}\`}
          >
            Metrics
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={\`px-3 py-1.5 rounded-md font-medium transition \${activeTab === 'settings' ? 'bg-cyan-500 text-black' : 'text-zinc-400 hover:text-white'}\`}
          >
            API Keys
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 space-y-2">
                <span className="text-xs text-zinc-400 font-medium">Monthly Active Requests</span>
                <div className="text-3xl font-black text-white">1,420,890</div>
                <span className="text-xs text-emerald-400 font-semibold">↑ +14.2% from last cycle</span>
              </div>
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 space-y-2">
                <span className="text-xs text-zinc-400 font-medium">Avg Inference Latency</span>
                <div className="text-3xl font-black text-white">184 ms</div>
                <span className="text-xs text-emerald-400 font-semibold">⚡ Top 1% globally</span>
              </div>
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 space-y-2">
                <span className="text-xs text-zinc-400 font-medium">Active Agent Tasks</span>
                <div className="text-3xl font-black text-white">28 Live</div>
                <span className="text-xs text-cyan-400 font-semibold">10 Specialized Roles</span>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-base font-bold text-white mb-2">Autonomous Workflow Status</h3>
              <p className="text-xs text-zinc-400 mb-4">Continuous integration and synthetic testing pipeline running smoothly.</p>
              <div className="space-y-3">
                {['Database Migration Synced', 'Frontend Route Bundles Verified', 'RLS Security Boundary Active'].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-zinc-800/60 text-xs">
                    <span className="text-zinc-300 font-medium">{item}</span>
                    <span className="text-emerald-400 font-mono">HEALTHY ✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center py-12">
            <h3 className="text-lg font-bold text-white mb-2">Real-Time Telemetry & Token Logs</h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">Tracking Gemini, Claude, and OpenAI token distributions across all 10 autonomous agent co-processors.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-xl mx-auto space-y-4">
            <h3 className="text-base font-bold text-white">API Credentials & Endpoints</h3>
            <p className="text-xs text-zinc-400">Manage developer tokens for external integrations.</p>
            <div className="space-y-2">
              <label className="text-xs text-zinc-300">Live Production Key</label>
              <input
                type="password"
                readOnly
                value="nx_live_9812487123984128937123"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-400 font-mono"
              />
            </div>
            <button className="px-4 py-2 bg-cyan-500 text-black font-bold text-xs rounded-lg hover:bg-cyan-400 transition">
              Roll Key
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
`,
    '/supabase/migrations/20261107_saas_schema.sql': `-- NexusFlow Schema
CREATE TABLE IF NOT EXISTS public.nexusflow_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_name TEXT NOT NULL,
    value NUMERIC(12, 4) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
`,
  },
};

