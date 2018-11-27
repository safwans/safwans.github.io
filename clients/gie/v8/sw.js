importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');
workbox.core.setCacheNameDetails({
  prefix: '',
  suffix: '',
  precache: 'gie-cache',
  runtime: 'gie-cache'
});

workbox.precaching.precache([
  'offline.html',
  'appicon.png'
]);

const htmlHandler = workbox.strategies.networkOnly();

//A NavigationRoute matches navigation requests in the browser, i.e. requests for HTML.
const navigationRoute = new workbox.routing.NavigationRoute(({event}) => {
return htmlHandler.handle({event}).catch(() => caches.match('./offline.html'));
});

workbox.routing.registerRoute(navigationRoute);

workbox.routing.registerRoute(
    new RegExp('.*\.(?:css|jpg|gif|svg|woff2).*'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'gie-cache'
    })
);

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