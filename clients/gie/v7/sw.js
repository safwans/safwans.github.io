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

workbox.skipWaiting();
workbox.clientsClaim();