import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import formsPlugin from '@tailwindcss/forms';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [formsPlugin],
} satisfies Config;
