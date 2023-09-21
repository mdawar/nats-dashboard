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
  /** Connz query specific settings. */
  query: {
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
  };
}

interface JszSettings {
  /** Jsz query specific settings. */
  query: {
    /** Include account specific JetStream information (Default: false). */
    accounts: boolean;
    /** Include streams. When set, implies accounts=true (Default: false). */
    streams: boolean;
    /** Include consumers. When set, implies streams=true (Default: false). */
    consumers: boolean;
    /** Include the stream and consumer config when they're requested (Default: false). */
    config: boolean;
  };
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
    query: {
      state: 'open',
      sort: 'cid',
      limit: 100,
      subs: false,
      auth: false,
    },
  },
  jsz: {
    query: {
      accounts: false,
      streams: false,
      consumers: false,
      config: false,
    },
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
        state !== 'closed' &&
        closedConnSortOpts.includes(settings.connz.query.sort)
          ? 'cid'
          : settings.connz.query.sort;

      setState('connz', 'query', { state, sort });
    },
    setConnzSort(sort) {
      setState('connz', 'query', { sort });
    },
    setConnzLimit(limit) {
      setState('connz', 'query', { limit });
    },
    setConnzSubs(subs) {
      setState('connz', 'query', { subs });
    },
    setConnzAuth(auth) {
      setState('connz', 'query', { auth });
    },
    setJszAccounts(accounts) {
      setState('jsz', 'query', { accounts });
    },
    setJszStreams(streams) {
      const accounts = streams || settings.jsz.query.accounts;
      setState('jsz', 'query', { accounts, streams });
    },
    setJszConsumers(consumers) {
      const accounts = consumers || settings.jsz.query.accounts;
      const streams = consumers || settings.jsz.query.streams;
      setState('jsz', 'query', { accounts, streams, consumers });
    },
    setJszConfig(config) {
      setState('jsz', 'query', { config });
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
