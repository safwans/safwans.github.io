importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precache([
  'globalIndustrial-autosuggest.css.gz'
]);

workbox.routing.registerRoute(
    new RegExp('.*\.(?:jpg|gif|svg|png|woff2).*'),
    workbox.strategies.staleWhileRevalidate()
);

workbox.skipWaiting();
workbox.clientsClaim();