// botlog.js — AIクローラ/エージェントが機械層エンドポイントに触れた足跡を記録する。
// 人間PV(api/pv.js)の鏡像：あちらはボットを"捨てる"。こちらはAIだけを"拾う"。
//
// 目的＝[[project_ai_discoverability]]の計測。人間のいいねでなく「他人のClaude/エージェントが
// 荻野を見つけたか」を測る。発見性は人間フィードの数字には一切出てこないため、別系統で観測する。
//
// 記録はPIIフリー（pageviewsと同方針）: path / source / 分類したbot名 / MCP tool名 / UA(切詰) のみ。
// IP・Cookie・MCPの引数・本文は残さない。秘密も持たない（anonキーのみ・読み書きはbot_hits限定）。
//
// 利用元は2つ：
//   - api/mcp.js（Node serverless）＝MCPツール呼び出し（最高強度のシグナル＝実際にクエリされた）
//   - middleware.js（Edge）＝静的エンドポイント(/llms.txt 等)へのAIクローラのfetch

// 既知のAIクローラ/エージェントのUA（学習用クローラ＋推論時retrievalエージェント）。
// pageviews の BOT_RE が generic な bot|crawl しか見ないのに対し、ここは「AI」を名指しで拾う。
const AI_BOTS = [
  [/GPTBot/i, 'GPTBot'],                       // OpenAI 学習クローラ
  [/OAI-SearchBot/i, 'OAI-SearchBot'],         // OpenAI 検索
  [/ChatGPT-User/i, 'ChatGPT-User'],           // ChatGPT ブラウジング（推論時）
  [/ClaudeBot/i, 'ClaudeBot'],                 // Anthropic 学習クローラ
  [/Claude-Web/i, 'Claude-Web'],
  [/Claude-User/i, 'Claude-User'],             // Claude 推論時fetch
  [/Claude-SearchBot/i, 'Claude-SearchBot'],
  [/anthropic-ai/i, 'anthropic-ai'],
  [/PerplexityBot/i, 'PerplexityBot'],
  [/Perplexity-User/i, 'Perplexity-User'],
  [/Google-Extended/i, 'Google-Extended'],     // Gemini 学習
  [/GoogleOther/i, 'GoogleOther'],
  [/Bytespider/i, 'Bytespider'],               // ByteDance/Doubao
  [/CCBot/i, 'CCBot'],                         // Common Crawl（多くのLLMの素）
  [/Amazonbot/i, 'Amazonbot'],
  [/Applebot-Extended/i, 'Applebot-Extended'],
  [/Applebot/i, 'Applebot'],
  [/Meta-ExternalAgent/i, 'Meta-ExternalAgent'],
  [/Meta-ExternalFetcher/i, 'Meta-ExternalFetcher'],
  [/FacebookBot/i, 'FacebookBot'],
  [/cohere-ai/i, 'cohere-ai'],
  [/MistralAI-User/i, 'MistralAI-User'],
  [/DuckAssistBot/i, 'DuckAssistBot'],
  [/YouBot/i, 'YouBot'],
  [/Diffbot/i, 'Diffbot'],
  [/Timpibot/i, 'Timpibot'],
  [/PetalBot/i, 'PetalBot'],
];

// UAから既知AIクローラ名を返す。無ければ null。
export function classifyBot(ua) {
  if (!ua || typeof ua !== 'string') return null;
  for (const [re, name] of AI_BOTS) {
    if (re.test(ua)) return name;
  }
  return null;
}

// bot_hits に1行記録する。fire-and-forget（失敗してもサイト挙動に影響させない＝必ずcatch）。
// Promiseを返すので、呼び側は await でも waitUntil でも握りつぶしでも選べる。
export function recordBotHit({ path, source, tool = null, ua = '' }) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return Promise.resolve();

  // crawl はUAで分類できた既知AIのみ拾う前提（呼び側で gate 済み）。
  // mcp は「ツールを呼んだ」事実自体がエージェント行為なのでUA不問→未分類は 'mcp-client'。
  const bot = classifyBot(ua) || (source === 'mcp' ? 'mcp-client' : 'other');
  const body = {
    path: String(path || '/').slice(0, 300),
    source,
    bot: bot ? String(bot).slice(0, 80) : null,
    tool: tool ? String(tool).slice(0, 80) : null,
    user_agent: String(ua || '').slice(0, 300),
  };

  return fetch(`${url}/rest/v1/bot_hits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(body),
  }).catch(() => {
    /* 計測失敗はサイト体験に影響させない（人間PVと同じく握りつぶす） */
  });
}
