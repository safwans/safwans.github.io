/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

(function() {
  'use strict';

  var filesToCache = [
    '.',
    'style/main.css',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
    'images/still_life-1600_large_2x.jpg',
    'images/still_life-800_large_1x.jpg',
    'images/still_life_small.jpg',
    'images/still_life_medium.jpg',
    'index.html',
    'pages/offline.html',
    'pages/404.html'
    ]

  var cacheName = 'cache2';

  // TODO 2 - cache the application shell
  self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache){
          cache.addAll(filesToCache);
        })
    );
  });

  // TODO 3 - intercept network requests
  self.addEventListener('fetch', function(event){
    console.log('fetch request');
    event.respondWith(
      caches.open(cacheName)
      .then(function(cache){
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request).then(function(response){
            if (response.status === 404) {
              return caches.match('pages/404.html');
            } 
            cache.put(event.request, response.clone());
            return response;
        });
      });
      })
      .catch(function(err){
        console.log('err:', err);
        return caches.match('pages/offline.html');
      })
    );
  });


  // TODO 7 - delete unused caches
  self.addEventListener('activate', function(event){
    var cacheWhiteList = [cacheName];
    event.waitUntil(
      caches.keys().then(function(keyList){
        return Promise.all(keyList.map(function(key){
          if(cacheWhiteList.indexOf(key) === -1){
            return caches.delete(key);
          }
        }));
      })    
    );
  });

})();
