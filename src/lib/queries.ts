import { createQuery } from '@tanstack/solid-query';

import type { ConnzOptions, JszOptions } from '~/types';
import { useStore } from '~/components/context/store';
import { useSettings } from '~/components/context/settings';
import { fetchInfo } from '~/lib/info';
import { formatVarz, formatConnz, formatJsz } from '~/lib/format';
import { createMemo } from 'solid-js';

type VarzFetchParams = Parameters<typeof fetchInfo<'varz'>>;

/** Start polling for general server information. */
export function useVarz() {
  const [store] = useStore();
  const [settings] = useSettings();

  return createQuery(() => ({
    queryKey: [store.url, 'varz'] as VarzFetchParams,
    queryFn: ({ queryKey }) => fetchInfo(...queryKey),
    select: formatVarz, // Fromat the data for display.
    enabled: store.active,
    refetchInterval: settings.interval,
    reconcile: false,
    meta: {
      errorTitle: 'Server Information',
      errorMessage: 'Cannot fetch the server information.',
    },
  }));
}

type ConnzFetchParams = Parameters<typeof fetchInfo<'connz'>>;

/** Start polling for connections information. */
export function useConnz(options?: () => ConnzOptions) {
  const [store] = useStore();
  const [settings] = useSettings();

  const optsMemo = createMemo(() => options?.());

  return createQuery(() => ({
    queryKey: [store.url, 'connz', optsMemo()] as ConnzFetchParams,
    queryFn: ({ queryKey }) => fetchInfo(...queryKey),
    select: formatConnz, // Fromat the data for display.
    enabled: store.active,
    refetchInterval: settings.interval,
    reconcile: false,
    meta: {
      errorTitle: 'Connections',
      errorMessage: 'Cannot fetch the connections information.',
    },
  }));
}

type JszFetchParams = Parameters<typeof fetchInfo<'jsz'>>;

/** Start polling for JetSteam information. */
export function useJsz(options?: () => JszOptions) {
  const [store] = useStore();
  const [settings] = useSettings();

  const optsMemo = createMemo(() => options?.());

  return createQuery(() => ({
    queryKey: [store.url, 'jsz', optsMemo()] as JszFetchParams,
    queryFn: ({ queryKey }) => fetchInfo(...queryKey),
    select: formatJsz, // Fromat the data for display.
    enabled: store.active,
    refetchInterval: settings.interval,
    reconcile: false,
    meta: {
      errorTitle: 'JetStream',
      errorMessage: 'Cannot fetch the JetStream server information.',
    },
  }));
}

export type JszQuery = ReturnType<typeof useJsz>;
