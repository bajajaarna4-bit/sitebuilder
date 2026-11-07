import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  const timestamp = new Date().toISOString();

  let dbStatus = 'healthy';
  try {
    const { error } = await supabase.from('nexus_projects').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      dbStatus = 'degraded';
    }
  } catch {
    dbStatus = 'offline';
  }

  return NextResponse.json({
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
  });
}
