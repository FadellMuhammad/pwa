var webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BL5B5gcrKY0pONnQ6epez7U9dj1qhBj-1LaG9w1hZwQpfcBXgQ6uP7Jz2gR3jCH0sreUiTXu7_4B0xttgyUh8Ns",
   "privateKey": "O1k84R2kQyAB61JzWU-M4xOfgHPiSabgAZ1wxc6oHkM"
};


webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cIsB13-317E:APA91bFGxGHk_UPslA4V4-SBt3YMIPz6H5_SSJQFPOArbRsB-4SjRVpoMDdjaM1S36O92Ng0VVzp-Yzo6nT8dzEUHbI_S8Nz_vf1Tu1YQlHMRLE6vM1ACPbJTqfNj4KI92oio241m4aM",
   "keys": {
      "p256dh": "BLYf1dK1zb/Gtk3NM/FdDNgTUaESShp07Vbyc+xHyMjm0KDlnjbV8EWAOJlzfZc49IHa7A/OShdpQgTH6XhVdSM=",
      "auth": "OEbVODLM33oFPrgPWZqvzw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
   gcmAPIKey: '440622336496',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);