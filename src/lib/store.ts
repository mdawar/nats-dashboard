import { createStore } from 'solid-js/store';
import type { PartialServerStats } from '~/lib/stats';

interface StoreState {
  url: string;
  active: boolean;
  stats: PartialServerStats;
}

interface StoreActions {
  setActive(active: boolean): void;
  toggleActive(): void;
  setURL(url: string): void;
  setServerStats(stats: PartialServerStats): void;
}

const defaultStore: StoreState = {
  url: '',
  active: false,
  stats: {},
};

const store = createStore<StoreState>(defaultStore);

export type StatsStore = [state: StoreState, actions: StoreActions];

export function useStore(): StatsStore {
  const [state, setState] = store;

  const actions: StoreActions = {
    setActive(active: boolean) {
      setState('active', active);
    },

    toggleActive() {
      setState('active', (a) => !a);
    },

    setURL(url: string) {
      setState('url', url);
    },

    setServerStats(stats: PartialServerStats) {
      setState('stats', stats);
    },
  };

  return [state, actions];
}
