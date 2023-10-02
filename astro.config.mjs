import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import webmanifest from 'astro-webmanifest';

// https://astro.build/config
// test
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
    webmanifest({
      config: {
        outfile: 'manifest.webmanifest',
        createFavicon: true,
        insertFaviconLinks: true,
        insertManifestLink: true,
        insertThemeColorMeta: true,
        insertAppleTouchLinks: true,
      },
      icon: 'src/assets/nats-icon-black.png',
      name: 'NATS Dashboard',
      short_name: 'NATS Dashboard',
      description: 'A dashboard for monitoring a NATS server.',
      start_url: '/',
      background_color: '#ffffff',
      theme_color: '#0284c7',
      display: 'standalone',
    }),
  ],
});
