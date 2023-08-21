import type { ParentProps } from 'solid-js';
import {
  QueryClient,
  QueryCache,
  QueryClientProvider,
} from '@tanstack/solid-query';

import { SettingsProvider } from '~/lib/settings';
import { FetchError, TimeoutError } from '~/lib/jsonp';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError(error, query) {
      // TODO: use toast to display error
      if (error instanceof FetchError) {
        console.log('Fetch error:', error);
      } else if (error instanceof TimeoutError) {
        console.log('Timeout error:', error);
      } else {
        console.log('Other error:', error);
      }

      console.log('fetchFailureCount', query.state.fetchFailureCount);
    },
  }),
});

export default function Provider(props: ParentProps) {
  return (
    <SettingsProvider>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </SettingsProvider>
  );
}
