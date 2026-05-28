export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, email, system_type, current_situation, desired_outcome, timeline } = req.body;

  if (!name || !email || !system_type || !current_situation || !desired_outcome) {
    return res.status(400).json({ error: '必須項目が不足しています' });
  }

  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify({ name, company, email, system_type, current_situation, desired_outcome, timeline }),
  });

  if (!response.ok) {
    return res.status(500).json({ error: '送信に失敗しました' });
  }

  return res.status(200).json({ ok: true });
}
