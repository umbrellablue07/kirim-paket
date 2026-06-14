// ==========================================
// 1. LOGIKA NAVIGASI HALAMAN (SPA SYSTEM)
// ==========================================

function switchPage(pageId) {
    // A. Sembunyikan semua halaman terlebih dahulu
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // B. Matikan semua status aktif di tombol navigasi bawah
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => {
        nav.classList.remove('active');
    });

    // C. Munculkan halaman yang dipilih
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // D. Aktifkan tombol navigasi bawah yang sesuai
    const targetNav = document.getElementById(`nav-${pageId}`);
    if (targetNav) {
        targetNav.classList.add('active');
    }
    
    // Otomatis scroll ke atas setiap kali pindah halaman
    window.scrollTo(0, 0);
}

// Jalankan halaman 'home' sebagai halaman utama saat aplikasi pertama kali dimuat
document.addEventListener('DOMContentLoaded', () => {
    switchPage('home');
});


// ==========================================
// 2. REGISTRASI SERVICE WORKER (PWA)
// ==========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('PWA: Service Worker berhasil didaftarkan dengan scope:', registration.scope);
            })
            .catch(error => {
                console.error('PWA: Registrasi Service Worker gagal:', error);
            });
    });
}