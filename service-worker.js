const CACHE_NAME = 'cuestionario-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/admin.html',
  '/style.css',
  '/main.js',
  '/admin.js',
  '/preguntas.json',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
