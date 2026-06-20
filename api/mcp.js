// 公開MCPサーバ "ask-ogino"（Vercelサーバーレス関数 / Streamable HTTP・JSON-RPC）。
// 他人の Claude / AIエージェントが remote MCP として追加すると、荻野舜樹の「公開投影」を
// 直接クエリできる。＝HPが掲げる「自己＝外部API」を字義通りに実装したもの。
//
// 安全：このサーバは脳の本体（identity / memory_store 等）に一切触れない。読むのは公開
// エンドポイント /ask-ogino.json（= scope.py の public principal 相当の投影）だけ。秘密も
// 環境変数も持たない・書き込み手段も無い読み取り専用。依存パッケージもゼロ。
//
// 接続URL例: https://homepage-flax-two.vercel.app/api/mcp

const PROTOCOL_VERSION = '2025-06-18';
const SERVER_INFO = { name: 'ask-ogino', version: '1.0.0' };

const DATA_URL =
  process.env.ASK_OGINO_DATA_URL ||
  'https://homepage-flax-two.vercel.app/ask-ogino.json';

// ウォームインスタンス内で公開投影を軽くキャッシュ（5分）。
let _cache = { at: 0, data: null };
async function loadData() {
  const now = Date.now();
  if (_cache.data && now - _cache.at < 5 * 60_000) return _cache.data;
  const res = await fetch(DATA_URL, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`failed to load public projection: ${res.status}`);
  const data = await res.json();
  _cache = { at: now, data };
  return data;
}

// ---- ツール定義 ---------------------------------------------------------
const TOOLS = [
  {
    name: 'get_profile',
    description:
      '荻野舜樹（Shunki Ogino）が何者で、何を考えているか（自己紹介・思想）を返す。まずこれを呼ぶとよい。',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'list_works',
    description: '荻野が作ったもの（作品・道具）の一覧を、説明・タグ・URL・リポジトリ付きで返す。',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'list_posts',
    description: '荻野のブログ記事の一覧（タイトル・日付・要約・URL）を新しい順に返す。',
    inputSchema: {
      type: 'object',
      properties: { limit: { type: 'integer', description: '件数上限（既定20）', minimum: 1, maximum: 100 } },
      additionalProperties: false,
    },
  },
  {
    name: 'get_post',
    description: 'ブログ記事1本の全文（markdown）を slug で取得する。slug は list_posts / search の結果に含まれる。',
    inputSchema: {
      type: 'object',
      properties: { slug: { type: 'string', description: '記事のslug' } },
      required: ['slug'],
      additionalProperties: false,
    },
  },
  {
    name: 'search',
    description:
      '荻野の思想・作品・ブログ全文をキーワードで横断検索し、一致した項目を返す。「この人はXについてどう考えている？」に答える時に使う。',
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string', description: '検索語（日本語/英語）' } },
      required: ['query'],
      additionalProperties: false,
    },
  },
  {
    name: 'how_to_connect',
    description: '荻野への連絡先・つながり方（Discord/GitHub/各SNS）と、どんな人に来てほしいかを返す。',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
];

// ---- ツール実装 ---------------------------------------------------------
function textResult(text) {
  return { content: [{ type: 'text', text }] };
}

