const CACHE = 'blazed-v1';
const ASSETS = [
  '/blazed/',
  '/blazed/index.html',
  '/blazed/order.html',
  '/blazed/thanks.html',
  '/blazed/join.html',
  '/blazed/join-thanks.html',
  '/blazed/join-print.html',
  '/blazed/game.html',
  '/blazed/manifest.json',
  '/blazed/icon-192.png',
  '/blazed/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/blazed/')))
  );
});
