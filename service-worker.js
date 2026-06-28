const CACHE_NAME = "mtr-eta";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./apple-touch-icon.png",
  "./hk-mtr-logo-exact.png",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-256.png",
  "./icon-384.png",
  "./icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Live ETA API: always network, never cache.
  if (url.hostname.includes("rt.data.gov.hk")) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Important: HTML/navigation must be network-first, otherwise GitHub Pages may keep old colours.
  const acceptsHTML = event.request.headers.get("accept")?.includes("text/html");
  if (event.request.mode === "navigate" || acceptsHTML) {
    event.respondWith(
      fetch(event.request, { cache: "no-store" })
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then(cached => cached || caches.match("./index.html")))
    );
    return;
  }

  // Static assets: cache-first, but this cache name changes each version.
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
