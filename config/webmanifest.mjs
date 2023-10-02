/** @type {import('astro-webmanifest').WebmanifestOptions} */
export default {
  config: {
    outfile: 'manifest.webmanifest',
    createFavicon: true,
    insertFaviconLinks: true,
    insertManifestLink: true,
    insertThemeColorMeta: true,
    insertAppleTouchLinks: true,
  },
  name: 'NATS Dashboard',
  short_name: 'NATS Dashboard',
  description: 'A dashboard for monitoring NATS servers.',
  start_url: '/',
  scope: '/',
  background_color: '#ffffff',
  theme_color: '#0284c7',
  display: 'standalone',
  icon: 'src/assets/nats-icon.png',
  // Sizes to generate (Skip sizes for legacy devices 48x48 up to 144x144).
  icons: [
    {
      src: 'icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: 'icons/icon-256x256.png',
      sizes: '256x256',
      type: 'image/png',
    },
    {
      src: 'icons/icon-384x384.png',
      sizes: '384x384',
      type: 'image/png',
    },
    {
      src: 'icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
    {
      src: 'icons/icon-1024x1024.png',
      sizes: '1024x1024',
      type: 'image/png',
    },
    {
      src: 'icons/icon-maskable-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: 'icons/icon-maskable-1024x1024.png',
      sizes: '1024x1024',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],
};
