// middleware.js — Vercel Edge Middleware。機械層の静的エンドポイントに来たAIクローラの足跡を記録する。
//
// なぜEdge Middlewareか：/llms.txt・/ask-ogino.json・/.well-known/agent-card.json は
// Astroがビルド時に吐く"静的ファイル"なので、ファイル自身ではアクセスを記録できない。
// このサイトはVercelアダプタ未配線（pure static）＝prerender=falseでの関数化もできない。
// → 静的配信(CDNキャッシュ)は一切いじらず、その手前にEdgeを1枚噛ませてAIクローラだけ拾う。
// （MCP /api/mcp は元から関数なので、そちらは api/mcp.js 内で直接記録する）
//
// 安全：AIと判定したUAの時だけ1行 INSERT する読み書き最小。失敗してもページ配信は止めない。

import { next } from '@vercel/edge';
import { classifyBot, recordBotHit } from './src/lib/botlog.js';

export const config = {
  // 監視するのは機械層エンドポイントだけ。他のすべてのルートは素通り（middlewareを通さない）。
  matcher: ['/llms.txt', '/ask-ogino.json', '/.well-known/agent-card.json'],
};

export default async function middleware(request) {
  try {
    const ua = request.headers.get('user-agent') || '';
    // 既知AIクローラのみ記録（人間ブラウザ・監視bot・RSSリーダ等は無視＝水増し防止）。
    if (classifyBot(ua)) {
      const path = new URL(request.url).pathname;
      await recordBotHit({ path, source: 'crawl', ua });
    }
  } catch {
    // 計測失敗はサイト配信に影響させない
  }
  return next();
}
