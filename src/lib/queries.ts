import { createMemo } from 'solid-js';
import { QueryClient, QueryCache, createQuery } from '@tanstack/solid-query';

import type { ConnzOptions, JszOptions } from '~/types';
import { useStore } from '~/components/context/store';
import { useSettings } from '~/components/context/settings';
import { formatVarz, formatConnz, formatJsz } from '~/lib/format';
import { FetchError, TimeoutError } from '~/lib/jsonp';
import { fetchInfo, type InfoResponse } from '~/lib/info';
import { notify } from '~/components/Notifications';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError(error, query) {
      let title = query.meta?.errorTitle as string | undefined;
      let message = query.meta?.errorMessage as string | undefined;

      if (!title || !message) {
        if (error instanceof FetchError) {
          title ??= 'Fetch Error';
          message ??= 'Cannot fetch the data from the server.';
        } else if (error instanceof TimeoutError) {
          title ??= 'Timed out';
          message ??= 'Fetching the data took too long.';
        } else {
          title ??= 'Unexpected out';
          message ??= 'The was an unexpected error while fetching the data.';
        }
      }

      notify({ title, message, icon: 'error', timeout: 5000 });
    },
  }),
});

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

export type VarzQuery = ReturnType<typeof useVarz>;

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
    // Set the initial data from a previous query to keep the same state
    // when changing the fetch settings.
    initialData: () => {
      const data = queryClient.getQueriesData<Partial<InfoResponse<'connz'>>>({
        queryKey: [store.url, 'connz'],
        exact: false,
      });

      // Return the last query's data or undefined for no initial data.
      return data[data.length - 1]?.[1] as Partial<InfoResponse<'connz'>>;
    },
  }));
}

export type ConnzQuery = ReturnType<typeof useConnz>;

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
    // Set the initial data from a previous query to keep the same state
    // when changing the fetch settings.
    initialData: () => {
      // Returns found queries as arrays of [queryKey, data].
      const data = queryClient.getQueriesData<Partial<InfoResponse<'jsz'>>>({
        queryKey: [store.url, 'jsz'],
        exact: false, // We want a partial queryKey match.
      });

      // Return the last query's data or undefined for no initial data.
      return data[data.length - 1]?.[1] as Partial<InfoResponse<'jsz'>>;
    },
  }));
}

export type JszQuery = ReturnType<typeof useJsz>;
