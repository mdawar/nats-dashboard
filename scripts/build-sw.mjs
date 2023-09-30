import { build } from 'vite';

// Build the service worker file.
await build({
  build: {
    rollupOptions: {
      input: {
        sw: 'src/sw.ts',
      },
      output: {
        dir: 'dist',
        entryFileNames: '[name].js',
        format: 'es',
        sourcemap: false,
      },
    },
    emptyOutDir: false,
    minify: true,
  },
  configFile: false,
});
