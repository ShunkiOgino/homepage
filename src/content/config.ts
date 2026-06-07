import { defineCollection, z } from 'astro:content';

// ブログ記事コレクション。記事は src/content/blog/<slug>.md に置く。
// AgentHive の publish_blog_post スキルがこの形式の .md を生成・コミットする。
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().default(''),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false), // true の記事は一覧・公開から除外
  }),
});

export const collections = { blog };
