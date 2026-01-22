const CACHE_NAME = 'motocare-v3';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        '/MotoCare/',
        '/MotoCare/index.html',
        '/MotoCare/manifest.json',
        '/MotoCare/Mi_Man.png',
        '/MotoCare/icon-192.png',
        '/MotoCare/icon-512.png'
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(e.request).then(response =>
        response || fetch(e.request).then(netRes => {
          cache.put(e.request, netRes.clone());
          return netRes;
        })
      )
    )
  );
});

/* 🔔 ESCUCHAR MENSAJES PARA NOTIFICACIONES */
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'ITV_ALERT') {
    self.registration.showNotification('MotoCare', {
      body: e.data.text,
      icon: 'Mi_Man.png',
      badge: 'Mi_Man.png'
    });
  }
});
