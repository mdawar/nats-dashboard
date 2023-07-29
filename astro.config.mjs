import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import solid from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  integrations: [
    solid(),
    tailwind({
      // Disable injecting a basic `base.css` import on every page.
      applyBaseStyles: false,
    }),
  ],
});
