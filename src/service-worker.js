import { precacheAndRoute } from 'workbox-precaching';


precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('push', (event) => {
  console.log('Service Worker: Push Received.');
  console.log(`Service Worker: Push had this data: "${event.data.text()}"`);

  let data;
  try {
    data = event.data.json();
  } catch (e) {
    data = {
      title: 'Pemberitahuan Baru',
      options: {
        body: event.data.text(),
        icon: '/icons/icon-192x192.png',
      },
    };
  }
  
  const title = data.title;
  const options = {
    body: data.options.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    vibrate: [200, 100, 200],
   
  };

  event.waitUntil(self.registration.showNotification(title, options));
});