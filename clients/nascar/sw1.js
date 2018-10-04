importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

workbox.core.setCacheNameDetails({
  prefix: '',
  suffix: '',
  precache: 'nascar-cache',
  runtime: 'nascar-cache'
});

workbox.precaching.precache([
  'https://m.nascar.com/wp-content/uploads/sites/7/2017/12/NASCAR_Barmark_Logo-1.svg',  
  'https://m.nascar.com/wp-content/themes/ndms-2016/images/loading-gif3.gif',
  'https://m.nascar.com/wp-content/themes/ndms-2016/images/lazy-placeholder.jpg',
  'https://m.nascar.com/wp-content/themes/ndms-2016/style.css?ver=1.145',
  'https://m.nascar.com/wp-content/themes/ndms-2016/css/custom-nascar.css',
  'https://m.nascar.com/wp-content/themes/ndms-2016/fonts/stainless/Stainless-Regular/Stainless-Regular.woff2',
  'https://m.nascar.com/wp-content/themes/ndms-2016/fonts/stainless/Stainless-Bold/Stainless-Bold.woff2',
  'https://m.nascar.com/wp-content/themes/ndms-2016/fonts/stainless/Stainless-Black/Stainless-Black.woff2',
  'offline.html',
  'https://m.nascar.com/monster-energy-nascar-cup-series/2018/schedule/'
]);

const htmlHandler = workbox.strategies.networkOnly();


//A NavigationRoute matches navigation requests in the browser, i.e. requests for HTML.
const navigationRoute = new workbox.routing.NavigationRoute(({event}) => {
return htmlHandler.handle({event}).catch(() => caches.match('./offline.html'));
});

workbox.routing.registerRoute(navigationRoute);

workbox.routing.registerRoute(
    new RegExp('.*\/wp-content\/.*\.(?:css|jpg|woff2)'),
    workbox.strategies.cacheFirst({
      cacheName: 'nascar-cache'
    })
);

workbox.skipWaiting();
workbox.clientsClaim();