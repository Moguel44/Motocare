self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open('motocare-v1').then(cache =>
      cache.match(e.request).then(response =>
        response || fetch(e.request).then(netRes => {
          cache.put(e.request, netRes.clone());
          return netRes;
        })
      )
    )
  );
});
