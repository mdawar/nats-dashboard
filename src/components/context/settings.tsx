import { createContext, useContext, type ParentProps } from 'solid-js';

import type { ConnState, ConnzSortOpt, SubsOption } from '~/types';
import { createLocalStore } from '~/lib/localstate';
import { closedConnSortOpts } from '~/components/dashboard/connections/options';

interface SettingsState {
  /** Polling interval in milliseconds.. */
  interval: number;
  /** Use JSONP to fetch the data (For servers prior to v2.9.22). */
  jsonp: boolean;
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
    /** Number of connections to return (Default: 50). */
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
    /** Include account specific JetStream information (Default: true). */
    accounts: boolean;
    /** Include streams. When set, implies accounts=true (Default: true). */
    streams: boolean;
    /** Include consumers. When set, implies streams=true (Default: false). */
    consumers: boolean;
    /** Include the stream and consumer config when they're requested (Default: false). */
    config: boolean;
  };
  /** Number of streams to display on each page. */
  pageSize: number;
}

interface SettingsActions {
  /** Set the polling interval in milliseconds. */
  setInterval(interval: number): void;
  /** Set the option to use JSONP for the requests. */
  setJSONP(jsonp: boolean): void;
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
  setJszStreamsPageSize(size: number): void;
}

const defaultSettings: SettingsState = {
  interval: 1000, // 1s
  jsonp: false,
  connz: {
    query: {
      state: 'open',
      sort: 'cid',
      limit: 50,
      subs: false,
      auth: false,
    },
  },
  jsz: {
    query: {
      accounts: true,
      streams: true,
      consumers: false,
      config: false,
    },
    pageSize: 10,
  },
};

const defaultActions: SettingsActions = {
  setInterval() {},
  setJSONP() {},
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
  setJszStreamsPageSize() {},
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
    setJSONP(jsonp) {
      setState('jsonp', jsonp);
    },
    setConnz(settings) {
      setState('connz', settings);
    },
    setConnzState(state) {
      setState('connz', 'query', (prev) => {
        // Reset the sort option if invalid for the new connections state.
        const sort =
          state !== 'closed' && closedConnSortOpts.includes(prev.sort)
            ? 'cid'
            : prev.sort;

        return { state, sort };
      });
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
      setState('jsz', 'query', (prev) => {
        const accounts = streams || prev.accounts;
        return { accounts, streams };
      });
    },
    setJszConsumers(consumers) {
      setState('jsz', 'query', (prev) => {
        const accounts = consumers || prev.accounts;
        const streams = consumers || prev.streams;
        return { accounts, streams, consumers };
      });
    },
    setJszConfig(config) {
      setState('jsz', 'query', { config });
    },
    setJszStreamsPageSize(pageSize) {
      setState('jsz', { pageSize });
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
