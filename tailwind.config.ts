import type { Config } from 'tailwindcss';
import formsPlugin from '@tailwindcss/forms';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [formsPlugin],
} satisfies Config;
