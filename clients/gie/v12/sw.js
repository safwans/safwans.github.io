importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

workbox.precaching.precache([
  'https://d21gpk1vhmjuf5.cloudfront.net/globalIndustrial-autosuggest.css',
  'offline.html'
]);

const htmlHandler = workbox.strategies.networkOnly();

const navigationRoute = new workbox.routing.NavigationRoute(({event}) => {
  return htmlHandler.handle({event}).catch(() => caches.match('./offline.html'));
});

workbox.routing.registerRoute(
    new RegExp('.*\.(?:jpg|gif|svg|png|woff2).*'),
    workbox.strategies.staleWhileRevalidate()
);


workbox.skipWaiting();
workbox.clientsClaim();
