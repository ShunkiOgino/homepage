import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  const { name, company, system_type, current_situation, desired_outcome, timeline } = data;

  if (!name || !system_type || !current_situation || !desired_outcome) {
    return new Response(JSON.stringify({ error: '必須項目が不足しています' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const res = await fetch(`${import.meta.env.SUPABASE_URL}/rest/v1/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': import.meta.env.SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${import.meta.env.SUPABASE_ANON_KEY}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify({ name, company, system_type, current_situation, desired_outcome, timeline }),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: '送信に失敗しました' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
