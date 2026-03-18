// ═══════════════════════════════════════════════════════════════
//  MJC Boulogne — Service Worker
//  Estrategia: Cache-first para assets estáticos
//              Network-first para HTML (siempre fresco)
//              Fallback offline para navegación
// ═══════════════════════════════════════════════════════════════

const CACHE_NAME   = 'mjc-boulogne-v1';
const OFFLINE_URL  = '/index.html';

// Assets que se cachean en la instalación (pre-cache)
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/Logo.png',
  // Fonts — se cachean por Google Fonts CDN, no es necesario incluirlas acá
];

// ── INSTALL: pre-cachear assets críticos ──────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pre-cacheando assets críticos');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: limpiar caches viejos ──────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Eliminando cache viejo:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// ── FETCH: estrategia por tipo de recurso ─────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Solo manejar requests del mismo origen
  if (url.origin !== location.origin && !url.hostname.includes('fonts.gstatic.com')) {
    return;
  }

  // HTML → Network-first (siempre ver si hay versión nueva)
  if (event.request.mode === 'navigate' ||
      event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Guardar copia fresca en cache
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => {
          // Sin red: servir desde cache (offline fallback)
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  // Fonts de Google → Cache-first (no cambian nunca)
  if (url.hostname.includes('fonts.gstatic.com') || url.hostname.includes('fonts.googleapis.com')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
          return response;
        });
      })
    );
    return;
  }

  // Assets estáticos (imágenes, css, js) → Cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Solo cachear responses válidas
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
        });
        return response;
      }).catch(() => {
        // Sin red y sin cache: nothing we can do
        console.warn('[SW] Sin red y sin cache para:', event.request.url);
      });
    })
  );
});

// ── BACKGROUND SYNC: para cuando vuelve la conexión ──────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-prayers') {
    // Placeholder para futura funcionalidad de peticiones de oración offline
    console.log('[SW] Background sync: sync-prayers');
  }
});

// ── PUSH NOTIFICATIONS: infraestructura lista ────────────────
self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();
  const options = {
    body: data.body || '¡Hay un nuevo mensaje de MJC Boulogne!',
    icon: '/Logo.png',
    badge: '/Logo.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: 'Ver mensaje' },
      { action: 'close', title: 'Cerrar' }
    ]
  };
  event.waitUntil(
    self.registration.showNotification(
      data.title || 'MJC Boulogne',
      options
    )
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data?.url || '/')
    );
  }
});
