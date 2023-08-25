import { createContext, useContext, type ParentProps } from 'solid-js';

import type { ConnzSortOpt } from '~/types';
import { createLocalStore } from '~/lib/localstate';

interface SettingsState {
  connz: {
    /** Connection sorting option. */
    sort: ConnzSortOpt;
    /** Number of connections to return. */
    limit: number;
  };
}

interface SettingsActions {
  setConnzSort(opt: ConnzSortOpt): void;
  setConnzLimit(limit: number): void;
}

const defaultSettings: SettingsState = {
  connz: {
    sort: 'cid',
    limit: 100,
  },
};

const defaultActions: SettingsActions = {
  setConnzSort() {},
  setConnzLimit() {},
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
    setConnzSort(opt) {
      setState('connz', 'sort', opt);
    },
    setConnzLimit(limit) {
      setState('connz', 'limit', limit);
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
