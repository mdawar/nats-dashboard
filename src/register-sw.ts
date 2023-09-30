async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      // On update, ask the user to reload the page.
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;

        worker?.addEventListener('statechange', () => {
          if (worker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              const ok = confirm(
                'New version available! Do you want to reload and update?'
              );

              if (ok) {
                window.location.reload();
              }
            }
          }
        });
      });
    } catch (error) {
      console.error(`Service worker registration failed with ${error}`);
    }
  }
}

if (import.meta.env.PROD) {
  registerServiceWorker();
}
