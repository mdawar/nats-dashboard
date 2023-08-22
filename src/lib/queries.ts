import { createQuery } from '@tanstack/solid-query';

import type { ConnzOptions } from '~/types';
import { useStore } from '~/components/context/store';
import { fetchInfo } from '~/lib/info';
import { formatVarz, formatConnz } from '~/lib/format';
import { createMemo } from 'solid-js';

type VarzFetchParams = Parameters<typeof fetchInfo<'varz'>>;

/** Start polling for general server information. */
export function useVarz() {
  const [store] = useStore();

  return createQuery(() => ({
    queryKey: [store.url, 'varz'] as VarzFetchParams,
    queryFn: ({ queryKey }) => fetchInfo(...queryKey),
    select: formatVarz, // Fromat the data for display.
    placeholderData: {},
    enabled: store.active,
    refetchInterval: 1000,
    reconcile: false,
  }));
}

type ConnzFetchParams = Parameters<typeof fetchInfo<'connz'>>;

/** Start polling for connections information. */
export function useConnz(options?: () => ConnzOptions) {
  const [store] = useStore();
  const optsMemo = createMemo(() => options?.());

  return createQuery(() => ({
    queryKey: [store.url, 'connz', optsMemo()] as ConnzFetchParams,
    queryFn: ({ queryKey }) => fetchInfo(...queryKey),
    select: formatConnz, // Fromat the data for display.
    placeholderData: {},
    enabled: store.active,
    refetchInterval: 1000,
    reconcile: false,
  }));
}
