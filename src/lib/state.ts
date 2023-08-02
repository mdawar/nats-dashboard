import { createSignal } from 'solid-js';

const mobileMenuSignal = createSignal(false);

export function useDisplayMobileMenu() {
  return mobileMenuSignal;
}
