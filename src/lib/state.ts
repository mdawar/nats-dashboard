import { createSignal } from 'solid-js';
import type { PartialServerStats } from '~/lib/stats';

const mobileMenuSignal = createSignal(false);

export function useDisplayMobileMenu() {
  return mobileMenuSignal;
}

const serverStats = createSignal<PartialServerStats>({});

export function useServerStats() {
  return serverStats;
}
