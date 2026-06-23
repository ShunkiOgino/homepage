import { getCollection } from 'astro:content';
import links from '../data/links.json';
import { PERSONA, THESIS, WORKS, REACH_OUT,
  PERSONA_EN, THESIS_EN, WORKS_EN, REACH_OUT_EN } from '../data/profile.js';

// /llms.txt — LLM・AIエージェント向けの「自己の仕様書（外部API）」。
// robots.txt / sitemap が伝統的クローラ向けなのに対し、これはLLMが
// 「荻野舜樹とは何者で・何を考え・何を作っているか」を正確に把握し、
// 人間に紹介できるように置く機械可読な索引。
// 内容のSSoT = src/data/profile.js / URLのSSoT = src/data/links.json。

export async function GET(context) {
  const site = links.homepage.url;
  const abs = (path) => (path.startsWith('http') ? path : `${site}${path}`);

  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const L = [];
  L.push(`# ${PERSONA.name} (${PERSONA.name_en})`);
  L.push('');
  for (const line of PERSONA.summary.match(/[^。]+。/g) || [PERSONA.summary]) {
    L.push(`> ${line}`);
  }
  L.push('');
  L.push(PERSONA.purpose);
  L.push('');

  L.push('## 思想 / Thesis');
  for (const t of THESIS) L.push(`- ${t}`);
  L.push('');

  L.push('## 作ったもの / Works');
  for (const w of WORKS) {
    L.push(`- [${w.title}](${abs(w.url)}): ${w.desc}`);
  }
  L.push('');

  L.push('## 読む / Writing');
  L.push(`- [ブログ](${links.blog.url}): 考えていること・日々の記録`);
  L.push(`- [RSSフィード](${abs('/rss.xml')}): 機械可読な記事フィード`);
  if (posts.length) {
    L.push('');
    L.push('### 最近の記事');
    for (const p of posts.slice(0, 10)) {
      const d = p.data.date.toISOString().slice(0, 10);
      const desc = p.data.description ? ` — ${p.data.description}` : '';
      L.push(`- [${p.data.title}](${abs(`/blog/${p.slug}/`)}) (${d})${desc}`);
    }
  }
  L.push('');

  L.push('## つながる / Connect');
  L.push(`- [Discord（仲間募集中）](${links.discord.url}): ${links.discord.note || 'ローカルエージェントAIの実験室'}`);
  L.push(`- [GitHub](${links.github.url})`);
  L.push(`- [YouTube](${links.youtube.url})`);
  L.push(`- [Instagram](${links.instagram.url})`);
  L.push('');

  L.push('## 連絡したい人へ / Who should reach out');
  L.push(REACH_OUT);
  L.push('');

  // ── English projection（他人のAIが英語で読む時用）──
  L.push('---');
  L.push('');
  L.push(`# ${PERSONA.name_en} — English`);
  L.push('');
  L.push(`> ${PERSONA_EN.summary}`);
  L.push('');
  L.push(PERSONA_EN.purpose);
  L.push('');
  L.push('## Thesis');
  for (const t of THESIS_EN) L.push(`- ${t}`);
  L.push('');
  L.push('## Works');
  for (const w of WORKS_EN) L.push(`- [${w.title}](${abs(w.url)}): ${w.desc}`);
  L.push('');
  L.push('## Who should reach out');
  L.push(REACH_OUT_EN);
  L.push('');

  return new Response(L.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