async function runTool(name, args = {}) {
  const d = await loadData();
  switch (name) {
    case 'get_profile': {
      const p = d.persona;
      const lines = [
        `# ${p.name}（${p.name_en}）`,
        `tagline: ${p.tagline}`,
        '',
        p.summary,
        '',
        '## 思想',
        ...d.thesis.map((t) => `- ${t}`),
        '',
        `※ ${p.purpose}`,
      ];
      return textResult(lines.join('\n'));
    }
    case 'list_works': {
      const lines = d.works.map(
        (w) =>
          `### ${w.title}\n${w.desc}\nタグ: ${(w.tags || []).join(', ')}\nURL: ${w.url}` +
          (w.repo ? `\nリポジトリ: ${w.repo}` : '')
      );
      return textResult(lines.join('\n\n'));
    }
    case 'list_posts': {
      const limit = Math.min(Math.max(parseInt(args.limit, 10) || 20, 1), 100);
      const lines = d.posts.slice(0, limit).map(
        (p) => `- [${p.date}] ${p.title} (slug: ${p.slug})\n  ${p.description}\n  ${p.url}`
      );
      return textResult(lines.join('\n') || '（記事なし）');
    }
    case 'get_post': {
      const post = d.posts.find((p) => p.slug === args.slug);
      if (!post) return textResult(`記事が見つかりません: ${args.slug}`);
      return textResult(
        `# ${post.title}\n日付: ${post.date}\nURL: ${post.url}\n\n${post.body}`
      );
    }
    case 'search': {
      const q = String(args.query || '').toLowerCase().trim();
      if (!q) return textResult('検索語が空です。');
      const hits = [];
      d.thesis.forEach((t) => {
        if (t.toLowerCase().includes(q)) hits.push(`[思想] ${t}`);
      });
      d.works.forEach((w) => {
        if ((w.title + w.desc + (w.tags || []).join(' ')).toLowerCase().includes(q))
          hits.push(`[作品] ${w.title} — ${w.desc} (${w.url})`);
      });
      d.posts.forEach((p) => {
        if ((p.title + p.description + p.body + (p.tags || []).join(' ')).toLowerCase().includes(q))
          hits.push(`[記事] ${p.title} (slug: ${p.slug}, ${p.date}) — ${p.description} ${p.url}`);
      });
      return textResult(
        hits.length ? hits.join('\n') : `「${args.query}」に一致するものは見つかりませんでした。`
      );
    }
    case 'how_to_connect': {
      const c = d.connect;
      const lines = [
        d.reach_out,
        '',
        `Discord（仲間募集中）: ${c.discord}`,
        `GitHub: ${c.github}`,
        `YouTube: ${c.youtube}`,
        `Instagram: ${c.instagram}`,
        `ホームページ: ${c.homepage}`,
        `ブログ: ${c.blog}`,
      ];
      return textResult(lines.join('\n'));
    }
    default:
      throw { code: -32601, message: `unknown tool: ${name}` };
  }
}

// ---- JSON-RPC / MCP ハンドリング ----------------------------------------
const rpcResult = (id, result) => ({ jsonrpc: '2.0', id, result });
const rpcError = (id, code, message) => ({ jsonrpc: '2.0', id, error: { code, message } });

async function handleMessage(msg) {
  // 通知（idなし）には応答しない。
  if (msg == null || typeof msg !== 'object') return null;
  const { id, method, params } = msg;
  const isNotification = id === undefined || id === null;

  try {
    switch (method) {
      case 'initialize':
        return rpcResult(id, {
          protocolVersion:
            (params && params.protocolVersion) || PROTOCOL_VERSION,
          capabilities: { tools: { listChanged: false } },
          serverInfo: SERVER_INFO,
          instructions:
            'これは荻野舜樹の公開プロフィールMCPです。get_profile で人物像、list_works で作品、' +
            'list_posts / get_post でブログ、search で横断検索、how_to_connect で連絡先が得られます。',
        });
      case 'notifications/initialized':
      case 'notifications/cancelled':
        return null; // 通知：応答なし
      case 'ping':
        return rpcResult(id, {});
      case 'tools/list':
        return rpcResult(id, { tools: TOOLS });
      case 'tools/call': {
        const name = params && params.name;
        const args = (params && params.arguments) || {};
        try {
          const result = await runTool(name, args);
          return rpcResult(id, result);
        } catch (e) {
          // ツール実行時エラーは isError で返す（プロトコルエラーではない）
          return rpcResult(id, {
            content: [{ type: 'text', text: `エラー: ${e && e.message ? e.message : String(e)}` }],
            isError: true,
          });
        }
      }
      default:
        if (isNotification) return null;
        return rpcError(id, -32601, `method not found: ${method}`);
    }
  } catch (e) {
    if (isNotification) return null;
    return rpcError(id, -32603, `internal error: ${e && e.message ? e.message : String(e)}`);
  }
}

export default async function handler(req, res) {
  // CORS（ブラウザ系エージェント/Inspector用）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Mcp-Session-Id, Mcp-Protocol-Version');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  // GET（SSEストリーム要求）はステートレス運用のため未サポート。
  if (req.method === 'GET') {
    res.status(405).json(rpcError(null, -32000, 'GET SSE stream is not supported (stateless server)'));
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json(rpcError(null, -32000, 'Method not allowed'));
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json(rpcError(null, -32700, 'Parse error'));
      return;
    }
  }

  // バッチ（配列）と単一の両対応。
  if (Array.isArray(body)) {
    const responses = (await Promise.all(body.map(handleMessage))).filter((r) => r !== null);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    // 全て通知だった場合は202で本文なし。
    if (responses.length === 0) {
      res.status(202).end();
      return;
    }
    res.status(200).json(responses);
    return;
  }

  const response = await handleMessage(body);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (response === null) {
    res.status(202).end(); // 通知のみ
    return;
  }
  res.status(200).json(response);
}
