import type { QueryClient, QueryKey } from '@tanstack/solid-query';

import type { EndpointWithDate, EndpointResponse } from '~/types';
import type { APIResponses } from '~/lib/format';

/**
 * Get the newest query data from an array of previous results.
 *
 * To be used for endpoints that return a `now` date string.
 */
export function newestQueryData<T extends EndpointWithDate>(
  data: [QueryKey, APIResponses<T> | undefined][]
): APIResponses<T> | undefined {
  const filtered = data
    .map(([_, response]) => response)
    .filter((r): r is APIResponses<T> => r !== undefined);

  let newest = filtered[0];

  // Find the newest response.
  for (const response of filtered) {
    if (new Date(response.current.now) > new Date(newest?.current.now ?? 0)) {
      newest = response;
    }
  }

  return newest;
}

interface PrevQueryDataParams {
  client: QueryClient;
  queryKey: QueryKey;
  exact?: boolean;
}

/** Get the previous query response from the cache. */
export function getPrevQueryResponse<T extends EndpointWithDate>({
  client,
  queryKey,
  exact = false,
}: PrevQueryDataParams): EndpointResponse[T] | undefined {
  const data = client.getQueriesData<APIResponses<T>>({
    queryKey,
    exact,
  });

  const newest = newestQueryData(data);
  return newest?.current;
}
