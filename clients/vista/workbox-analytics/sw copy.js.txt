importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

workbox.setConfig({
  debug: true
});


workbox.googleAnalytics.initialize();

workbox.skipWaiting();
workbox.clientsClaim();
