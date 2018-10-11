importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

workbox.setConfig({
  debug: true
});


workbox.googleAnalytics.initialize({
  parameterOverrides: {
    cd1: 'offline',
  },
})

workbox.skipWaiting();
workbox.clientsClaim();
