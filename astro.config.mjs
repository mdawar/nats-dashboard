import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import webmanifest from 'astro-webmanifest';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321', // TODO: change
  output: 'static',
  build: {
    // Generate an HTML file for each page.
    format: 'file',
    // Directory name of the Astro generated assets (JS and CSS)
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
      icon: 'src/assets/nats-icon-black.svg', // TODO: change
      name: 'NATS Dashboard',
      short_name: 'NATS Dashboard',
      start_url: '/',
      background_color: '#ffffff',
      theme_color: '#0284c7',
      display: 'standalone',
    }),
  ],
});
