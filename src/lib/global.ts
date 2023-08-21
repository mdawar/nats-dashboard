import { createSignal, type Accessor } from 'solid-js';

// This state must be global to be used by multiple islands.
const [menuActive, setMenuActive] = createSignal(false);

interface MenuActions {
  displayMenu(): void;
  hideMenu(): void;
}

const menuActions: MenuActions = {
  displayMenu() {
    setMenuActive(true);
  },

  hideMenu() {
    setMenuActive(false);
  },
};

export function useMobileMenu(): [
  state: Accessor<boolean>,
  actions: MenuActions,
] {
  return [menuActive, menuActions];
}
