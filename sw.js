//Asignamos el nombre y la version de la cache

const cache_name = 'version1_cache_pwa_krilingJarid';


//Archivos para el cache de la aplicacion
var urlsToCache = [
    './',
    './CSS/estilos.css',
    './js/jquery-3.6.0.min.js',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png'
];


//Eventos del service worker
//Evento install, then --promesa
//Self es el service worker
//Instalar el service worker y guardar los recursos necesarios


self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cache_name)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                    });
            })
            .catch(err => console.log('No se ha registrado el cache', err))
    )


});

//Evento activate
//Para que la app funcione sin conexion a internet

self.addEventListener('activate', e => {

    const cacheWhiteList = [cache_name];

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhiteList.indexOf(cacheName) === -1) {
                            //Elementos que no se necesiten
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                //Activar la cache del dispositivo
                self.clients.claim();
            })
    )
});

//Evento fetch

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    //Devolver los datos desde la cache 
                    return res;
                }
                return fetch(e.request);
            })
    );
});































