//asignar nombre y version de cache
const CACHE_NAME = 'v1_cache_awp';

//configurar los archivos del cache

var urlToCache = [
    './',
    './css/style.css',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/favicon-16.png',
    './img/favicon-32.png',
    './img/favicon-64.png',
    './img/favicon-96.png',
    './img/favicon-128.png',
    './img/favicon-144.png',
    './img/favicon-192.png',
    './img/favicon-256.png',
    './img/favicon-384.png',
    './img/favicon-512.png',
    './img/favicon-1024.png',
    './img/favicon.png',
    './img/instagram.png',
    './img/twiter.png',
];

// Evento install
// Instalacion del service worker y guardar en cache los recursos estaticos
self.addEventListener('install', e =>{
    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => {
                    return cache.addAll(urlToCache)
                           .then(() => {
                                self.skipWaiting();
                           })
                 })
                 .catch(err => {
                    console.log('No se ha registrado el cache', err);
                   })
    )
});

//Evento activate
self.addEventListener('activate', e =>{
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
              .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if(cacheWhiteList.indexOf(cacheName) === -1){
                            // Borrar los elementos q no se necesitan
                            return caches.delete(cacheName);
                        }
                    })
                );
              })
              .then(() =>{
                //activar la cache
                self.clients.claim();
              })
    );
});

//Evento fetch

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    //devuelvo los datos desde cache
                    return res;
                }
                return fetch(e.request);
            })
    );
})