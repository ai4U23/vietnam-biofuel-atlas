/**
 * Service Worker for Vietnam Biofuel Atlas
 * Offline-first caching for static assets, calculations, and visual atlas shell.
 *
 * CACHE STRATEGY (deploy-safe):
 * - Navigations/app shell: NETWORK-FIRST (cache fallback for offline) so every
 *   deploy reaches returning visitors on their next load. Stale-first shell
 *   caching pinned old code after deploys and masked bug fixes.
 * - /assets/ (Vite content-hashed) + /images/ + manifest + favicons:
 *   stale-while-revalidate (staleness is cosmetic or impossible).
 * - /references/*.pdf: network-first with cache fallback (unchanged).
 * - /api/*: never intercepted.
 *
 * Bump CACHE_NAME on strategy changes so the activate handler purges
 * existing clients' old caches.
 */

const CACHE_NAME = "biofuel-atlas-v2";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.svg",
  "/favicon.png",
  "/images/ai4u-logo.png",
  "/images/hero-bg.svg",
  "/images/bagasse-chp.svg",
  "/images/biogas-cluster.svg",
  "/images/rice-husk-mill.svg",
];

// Install: pre-cache application shell
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: cleanup obsolete caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: network-first for navigations/shell, stale-while-revalidate for
// immutable or cosmetic assets, network with cache fallback for PDFs.
self.addEventListener("fetch", event => {
  const { request } = event;

  // Skip non-GET requests and cross-origin analytics/APIs
  if (
    request.method !== "GET" ||
    !request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  const url = new URL(request.url);

  // Never intercept the API (SSE stream included)
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // Handle PDF downloads directly with network fallback
  if (url.pathname.includes("/references/") && url.pathname.endsWith(".pdf")) {
    event.respondWith(fetch(request).catch(() => caches.match(request)));
    return;
  }

  // App shell: NETWORK-FIRST so deploys land on the next navigation.
  // Cache only serves as the offline fallback.
  if (
    request.mode === "navigate" ||
    url.pathname === "/" ||
    url.pathname === "/index.html"
  ) {
    event.respondWith(
      fetch(request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          }
          return networkResponse;
        })
        .catch(() =>
          caches
            .match(request)
            .then(cached => cached || caches.match("/index.html"))
        )
    );
    return;
  }

  // Hashed build assets and static media: stale-while-revalidate.
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(request).then(cachedResponse => {
        const fetchPromise = fetch(request)
          .then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      });
    })
  );
});
