const CACHE_NAME = "used-golf-market-v1.10.3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js?v=1.10.3",
  "./manifest.webmanifest",
  "./icon.png",
  "./data/import-template.csv",
  "./app.001.js",
  "./app.002.js",
  "./app.003.js",
  "./app.004.js",
  "./app.005.js",
  "./app.006.js",
  "./app.007.js",
  "./app.008.js",
  "./app.009.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
