import type { ParentProps } from 'solid-js';

import { StoreProvider } from '~/components/context/store';
import { SettingsProvider } from '~/components/context/settings';
import QueryClientProvider from '~/components/dashboard/QueryClientProvider';

export default function Providers(props: ParentProps) {
  return (
    <StoreProvider>
      <SettingsProvider>
        <QueryClientProvider>{props.children}</QueryClientProvider>
      </SettingsProvider>
    </StoreProvider>
  );
}
