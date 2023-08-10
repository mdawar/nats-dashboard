import { createEffect, onCleanup } from 'solid-js';
import { useStore } from '~/lib/store';
import { createPoller } from '~/lib/poller';
import { fetchInfo } from '~/lib/info';
import { FetchError, TimeoutError } from '~/lib/jsonp';

/** The monitoring service is responsible for making requests to the monitoring server. */
export function useMonitoringService() {
  const [store, actions] = useStore();

  const poller = createPoller(() => fetchInfo(store.url, 'varz'), {
    interval: 1000,
    onSuccess: (varz) => {
      actions.setVarz(varz);
    },
    onError: (error) => {
      // TODO: should not stop on first error (Maybe user defined option).
      actions.setActive(false);
      if (error instanceof FetchError) {
        console.log('Fetch error:', error);
      } else if (error instanceof TimeoutError) {
        console.log('Timeout error:', error);
      } else {
        console.log('Other error:', error);
      }
    },
  });

  createEffect(() => {
    store.active ? poller.start() : poller.stop();
  });

  onCleanup(poller.stop);
}
