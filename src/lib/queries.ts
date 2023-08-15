import { createQuery } from '@tanstack/solid-query';

import type { ConnzOptions } from '~/types';
import { useStore } from '~/lib/store';
import { fetchInfo } from '~/lib/info';
import { formatVarz, formatConnz } from '~/lib/format';
import { createMemo } from 'solid-js';

/** Start polling for general server information. */
export function useVarz() {
  const [store] = useStore();

  return createQuery(() => ({
    queryKey: [store.url, 'varz'],
    queryFn: () => fetchInfo(store.url, 'varz'),
    select: formatVarz, // Fromat the data for display.
    placeholderData: {},
    enabled: store.active,
    refetchInterval: 1000,
    reconcile: false,
  }));
}

/** Start polling for connections information. */
export function useConnz(options?: () => ConnzOptions) {
  const [store] = useStore();
  const optsMemo = createMemo(() => options?.());

  return createQuery(() => ({
    queryKey: [store.url, 'connz', optsMemo()],
    queryFn: () => fetchInfo(store.url, 'connz', optsMemo()),
    select: formatConnz, // Fromat the data for display.
    placeholderData: {},
    enabled: store.active,
    refetchInterval: 1000,
    reconcile: false,
  }));
}
