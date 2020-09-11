const staticCacheName = 'site-static-v2';
const dynamicCaheName = 'site-dynamic';

const assets = [
  'index.html',
  '/fallback.html',
  'js/app.js',
  'js/ui.js',
  'css/main.css',
  'assets/Search-big.svg',
  'assets/bg.jpg',
  'assets/weather-icon144.png',
  'assets/weather-icon256.png',
  'assets/weather-icon512.png',
];

// install service worker
self.addEventListener('install', (evt) => {
  //   console.log('service worker has been installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', (evt) => {
  console.log('service worker has been activated');
  evt.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCaheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', (evt) => {
  //   console.log('fetch event', evt);
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCaheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              return fetchRes;
            });
          })
        );
      })
      .catch(() => caches.match('/whatever/fallback.html'))
  );
});
