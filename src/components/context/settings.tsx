import { createContext, useContext, type ParentProps } from 'solid-js';

import type { ConnState, ConnzSortOpt, SubsOption } from '~/types';
import { createLocalStore } from '~/lib/localstate';

interface SettingsState {
  /** Polling interval in milliseconds.. */
  interval: number;
  /** Connz settings. */
  connz: ConnzSettings;
}

interface ConnzSettings {
  /** Connections state (Default: open). */
  state: ConnState;
  /** Connection sorting option (Default: cid). */
  sort: ConnzSortOpt;
  /** Number of connections to return (Default: 100). */
  limit: number;
  /** Include subscriptions info. */
  subs: SubsOption;
  /** Include authentication info. */
  auth: boolean;
}

interface SettingsActions {
  /** Set the polling interval in milliseconds. */
  setInterval(interval: number): void;
  /** Set the connz settings. */
  setConnz(settings: Partial<ConnzSettings>): void;
}

const defaultSettings: SettingsState = {
  interval: 1000, // 1s
  connz: {
    state: 'open',
    sort: 'cid',
    limit: 100,
    subs: false,
    auth: false,
  },
};

const defaultActions: SettingsActions = {
  setInterval() {},
  setConnz() {},
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
    setConnz(settings) {
      setState('connz', settings);
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
