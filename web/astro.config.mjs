// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://thepractitionerspod.com',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !page.includes('/thanks') })],
});
