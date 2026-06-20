import links from '../../data/links.json';
import { PERSONA, REACH_OUT } from '../../data/profile.js';

// /.well-known/agent-card.json — A2A 互換の「エージェントカード」。
// 目的：荻野舜樹の公開代理（= ask-ogino）を、他のAIエージェントが
// 「叩けるエンドポイント」ではなく「発見できるエージェント」として認識できるよう名乗らせる、
// 発見(discovery)用ドキュメント。これが B層（プロトコル/名簿）への足場の一枚目。
//
// 実体の機械インターフェイスは既存の公開MCP(/api/mcp)と公開投影(/ask-ogino.json)を指すだけ。
// 脳の本体（identity / memory_store 等）には一切触れない＝ scope.py の public principal を超えない。
// 公開安全：顧客名・秘密・他人PII・内部パスは含めない（素はすべて profile.js / links.json）。
//
// 内容のSSoT = src/data/profile.js / URLのSSoT = src/data/links.json。

export async function GET() {
  const site = links.homepage.url;
  const mcp = `${site}/api/mcp`;

  // MCPツール（mcp.js の TOOLS）と1:1で対応する「できること」。
  const skills = [
    {
      id: 'get_profile',
      name: '人物・思想を返す',
      description: '荻野舜樹が何者で、何を考えているか（自己紹介・思想）を返す。',
      tags: ['profile', 'about', 'thesis'],
      examples: ['荻野舜樹ってどんな人？', 'この人は何を考えている？'],
    },
    {
      id: 'list_works',
      name: '作品一覧',
      description: '荻野が作った道具・作品の一覧を、説明・タグ・URL・リポジトリ付きで返す。',
      tags: ['works', 'portfolio'],
      examples: ['何を作っている人？'],
    },
    {
      id: 'list_posts',
      name: 'ブログ一覧',
      description: 'ブログ記事の一覧（タイトル・日付・要約・URL）を新しい順に返す。',
      tags: ['blog', 'writing'],
      examples: ['最近どんな記事を書いた？'],
    },
    {
      id: 'get_post',
      name: 'ブログ全文',
      description: 'ブログ記事1本の全文（markdown）を slug で返す。',
      tags: ['blog', 'article'],
      examples: [],
    },
    {
      id: 'search',
      name: '横断検索',
      description: '思想・作品・ブログ全文をキーワードで横断検索する。',
      tags: ['search'],
      examples: ['複利についてどう考えている？', 'ローカルファーストとは？'],
    },
    {
      id: 'how_to_connect',
      name: '連絡先・つながり方',
      description: '連絡先・つながり方と、どんな人に来てほしいかを返す。',
      tags: ['contact', 'connect'],
      examples: ['どうやって連絡すればいい？'],
    },
  ];

  const card = {
    protocolVersion: '0.3.0',
    name: 'ask-ogino',
    description: PERSONA.purpose,
    provider: { organization: PERSONA.name_en, url: site },
    version: '1.0.0',
    documentationUrl: `${site}/llms.txt`,
    // 実体の機械インターフェイスは MCP（streamable-http）。A2Aネイティブのendpointは未提供のため、
    // url / additionalInterfaces とも MCP と公開投影(JSON)を指す。
    url: mcp,
    preferredTransport: 'mcp-streamable-http',
    capabilities: {
      streaming: false,
      pushNotifications: false,
      stateTransitionHistory: false,
    },
    defaultInputModes: ['text/plain'],
    defaultOutputModes: ['text/plain', 'application/json'],
    skills,
    additionalInterfaces: [
      { transport: 'mcp-streamable-http', url: mcp },
      { transport: 'http+json', url: `${site}/ask-ogino.json` },
    ],
    // 人間への橋渡し用：来てほしい相手。
    audience: REACH_OUT,
    _note:
      '読み取り専用の公開投影。荻野舜樹の内部データ（脳本体）には到達しない。発注募集ではなく仲間を探すための自己の仕様書。',
  };

  return new Response(JSON.stringify(card, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // 他オリジンのエージェント/ブラウザからも読めるように。
      'Access-Control-Allow-Origin': '*',
    },
  });
}
