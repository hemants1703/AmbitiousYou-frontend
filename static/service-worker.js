// static/service-worker.js
const CACHE_NAME = 'ambitiousyou-v1';
const URLS_TO_CACHE = [
  '/',
  '/manifest.json',
  "."
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});