import { createStore } from 'solid-js/store';
import { createContext, useContext, type ParentProps } from 'solid-js';

import type { Server } from '~/components/context/config';

interface StoreState {
  server: Server;
  active: boolean;
}

interface StoreActions {
  setActive(active: boolean): void;
  toggleActive(): void;
  setServer(server: Server): void;
  setURL(url: string): void;
}

const defaultStore: StoreState = {
  server: { url: '' },
  active: false,
};

const defaultActions: StoreActions = {
  setActive() {},
  setServer() {},
  setURL() {},
  toggleActive() {},
};

export type AppStore = [state: StoreState, actions: StoreActions];

const StoreContext = createContext<AppStore>([defaultStore, defaultActions]);

interface Props {
  initialState?: StoreState;
}

export function StoreProvider(props: ParentProps<Props>) {
  const [state, setState] = createStore<StoreState>(
    props.initialState ?? defaultStore
  );

  const actions: StoreActions = {
    setActive(active: boolean) {
      setState('active', active);
    },

    toggleActive() {
      setState('active', (a) => !a);
    },

    setServer(server: Server) {
      setState('server', server);
    },

    setURL(url: string) {
      setState('server', 'url', url);
    },
  };

  return (
    <StoreContext.Provider value={[state, actions]}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function useStore(): AppStore {
  return useContext(StoreContext);
}
