import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import solid from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321', // TODO: change
  output: 'static',
  build: {
    // Generate an HTML file for each page.
    format: 'file',
    // Directory name of the Astro generated assets (JS and CSS)
    assets: 'assets',
  },
  integrations: [
    solid(),
    tailwind({
      // Disable injecting a basic `base.css` import on every page.
      applyBaseStyles: false,
    }),
  ],
});
