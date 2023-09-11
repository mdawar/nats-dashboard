import type { ParentProps } from 'solid-js';
import {
  QueryClient,
  QueryCache,
  QueryClientProvider,
} from '@tanstack/solid-query';

import { StoreProvider } from '~/components/context/store';
import { SettingsProvider } from '~/components/context/settings';
import { FetchError, TimeoutError } from '~/lib/jsonp';
import { notify } from '~/components/Notifications';

const queryClient = new QueryClient({
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

export default function Provider(props: ParentProps) {
  return (
    <StoreProvider>
      <SettingsProvider>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </SettingsProvider>
    </StoreProvider>
  );
}
