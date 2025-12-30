const CACHE_NAME = 'ibuildrun-v3';
const STATIC_CACHE = 'ibuildrun-static-v3';
const OFFLINE_URL = '/offline.html';

// Core assets to precache
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/favicon.svg',
];

// Install - precache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== STATIC_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Check if request is for static asset (immutable)
function isStaticAsset(url) {
  return url.includes('/_next/static/') ||
         url.match(/\.(js|css|woff2?|ttf|eot|otf)(\?.*)?$/);
}

// Check if request is for media/images
function isMediaAsset(url) {
  return url.match(/\.(ico|svg|png|jpg|jpeg|gif|webp|mp4|webm)(\?.*)?$/);
}

// Cache-first strategy for static assets
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response('', { status: 404 });
  }
}

// Stale-while-revalidate for HTML/dynamic content
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      const cache = caches.open(CACHE_NAME);
      cache.then((c) => c.put(request, response.clone()));
    }
    return response;
  }).catch(() => null);

  // Return cached immediately, update in background
  if (cached) {
    fetchPromise; // Fire and forget
    return cached;
  }

  // No cache, wait for network
  const response = await fetchPromise;
  return response || caches.match(OFFLINE_URL);
}

// Network-first for navigation (with offline fallback)
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return caches.match(OFFLINE_URL);
  }
}

// Fetch handler
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = request.url;

  // Skip non-http(s) requests
  if (!url.startsWith('http')) return;

  // Skip external requests (API calls, analytics, etc.)
  if (!url.includes(self.location.origin)) return;

  // Navigation requests - network first with offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  // Static assets (JS, CSS, fonts) - cache first (immutable)
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Media assets - cache first
  if (isMediaAsset(url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Everything else - stale-while-revalidate
  event.respondWith(staleWhileRevalidate(request));
});

// Handle messages from main thread
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  // Force cache refresh
  if (event.data === 'clearCache') {
    caches.keys().then((names) => {
      names.forEach((name) => caches.delete(name));
    });
  }
});
