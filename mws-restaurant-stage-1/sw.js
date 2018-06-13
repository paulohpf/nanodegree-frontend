self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('restaurant-static-v1').then(function (cache) {
			return cache.addAll(
				[
					'/',
					'index.html',
					'restaurant.html',
					'manifest.json',
					'css/styles.css',
					'js/dbhelper.js',
					'js/main.js',
					'js/restaurant_info.js',
					'js/sw_registration.js',
					'node_modules/idb/lib/idb.js',
					'img/1.jpg',
					'img/2.jpg',
					'img/3.jpg',
					'img/4.jpg',
					'img/5.jpg',
					'img/6.jpg',
					'img/7.jpg',
					'img/8.jpg',
					'img/9.jpg',
					'img/10.jpg'
				]
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('restaurant-static-v1').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});