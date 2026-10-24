// Kot project offline cache. VERSION is set by build.ps1 for every build.
// Two caches: VERSION — the app itself (replaced with every new build); LIB — libraries, fonts and big data files from
// other sites (three.js, path tracer, denoiser, speech model runtime…). Their addresses carry exact versions, so LIB is kept
// between builds: the program keeps working without the internet after an update.
const VERSION = 'kot-20261024-1954';
const LIB = 'kot-lib-1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'];
const CDN = [
  'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
  'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js',
  'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/lines/LineSegments2.js',
  'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/lines/LineSegmentsGeometry.js',
  'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/lines/LineMaterial.js',
  'https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap',
  'https://fonts.googleapis.com/css2?family=Marck+Script&display=swap'
];
const CACHEABLE = /^https:\/\/(cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(SHELL);
    const l = await caches.open(LIB);
    await Promise.all(CDN.map(async u => { if (await l.match(u)) return; try { const r = await fetch(u, { mode:'cors' }); if (r.ok) await l.put(u, r); } catch (err){} }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    // only old builds of THIS copy (kot-<date>); the working program's caches (kotapp-*), libraries and the voice model stay
    for (const k of await caches.keys()) if (k !== VERSION && /^kot-\d/.test(k)) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // the working program (…/app/) has its own service worker and caches — never touch it from here
  if (url.origin === location.origin && url.pathname.startsWith(new URL('./app/', self.registration.scope).pathname)) return;
  // the app page: fresh from the network when online, from the cache when offline
  if (req.mode === 'navigate' || (url.origin === location.origin && url.pathname.endsWith('/index.html'))){
    e.respondWith((async () => {
      try { const r = await fetch(req); const c = await caches.open(VERSION); c.put('./index.html', r.clone()); return r; }
      catch (err){ return (await caches.match('./index.html')) || (await caches.match('./')) || Response.error(); }
    })());
    return;
  }
  if (url.origin === location.origin || CACHEABLE.test(req.url)){
    const own = url.origin === location.origin;
    e.respondWith((async () => {
      const hit = await caches.match(req, { ignoreVary:true });
      if (hit) return hit;
      try { const r = await fetch(req); if (r.ok || r.type === 'opaque'){ const c = await caches.open(own ? VERSION : LIB); c.put(req, r.clone()); } return r; }
      catch (err){ return Response.error(); }
    })());
  }
});
