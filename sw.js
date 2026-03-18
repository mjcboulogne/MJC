// ═══════════════════════════════════════════════════
//  MJC Boulogne — Service Worker v2
//  Bump CACHE_VERSION para limpiar cache viejo
// ═══════════════════════════════════════════════════
const CACHE_VERSION = 'mjc-v2';
const CACHE_STATIC  = CACHE_VERSION + '-static';

// Assets críticos a pre-cachear en install
const PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/Logo.png',
];

// ── INSTALL: pre-cachear assets críticos ──────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then(cache => {
      return cache.addAll(PRECACHE).catch(err => {
        // Si algún asset falla, no bloqueamos el install
        console.warn('[SW] Pre-cache parcial:', err);
      });
    })
  );
  // Activar inmediatamente sin esperar que se cierre la pestaña anterior
  self.skipWaiting();
});

// ── ACTIVATE: limpiar caches viejos (v1, etc.) ────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_STATIC)
          .map(k => {
            console.log('[SW] Borrando cache viejo:', k);
            return caches.delete(k);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: estrategia por tipo de recurso ─────────
self.addEventListener('fetch', event => {
  const req = event.request;

  // Ignorar no-GET y extensiones de Chrome
  if (req.method !== 'GET') return;
  if (req.url.startsWith('chrome-extension://')) return;
  if (req.url.includes('googleapis.com/spreadsheets')) return; // Sheets: siempre red

  // Navegación (HTML) → Network-first con fallback a cache
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_STATIC).then(c => c.put(req, clone));
          }
          return res;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Google Fonts → Cache-first (cambian raramente)
  if (req.url.includes('fonts.googleapis.com') || req.url.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(res => {
          const clone = res.clone();
          caches.open(CACHE_STATIC).then(c => c.put(req, clone));
          return res;
        });
      })
    );
    return;
  }

  // Imágenes locales → Cache-first
  if (req.destination === 'image') {
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_STATIC).then(c => c.put(req, clone));
          }
          return res;
        }).catch(() => cached || new Response('', { status: 404 }));
      })
    );
    return;
  }

  // Todo lo demás → Network-first sin guardar
  event.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});
