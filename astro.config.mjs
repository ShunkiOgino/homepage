import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

// サイトURLの正は content_store.LINKS → src/data/links.json（ここでは読むだけ）
const links = JSON.parse(readFileSync(new URL('./src/data/links.json', import.meta.url), 'utf-8'));

export default defineConfig({
  site: links.homepage.url,
  integrations: [tailwind(), sitemap()],
});
