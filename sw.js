// sw.js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('mon-compte-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/historique.html',
        '/style.css',
        '/script.js',
        '/icon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});