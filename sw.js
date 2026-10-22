// Kot project offline cache. Bump VERSION when publishing a new build.
const VERSION = 'kot-20261023-0025';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'];
const CDN = [
  'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
  'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js',
  'https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap'
];
const CACHEABLE = /^https:\/\/(cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(SHELL);
    await Promise.all(CDN.map(u => fetch(u, { mode:'cors' }).then(r => r.ok && c.put(u, r)).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // the app page: fresh from the network when online, from the cache when offline
  if (req.mode === 'navigate' || (url.origin === location.origin && url.pathname.endsWith('/index.html'))){
    e.respondWith((async () => {
      try { const r = await fetch(req); const c = await caches.open(VERSION); c.put('./index.html', r.clone()); return r; }
      catch (err){ return (await caches.match('./index.html')) || (await caches.match('./')) || Response.error(); }
    })());
    return;
  }
  if (url.origin === location.origin || CACHEABLE.test(req.url)){
    e.respondWith((async () => {
      const hit = await caches.match(req);
      if (hit) return hit;
      try { const r = await fetch(req); if (r.ok || r.type === 'opaque'){ const c = await caches.open(VERSION); c.put(req, r.clone()); } return r; }
      catch (err){ return Response.error(); }
    })());
  }
});
