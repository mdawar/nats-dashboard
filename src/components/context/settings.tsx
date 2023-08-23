import { createContext, useContext, type ParentProps } from 'solid-js';

import type { ConnzSortOpt } from '~/types';
import { createLocalStore } from '~/lib/localstate';

interface SettingsState {
  connz: {
    /** Connection sorting option. */
    sort: ConnzSortOpt;
  };
}

interface SettingsActions {
  setSortOpt(opt: ConnzSortOpt): void;
}

const defaultSettings: SettingsState = {
  connz: {
    sort: 'cid',
  },
};

const defaultActions: SettingsActions = {
  setSortOpt() {},
};

export type SettingsStore = [state: SettingsState, actions: SettingsActions];

const SettingsContext = createContext<SettingsStore>([
  defaultSettings,
  defaultActions,
]);

interface Props {
  initialState?: SettingsState;
}

export function SettingsProvider(props: ParentProps<Props>) {
  const [state, setState] = createLocalStore<SettingsState>(
    'settings',
    props.initialState ?? defaultSettings
  );

  const actions: SettingsActions = {
    setSortOpt(opt) {
      setState('connz', 'sort', opt);
    },
  };

  return (
    <SettingsContext.Provider value={[state, actions]}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
