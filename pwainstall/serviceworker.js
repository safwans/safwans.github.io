importScripts('https://cdn.onesignal.com/sdks/OneSignalSDK.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute([
  'news_2x.png',
  'offline.html' 
]);

const htmlHandler = new workbox.strategies.NetworkOnly();
function navigationHandler(options) {
  return htmlHandler.handle(options)
     .catch(() => caches.match(workbox.precaching.getCacheKeyForURL('./offline.html')));
}

//requests for HTML.
const navigationRoute = new workbox.routing.NavigationRoute(navigationHandler);

workbox.routing.registerRoute(navigationRoute);

workbox.core.skipWaiting();
workbox.core.clientsClaim();
