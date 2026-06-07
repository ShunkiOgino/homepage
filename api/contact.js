// 問い合わせ受付（Vercelサーバーレス関数）→ Supabase に保存。
// ボット/スパム対策: honeypot・送信タイミング・メール形式・長さ上限・ベストエフォートのIPスロットル。
// ※本格的なレート制限/DDoS対策はプラットフォーム側（Vercel Firewall / Cloudflare Turnstile）で。

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 100, company: 120, email: 160, system_type: 300, current_situation: 2000, desired_outcome: 2000, timeline: 200 };

// ウォームインスタンス内のみ有効な簡易IPスロットル（厳密ではない・保険）
const _hits = new Map();           // ip -> [timestamps]
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function tooMany(ip) {
  const now = Date.now();
  const arr = (_hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  _hits.set(ip, arr);
  return arr.length > MAX_PER_WINDOW;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const { name, company, email, system_type, current_situation, desired_outcome, timeline,
          website, elapsed_ms } = body;

  // 1) honeypot: 隠しフィールドが埋まっている＝ボット（成功を装って黙って捨てる）
  if (website) {
    return res.status(200).json({ ok: true });
  }

  // 2) 送信が速すぎる＝自動投稿（人間はフォーム入力に数秒かかる）
  if (typeof elapsed_ms === 'number' && elapsed_ms < 2500) {
    return res.status(200).json({ ok: true });
  }

  // 3) 必須チェック
  if (!name || !email || !system_type || !current_situation || !desired_outcome) {
    return res.status(400).json({ error: '必須項目が不足しています' });
  }

  // 4) メール形式
  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'メールアドレスの形式が正しくありません' });
  }

  // 5) 長さ上限（巨大ペイロードでDBを汚さない）
  for (const [k, lim] of Object.entries(MAX)) {
    if (typeof body[k] === 'string' && body[k].length > lim) {
      return res.status(400).json({ error: `${k} が長すぎます` });
    }
  }

  // 6) ベストエフォートのIPスロットル
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (tooMany(ip)) {
    return res.status(429).json({ error: 'リクエストが多すぎます。少し時間をおいてください' });
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
