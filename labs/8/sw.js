//https://codelabs.developers.google.com/codelabs/offline/index.html#7

importScripts('./cache-polyfill.js');
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('airhorner').then(function(cache) {
            return cache.addAll([
                './',
                'index.html',
                'index.html?homescreen=1',
                '?homescreen=1',
                'styles/main.css',
                'scripts/main.min.js',
                'sounds/airhorn.mp3'
            ]);
        })
    );
});

/*

The first line adds the Cache polyfill. 
This polyfill is already included in the repository. 
We need to use the polyfill because the Cache API is not yet fully supported in all browsers. 
Next comes the install event listener. The install event listener opens the caches object and then populates it with the list of resources that we want to cache. 
One important thing about the addAll operation is that it's all or nothing. If one of the files is not present or fails to be fetched, the entire addAll operation fails. 
A good application will handle this scenario.

*/


self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

/*

One powerful feature of service workers is that, once a service worker controls a page, it can intercept every request that the page makes and decide what to do with the request. In this section you are going to program your service worker to intercept requests and return the cached versions of assets, rather than going to the network to retrieve them.

The first step is to attach an event handler to the fetch event. This event is triggered for every request that is made.

Add the following code to the bottom of your sw.js to log the requests made from the parent page.
*/
