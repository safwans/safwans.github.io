importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precache([
  'globalIndustrial-autosuggest.css.gz',
  'offline.html'
]);

workbox.routing.registerRoute(
    new RegExp('.*\.(?:jpg|gif|svg|png|woff2).*'),
    workbox.strategies.staleWhileRevalidate()
);

const htmlHandler = workbox.strategies.networkOnly();

//requests for HTML.
const navigationRoute = new workbox.routing.NavigationRoute(({event}) => {
return htmlHandler.handle({event}).catch(() => caches.match('./offline.html'));
});

workbox.routing.registerRoute(navigationRoute);


self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push from Heaven';
  const options = {
    body: 'It\'s beautiful out here',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});


workbox.skipWaiting();
workbox.clientsClaim();
