import { getCollection } from 'astro:content';
import links from '../data/links.json';
import { PERSONA, THESIS, WORKS, REACH_OUT } from '../data/profile.js';

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
    persona: {
      name: PERSONA.name,
      name_en: PERSONA.name_en,
      tagline: PERSONA.tagline,
      summary: PERSONA.summary,
      purpose: PERSONA.purpose,
    },
    thesis: THESIS,
    works: WORKS.map((w) => ({ ...w, url: abs(w.url) })),
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
