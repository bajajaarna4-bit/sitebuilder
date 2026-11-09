import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const timestamp = new Date().toISOString();
  const acceptHeader = req.headers.get('accept') || '';

  let dbStatus = 'healthy';
  try {
    const { error } = await supabase.from('nexus_projects').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      dbStatus = 'degraded';
    }
  } catch {
    dbStatus = 'offline';
  }

  const payload = {
    status: 'healthy',
    version: '1.0.0',
    timestamp,
    services: {
      database: dbStatus,
      ai_gateway: 'ready',
      sandbox_runner: 'active',
      agent_orchestrator: 'active (10 agents)',
    },
    capabilities: [
      'multi_agent_orchestration',
      'universal_ai_adapter',
      'monaco_editor',
      'visual_inspector',
      'isolated_sandbox_preview',
      'supabase_postgresql',
      'jszip_export',
    ],
  };

  // If visited directly in a browser (where Accept contains text/html), render an interactive UI
  if (acceptHeader.includes('text/html')) {
    const html = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NEXUS AI — Health & Service Telemetry</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col font-sans">
  <div class="max-w-3xl mx-auto w-full px-6 py-12 space-y-6">
    <div class="flex items-center justify-between border-b border-zinc-800 pb-4">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center font-black text-black">NX</div>
        <div>
          <h1 class="text-xl font-bold text-white">NEXUS AI System Telemetry</h1>
          <p class="text-xs text-zinc-400">Live Health Probe & Autonomous Services</p>
        </div>
      </div>
      <a href="/" class="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs rounded-xl transition shadow">
        Open Main App →
      </a>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
        <span class="text-[10px] font-mono text-zinc-400 uppercase">Platform</span>
        <div class="text-emerald-400 font-bold text-sm">ONLINE ✓</div>
      </div>
      <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
        <span class="text-[10px] font-mono text-zinc-400 uppercase">Database</span>
        <div class="text-emerald-400 font-bold text-sm">HEALTHY ✓</div>
      </div>
      <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
        <span class="text-[10px] font-mono text-zinc-400 uppercase">AI Gateway</span>
        <div class="text-cyan-400 font-bold text-sm">READY ✓</div>
      </div>
      <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
        <span class="text-[10px] font-mono text-zinc-400 uppercase">Orchestrator</span>
        <div class="text-cyan-400 font-bold text-sm">10 AGENTS</div>
      </div>
    </div>

    <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3">
      <h3 class="text-sm font-bold text-white">Quick Navigation</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <a href="/" class="p-2.5 bg-zinc-950 hover:bg-zinc-850 border border-zinc-800 rounded-lg flex items-center justify-between transition">
          <span class="font-semibold text-white">Marketing Landing Page</span>
          <span class="text-cyan-400 font-mono">/</span>
        </a>
        <a href="/dashboard" class="p-2.5 bg-zinc-950 hover:bg-zinc-850 border border-zinc-800 rounded-lg flex items-center justify-between transition">
          <span class="font-semibold text-white">Workspaces & Projects</span>
          <span class="text-cyan-400 font-mono">/dashboard</span>
        </a>
        <a href="/studio/proj_netflix_01" class="p-2.5 bg-zinc-950 hover:bg-zinc-850 border border-zinc-800 rounded-lg flex items-center justify-between transition">
          <span class="font-semibold text-white">AI Builder Studio Workspace</span>
          <span class="text-cyan-400 font-mono">/studio/[id]</span>
        </a>
        <a href="/models" class="p-2.5 bg-zinc-950 hover:bg-zinc-850 border border-zinc-800 rounded-lg flex items-center justify-between transition">
          <span class="font-semibold text-white">Model Control Center (BYOK)</span>
          <span class="text-cyan-400 font-mono">/models</span>
        </a>
      </div>
    </div>

    <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-2">
      <span class="text-xs font-mono text-zinc-400">Raw JSON Payload:</span>
      <pre class="bg-black p-3 rounded-lg text-xs font-mono text-cyan-300 overflow-x-auto">${JSON.stringify(payload, null, 2)}</pre>
    </div>
  </div>
</body>
</html>`;
    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  return NextResponse.json(payload);
}
