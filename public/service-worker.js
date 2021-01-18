// Periksa service worker
if (!('serviceWorker' in navigator)) {
    console.log("Service worker tidak didukung browser ini.");
} else {
    registerServiceWorker();
}
// Register service worker
function registerServiceWorker() {
    return navigator.serviceWorker.register('service-worker.js')
        .then(function (registration) {
            console.log('Registrasi service worker berhasil.');
            return registration;
        })
        .catch(function (err) {
            console.error('Registrasi service worker gagal.', err);
        });
}

// Periksa fitur Notification API
if ("Notification" in window) {
    requestPermission();
} else {
    console.error("Browser tidak mendukung notifikasi.");
}

// Meminta ijin menggunakan Notification API
function requestPermission() {
    Notification.requestPermission().then(function (result) {
        if (result === "denied") {
            console.log("Fitur notifikasi tidak diijinkan.");
            return;
        } else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan ijin.");
            return;
        }

        console.log("Fitur notifikasi diijinkan.");
    });
}

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    if (!event.action) {
      // Penguna menyentuh area notifikasi diluar action
      console.log('Notification Click.');
      return;
    }
    switch (event.action) {
      case 'yes-action':
        console.log('Pengguna memilih action yes.');
        // buka tab baru
        clients.openWindow('https://google.com');
        break;
      case 'no-action':
        console.log('Pengguna memilih action no');
        break;
      default:
        console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
        break;
    }
  });

  if (!event.action) {
    // Penguna menyentuh area notifikasi diluar action
    console.log('Notification Click.');
    return;
}