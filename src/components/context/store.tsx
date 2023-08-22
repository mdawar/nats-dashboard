import { createStore } from 'solid-js/store';
import { createContext, useContext, type ParentProps } from 'solid-js';

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

const defaultActions: StoreActions = {
  setActive() {},
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

    setURL(url: string) {
      setState('url', url);
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
