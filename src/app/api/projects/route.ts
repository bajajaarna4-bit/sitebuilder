import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { selectTemplateForPrompt } from '@/lib/projects/templates';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('nexus_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, projects: data || [] });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown database error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, prompt, templateKey } = body;

    const { key, template } = prompt
      ? selectTemplateForPrompt(prompt)
      : { key: templateKey || 'nextjs-saas', template: null };

    const projectName = name || (template ? template.name.split('—')[0].trim() : 'New Application');
    const slug = projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

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

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, project: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown project creation error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
