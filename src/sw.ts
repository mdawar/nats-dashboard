import { setCacheNameDetails, clientsClaim, skipWaiting } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { pageCache, staticResourceCache, imageCache } from 'workbox-recipes';
import { setDefaultHandler } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

setCacheNameDetails({ prefix: 'dashboard' });

setDefaultHandler(new NetworkOnly());

cleanupOutdatedCaches();

// Injected precache manifest.
precacheAndRoute(self.__WB_MANIFEST, {
  // Ignore all URL parameters.
  ignoreURLParametersMatching: [/.*/],
});

// Respond to HTML page requests with a network first strategy with cache fallback after a 3s timeout.
pageCache();

// Use stale while revalidate strategy for static resources (For resources not in the precache).
staticResourceCache();

// Respond to image requests with a cache first strategy (Caches max 60 images for 30 days).
imageCache();

clientsClaim();
skipWaiting();
