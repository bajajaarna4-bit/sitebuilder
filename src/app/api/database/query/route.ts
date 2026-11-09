import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

const FORBIDDEN_SQL_PATTERNS = [
  /drop\s+database/i,
  /alter\s+system/i,
  /shutdown/i,
  /grant\s+all/i,
  /truncate\s+nexus_users/i,
];

export async function POST(req: NextRequest) {
  const start = performance.now();

  try {
    const body = await req.json();
    const { query } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ success: false, error: 'Query string is required' }, { status: 400 });
    }

    const trimmed = query.trim();

    // Security Gate: Check for dangerous destructive patterns
    for (const pattern of FORBIDDEN_SQL_PATTERNS) {
      if (pattern.test(trimmed)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Security Boundary Enforced: Destructive cluster commands are blocked.',
          },
          { status: 403 }
        );
      }
    }

    // Determine target table for REST query fallback or RPC
    const tables = [
      'nexus_projects',
      'nexus_users',
      'nexus_project_files',
      'nexus_agent_runs',
      'nexus_agent_tasks',
      'nexus_credentials',
      'nexus_deployments',
      'nexus_audit_logs',
      'omni_messages',
      'omni_widgets',
    ];

    const matchedTable = tables.find((t) => trimmed.toLowerCase().includes(t.toLowerCase())) || 'nexus_projects';

    const { data, error } = await supabase
      .from(matchedTable)
      .select('*')
      .limit(50);

    const elapsed = Math.round(performance.now() - start);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          executionTimeMs: elapsed,
        },
        { status: 500 }
      );
    }

    const rows = data || [];
    const columns = rows.length > 0 ? Object.keys(rows[0]) : ['id', 'status', 'created_at'];

    // Audit log this database query
    supabase.from('nexus_audit_logs').insert({
      action: 'DATABASE_QUERY_EXECUTED',
      details: { query: trimmed.slice(0, 100), table: matchedTable, rowCount: rows.length, latencyMs: elapsed },
    }).then(() => {});

    return NextResponse.json({
      success: true,
      columns,
      rows,
      rowCount: rows.length,
      executionTimeMs: elapsed,
      table: matchedTable,
    });
  } catch (err: unknown) {
    const elapsed = Math.round(performance.now() - start);
    const msg = err instanceof Error ? err.message : 'Unknown database query execution error';
    return NextResponse.json({ success: false, error: msg, executionTimeMs: elapsed }, { status: 500 });
  }
}

