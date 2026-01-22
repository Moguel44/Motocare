const CACHE_NAME = 'motocare-v4';

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
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});

/* 🔔 NOTIFICACIONES */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'ITV_ALERT') {
    self.registration.showNotification('MotoCare', {
      body: event.data.text,
      icon: './Mi_Man.png',
      badge: './Mi_Man.png'
    });
  }
});
