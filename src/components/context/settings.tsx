import { createContext, useContext, type ParentProps } from 'solid-js';

import type { ConnState, ConnzSortOpt, SubsOption } from '~/types';
import { createLocalStore } from '~/lib/localstate';
import { closedConnSortOpts } from '~/components/dashboard/pages/connections/options';

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
  /**
   * Set the connz settings.
   *
   * To be used when setting multiple values at once.
   */
  setConnz(settings: Partial<ConnzSettings>): void;
  setConnzState(state: ConnState): void;
  setConnzSort(opt: ConnzSortOpt): void;
  setConnzLimit(limit: number): void;
  setConnzSubs(subs: SubsOption): void;
  setConnzAuth(auth: boolean): void;
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
  setConnzState() {},
  setConnzSort() {},
  setConnzLimit() {},
  setConnzSubs() {},
  setConnzAuth() {},
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
  const [settings, setState] = createLocalStore<SettingsState>(
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
    setConnzState(state) {
      // Reset the sort option if invalid for the new connections state.
      const sort =
        state !== 'closed' && closedConnSortOpts.includes(settings.connz.sort)
          ? 'cid'
          : settings.connz.sort;

      setState('connz', { state, sort });
    },
    setConnzSort(sort) {
      setState('connz', { sort });
    },
    setConnzLimit(limit) {
      setState('connz', { limit });
    },
    setConnzSubs(subs) {
      setState('connz', { subs });
    },
    setConnzAuth(auth) {
      setState('connz', { auth });
    },
  };

  return (
    <SettingsContext.Provider value={[settings, actions]}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
