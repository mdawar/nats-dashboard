import type { ParentProps } from 'solid-js';
import { QueryClientProvider } from '@tanstack/solid-query';

import { StoreProvider } from '~/components/context/store';
import { SettingsProvider } from '~/components/context/settings';
import { queryClient } from '~/lib/queries';

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
