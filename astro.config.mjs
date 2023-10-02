import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import webmanifest from 'astro-webmanifest';

import manifestOptions from './config/webmanifest.mjs';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_DOMAIN,
  output: 'static',
  build: {
    // Generate an HTML file for each page.
    // Astro.url.pathname will include the .html extension in this case.
    format: 'file',
    // Directory name of the Astro generated assets (JS and CSS).
    assets: 'app',
  },
  integrations: [
    solid(),
    tailwind({
      // Disable injecting a basic `base.css` import on every page.
      applyBaseStyles: false,
    }),
    sitemap(),
    webmanifest(manifestOptions),
  ],
});
