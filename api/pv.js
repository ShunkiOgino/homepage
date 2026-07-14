// ページビュー受付（Vercelサーバーレス関数）→ Supabase pageviews に保存。
// プライバシー: 保存するのは path / referrer(ホスト名のみ) / src(発信リンクの刻印トークンのみ) / 時刻 だけ。
// IP・Cookie・個人情報は保存しない。
// ボット対策は最小限（パス長制限・自サイト判定）。厳密な計測ではなく「どの記事が読まれてるか」の傾向把握用。

const MAX_PATH = 300;
const MAX_REF = 200;

// クローラー/ボット除外（PVの水増し防止）。User-Agentに典型パターンを含むものは記録しない。
const BOT_RE = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|vkshare|whatsapp|telegrambot|discordbot|headless|lighthouse|gtmetrix|pingdom|uptimerobot|curl|wget|python-requests|axios|go-http|java\/|okhttp|monitor|preview/i;

function isBot(ua) {
  if (!ua || typeof ua !== 'string') return true; // UA無し＝怪しいので記録しない
  return BOT_RE.test(ua);
}

function safeReferrer(ref) {
  if (!ref || typeof ref !== 'string') return '';
  try {
    const u = new URL(ref);
    return u.hostname.slice(0, MAX_REF); // ホスト名だけ（フルURLは残さない＝過剰追跡しない）
  } catch {
    return '';
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ボット/クローラーは記録しない（PV水増し防止）
  if (isBot(req.headers['user-agent'])) {
    return res.status(200).json({ ok: true });
  }

  const body = req.body || {};
  let { path, referrer, src } = body;

  if (typeof path !== 'string' || !path.startsWith('/') || path.length > MAX_PATH) {
    return res.status(200).json({ ok: true }); // 不正は黙って捨てる
  }
  referrer = safeReferrer(referrer);
  // src = 発信リンクの経路刻印（?src=ig / ?src=yt）。トークン形式のみ通す。
  // DB側にもCHECK制約があるため、不正値はここでnullに落とす（行ごと失われるのを防ぐ）。
  src = (typeof src === 'string' && /^[a-z0-9_-]{1,24}$/.test(src)) ? src : null;

  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/pageviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ path, referrer, src }),
    });
    if (!response.ok) {
      return res.status(200).json({ ok: true }); // 計測失敗はサイト体験に影響させない
    }
  } catch {
    return res.status(200).json({ ok: true });
  }

  return res.status(200).json({ ok: true });
}
