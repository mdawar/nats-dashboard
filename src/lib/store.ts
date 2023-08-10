import { createStore } from 'solid-js/store';
import type { PartialInfoResponse } from '~/lib/info';

interface StoreState {
  url: string;
  active: boolean;
  varz: PartialInfoResponse<'varz'>;
}

interface StoreActions {
  setActive(active: boolean): void;
  toggleActive(): void;
  setURL(url: string): void;
  setVarz(varz: PartialInfoResponse<'varz'>): void;
}

const defaultStore: StoreState = {
  url: '',
  active: false,
  varz: {},
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

  setVarz(varz: PartialInfoResponse<'varz'>) {
    setState('varz', varz);
  },
};

export type StatsStore = [state: StoreState, actions: StoreActions];

export function useStore(): StatsStore {
  return [store, actions];
}
