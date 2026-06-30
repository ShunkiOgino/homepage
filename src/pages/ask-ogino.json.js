import { getCollection } from 'astro:content';
import links from '../data/links.json';
import { PERSONA, THESIS, WORKS, REACH_OUT,
  PERSONA_EN, THESIS_EN, WORKS_EN, REACH_OUT_EN } from '../data/profile.js';

// /ask-ogino.json — 公開MCP "ask-ogino" が読む機械可読な「公開投影」。
// これ自体も誰でも取得できる公開エンドポイント。脳の本体には触れない＝public scope のみ。
// 内容のSSoT = src/data/profile.js / URLのSSoT = src/data/links.json。

export async function GET(context) {
  const site = links.homepage.url;
  const abs = (path) => (path.startsWith('http') ? path : `${site}${path}`);

  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((p) => ({
      slug: p.slug,
      title: p.data.title,
      date: p.data.date.toISOString().slice(0, 10),
      description: p.data.description || '',
      tags: p.data.tags || [],
      url: abs(`/blog/${p.slug}/`),
      body: p.body, // 記事本文（markdown）。公開済みのみ。
    }));

  const data = {
    languages: ['ja', 'en'],
    persona: {
      name: PERSONA.name,
      name_en: PERSONA.name_en,
      tagline: PERSONA.tagline,
      summary: PERSONA.summary,
      purpose: PERSONA.purpose,
    },
    thesis: THESIS,
    // 実時間の「活動状態」（活動のみ・位置情報なし・粗鮮度・約10分更新）。
    // 他人のAIが「荻野いま捕まるか」を機械可読で引ける外向き口。脳本体には触れず public 投影の1行だけ。
    presence: {
      description: "Ogino's live, coarse activity status — activity only, never location.",
      description_ja: '荻野の実時間の活動状態（活動のみ・位置情報なし・約10分更新）。',
      url: 'https://onggpzsihpdknqrwvxch.supabase.co/rest/v1/presence?id=eq.public&select=data,updated_at',
      key: 'sb_publishable_I_59R8pwKpsN0iQenKU7iQ_D9f8HaVm',
      how: 'GET the url with headers { "apikey": <key>, "Authorization": "Bearer <key>" }. Returns [{ data, updated_at }]. data includes status / awake / last_active / today_activity (minute-resolution on/off ranges). No location is ever included.',
      refresh_sec: 600,
    },
    works: WORKS.map((w) => ({ ...w, url: abs(w.url) })),
    // 英語投影（他人のAIが英語で読む時用・[[project_ai_discoverability]]）。
    en: {
      persona: PERSONA_EN,
      thesis: THESIS_EN,
      works: WORKS_EN.map((w) => ({ ...w, url: abs(w.url) })),
      reach_out: REACH_OUT_EN,
    },
    posts,
    connect: {
      homepage: links.homepage.url,
      blog: links.blog.url,
      rss: abs('/rss.xml'),
      discord: links.discord.url,
      github: links.github.url,
      youtube: links.youtube.url,
      instagram: links.instagram.url,
    },
    reach_out: REACH_OUT,
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // 他オリジンのエージェント/ブラウザからも読めるように。
      'Access-Control-Allow-Origin': '*',
    },
  });
}
