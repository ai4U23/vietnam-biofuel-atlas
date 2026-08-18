/**
 * Service Worker for Vietnam Biofuel Atlas
 * Offline-first caching for static assets, calculations, and visual atlas shell.
 */

const CACHE_NAME = "biofuel-atlas-v1";
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
  "/images/rice-husk-mill.svg"
];

// Install: pre-cache application shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: cleanup obsolete caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Stale-while-revalidate for assets, Network-first for dynamic navigation
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET requests and cross-origin analytics/APIs
  if (request.method !== "GET" || !request.url.startsWith(self.location.origin)) {
    return;
  }

  // Handle PDF downloads directly with network fallback
  if (request.url.includes("/references/") && request.url.endsWith(".pdf")) {
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
    return;
  }

  // Stale-While-Revalidate for local JS/CSS/Images/Shell
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
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
