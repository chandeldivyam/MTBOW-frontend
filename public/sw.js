let cacheData = "appV1"
const urlsToCache = ['offline.html']

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll(urlsToCache)
        })
    )
})

this.addEventListener('fetch', (event) => {
    if(!navigator.onLine){
        event.respondWith(
            caches.match(event.request).then(() => {
                return fetch(event.request).catch(() => caches.match('offline.html'))
            })
        )
    }
})

this.addEventListener('activate', (event) => {
    const cacheWhitelist = []
    cacheWhitelist.push(cacheData)
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)){
                    return caches.delete(cacheName)
                }
            })
        ))
    )
})