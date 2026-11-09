import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { selectTemplateForPrompt, TEMPLATES } from '@/lib/projects/templates';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('nexus_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // Graceful offline fallback: Return mock project list if database is unconfigured
      return NextResponse.json({ success: true, projects: [], fallback: true });
    }

    return NextResponse.json({ success: true, projects: data || [] });
  } catch (err: unknown) {
    return NextResponse.json({ success: true, projects: [], fallback: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, prompt, templateKey } = body;

    const { key, template } = prompt
      ? selectTemplateForPrompt(prompt)
      : { key: templateKey || 'poki-games', template: TEMPLATES[templateKey] || TEMPLATES['poki-games'] };

    const projectName = name || (template ? template.name.split('—')[0].trim() : 'New Application');
    const slug = projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const fallbackId = `proj_${Date.now()}`;

    let projectRecord = {
      id: fallbackId,
      name: projectName,
      slug,
      description: description || prompt || 'Synthesized application',
      template: key,
      current_status: 'READY',
      framework: 'nextjs',
      created_at: new Date().toISOString(),
    };

    try {
      const { data, error } = await supabase
        .from('nexus_projects')
        .insert({
          name: projectName,
          slug,
          description: description || prompt || 'Synthesized application',
          template: key,
          current_status: 'READY',
          framework: 'nextjs',
        })
        .select()
        .single();

      if (!error && data) {
        projectRecord = data;

        // Persist files if db is active
        if (template && data?.id) {
          const fileRows = Object.entries(template.files).map(([path, content]) => ({
            project_id: data.id,
            path,
            name: path.split('/').pop() || path,
            content,
            language: path.endsWith('.json') ? 'json' : path.endsWith('.sql') ? 'sql' : 'typescript',
            size_bytes: Buffer.byteLength(content, 'utf8'),
            version: 1,
            last_modified_by: 'system:generator',
          }));

          supabase.from('nexus_project_files').insert(fileRows).then(() => {});
        }
      }
    } catch {
      // Seamlessly proceed with fallback projectRecord
    }

    return NextResponse.json({ success: true, project: projectRecord });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown project creation error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

