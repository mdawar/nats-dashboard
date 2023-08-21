import type { ParentProps } from 'solid-js';

import { SettingsProvider } from '~/lib/settings';

export default function Provider(props: ParentProps) {
  return (
    <SettingsProvider initialState={{ connz: { sortOpt: 'rtt' } }}>
      {props.children}
    </SettingsProvider>
  );
}
