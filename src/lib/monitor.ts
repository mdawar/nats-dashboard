import { createQuery } from '@tanstack/solid-query';

import { useStore } from '~/lib/store';
import { fetchInfo } from '~/lib/info';

/** Start polling for general server information. */
export function useVarz() {
  const [store] = useStore();

  const query = createQuery(() => ({
    queryKey: [store.url, 'varz'],
    queryFn: () => fetchInfo(store.url, 'varz'),
    placeholderData: {},
    enabled: store.active,
    refetchInterval: 1000,
    reconcile: false,
  }));

  return query;
}
