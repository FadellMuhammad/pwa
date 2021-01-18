importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/icon.png', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/css/style.css', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/sw-article.js', revision: '1' },
  { url: '/sw-register.js', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/push.js', revision: '1' },
  { url: '/service-worker.js', revision: '1' },
  { url: '/article.html', revision: '1' },
],
  {
    ignoreURLParametersMatching: [/.*/],
  }
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'gambar',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/'),
  workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate()
);

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message !';
  }
  var options = {
    body: body,
    icon: 'img/tes.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});



// const CACHE_NAME = "sepakbola-v9";
// var urlsToCache = [
//   "/",
//   "/nav.html",
//   "/index.html",
//   "/icon.png",
//   "/article.html",
//   "/pages/home.html",
//   "/pages/informasi.html",
//   "/pages/jadwal.html",
//   "/pages/saved.html",
//   "/css/materialize.min.css",
//   "/css/style.css",
//   "/js/materialize.min.js",
//   "/js/api.js",
//   "/js/nav.js",
//   "/js/db.js",
//   "/js/idb.js",
//   "/sw-register.js",
//   "/manifest.json",
// ];

// self.addEventListener("install", event => {
//   event.waitUntil(
//       caches.open(CACHE_NAME).then(function (cache) {
//           return cache.addAll(urlsToCache);
//       })
//   );
// })

// self.addEventListener("fetch", function (event) {
//   var base_url = "http://api.football-data.org/v2/";
//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function (cache) {
//         return fetch(event.request).then(function (response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request, { ignoreSearch: true }).then(function (response) {
//         return response || fetch(event.request);
//       })
//     )
//   }
// });

// self.addEventListener("activate", function (event) {
//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           if (cacheName != CACHE_NAME) {
//             console.log("ServiceWorker: cache " + cacheName + " dihapus");
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener('push', function(event) {
//   var body;
//   if (event.data) {
//     body = event.data.text();
//   } else {
//     body = 'Push message no payload';
//   }
//   var options = {
//     body: body,
//     icon: 'img/notification.png',
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: 1
//     }
//   };
//   event.waitUntil(
//     self.registration.showNotification('Push Notification', options)
//   );
// });