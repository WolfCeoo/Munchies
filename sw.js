// Minimal service worker: exists so Chrome can offer "Install app" (beforeinstallprompt
// requires a fetch handler to be registered). No offline app-shell caching is claimed
// here beyond a light network-first pass-through, since order and vendor data must
// always be live.
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { self.clients.claim(); });
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
