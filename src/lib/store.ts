import { createStore } from 'solid-js/store';

interface StoreState {
  url: string;
  active: boolean;
}

interface StoreActions {
  setActive(active: boolean): void;
  toggleActive(): void;
  setURL(url: string): void;
}

const defaultStore: StoreState = {
  url: '',
  active: false,
};

const [store, setState] = createStore<StoreState>(defaultStore);

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
};

export type StatsStore = [state: StoreState, actions: StoreActions];

export function useStore(): StatsStore {
  return [store, actions];
}
