import type { ParentProps } from 'solid-js';
import {
  QueryClient,
  QueryCache,
  QueryClientProvider as SolidQueryClientProvider,
} from '@tanstack/solid-query';

import { FetchError, TimeoutError } from '~/lib/jsonp';
import { useStore } from '~/components/context/store';
import { notify } from '~/components/Notifications';

export default function QueryClientProvider(props: ParentProps) {
  const [_, actions] = useStore();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError(error, query) {
        // Disable polling on errors.
        actions.setActive(false);

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

  return <SolidQueryClientProvider client={queryClient} {...props} />;
}
