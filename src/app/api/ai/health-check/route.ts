import { NextRequest, NextResponse } from 'next/server';
import { modelRegistry } from '@/lib/ai/registry';
import { ModelProviderId } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const credentials: Record<ModelProviderId, string> = {
      gemini: body.gemini || process.env.GEMINI_API_KEY || '',
      openai: body.openai || process.env.OPENAI_API_KEY || '',
      anthropic: body.anthropic || process.env.ANTHROPIC_API_KEY || '',
      custom: '',
      'offline-nexus': '',
    };

    const statuses = await modelRegistry.runHealthChecks(credentials);
    return NextResponse.json({ success: true, statuses });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown health check error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

