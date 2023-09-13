import { createContext, useContext, type ParentProps } from 'solid-js';

import type { ConnState, ConnzSortOpt, SubsOption } from '~/types';
import { createLocalStore } from '~/lib/localstate';
import { closedConnSortOpts } from '~/components/dashboard/connections/options';

interface SettingsState {
  /** Polling interval in milliseconds.. */
  interval: number;
  /** Connz settings. */
  connz: ConnzSettings;
  /** JetStream settings. */
  jsz: JszSettings;
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

interface JszSettings {
  /** Include account specific JetStream information (Default: false). */
  accounts: boolean;
  /** Include streams. When set, implies accounts=true (Default: false). */
  streams: boolean;
  /** Include consumers. When set, implies streams=true (Default: false). */
  consumers: boolean;
  /** Include the stream and consumer config when they're requested (Default: false). */
  config: boolean;
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
  setJszAccounts(accounts: boolean): void;
  setJszStreams(streams: boolean): void;
  setJszConsumers(consumers: boolean): void;
  setJszConfig(config: boolean): void;
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
  jsz: {
    accounts: false,
    streams: false,
    consumers: false,
    config: false,
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
  setJszAccounts() {},
  setJszStreams() {},
  setJszConsumers() {},
  setJszConfig() {},
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
    setJszAccounts(accounts) {
      setState('jsz', { accounts });
    },
    setJszStreams(streams) {
      const accounts = streams || settings.jsz.accounts;
      setState('jsz', { accounts, streams });
    },
    setJszConsumers(consumers) {
      const accounts = consumers || settings.jsz.accounts;
      const streams = consumers || settings.jsz.streams;
      setState('jsz', { accounts, streams, consumers });
    },
    setJszConfig(config) {
      setState('jsz', { config });
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
