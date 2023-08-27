import { createContext, useContext, type ParentProps } from 'solid-js';

import type { ConnzSortOpt } from '~/types';
import { createLocalStore } from '~/lib/localstate';

interface SettingsState {
  /** Polling interval in milliseconds.. */
  interval: number;
  /** Connz settings. */
  connz: {
    /** Connection sorting option. */
    sort: ConnzSortOpt;
    /** Number of connections to return. */
    limit: number;
  };
}

interface SettingsActions {
  setInterval(interval: number): void;
  setConnzSort(opt: ConnzSortOpt): void;
  setConnzLimit(limit: number): void;
}

const defaultSettings: SettingsState = {
  interval: 1000, // 1s
  connz: {
    sort: 'cid',
    limit: 100,
  },
};

const defaultActions: SettingsActions = {
  setInterval() {},
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
    setInterval(interval) {
      setState('interval', interval);
    },
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
