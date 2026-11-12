// IPD app background worker: ONLY shows Staff Kiosk notifications (iPhone/iPad home-screen app).
// It does not cache or change how the app loads.
self.addEventListener('push', event => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { d = { title: 'IPD App', body: event.data ? event.data.text() : '' }; }
  event.waitUntil(self.registration.showNotification(d.title || 'IPD App', { body: d.body || '', icon: 'icon-400.png', data: { url: d.url || './' } }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if ('focus' in c) { c.postMessage({ open: 'kiosk' }); return c.focus(); } }
    return self.clients.openWindow('./?open=kiosk');
  }));
});
