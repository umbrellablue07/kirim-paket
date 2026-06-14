const CACHE_NAME = 'kirim-paket-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './assets/css/style.css',
    './assets/js/app.js',
    './assets/js/ongkir.js',
    './assets/js/lacak.js',
    './manifest.json'
];

// 1. Memasang Cache (Install Event)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('PWA: Mengunduh aset ke dalam cache...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 2. Mengaktifkan Service Worker & Hapus Cache Lama jika ada update (Activate Event)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('PWA: Menghapus cache usang...', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// 3. Mengambil Aset dari Cache saat Offline (Fetch Event)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Jika ada di cache, pakai cache. Jika tidak, ambil dari internet.
            return cachedResponse || fetch(event.request);
        })
    );
});