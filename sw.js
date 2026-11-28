// IPD app background worker: ONLY shows notifications (Staff Kiosk and IPD Tasks; iPhone/iPad home-screen app and desktop).
// It does not cache or change how the app loads.
self.addEventListener('push', event => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { d = { title: 'IPD App', body: event.data ? event.data.text() : '' }; }
  event.waitUntil(self.registration.showNotification(d.title || 'IPD App', { body: d.body || '', icon: 'icon-400.png', data: { url: d.url || './' } }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    const url = (event.notification.data && event.notification.data.url) || '';
    const task = /[?&](task=|tasks=1)/.test(url);   // IPD Tasks: open that task
    for (const c of list) { if ('focus' in c) { c.postMessage(task ? { openUrl: url } : { open: 'kiosk' }); return c.focus(); } }
    return self.clients.openWindow(task ? url : './?open=kiosk');
  }));
});
