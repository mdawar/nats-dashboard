import { createSignal } from 'solid-js';

const mobileMenuSignal = createSignal(false);

export function useDisplayMobileMenu() {
  return mobileMenuSignal;
}

// TODO: use types
const serverStats = createSignal<any>({});

export function useServerStats() {
  return serverStats;
}
