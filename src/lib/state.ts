import { createSignal } from 'solid-js';

const mobileMenuSignal = createSignal(false);

export function useDisplayMobileMenu() {
  return mobileMenuSignal;
}

const serverInfo = createSignal<any>({});

export function useServerInfo() {
  return serverInfo;
}
