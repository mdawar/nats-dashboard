import {
  createEffect,
  createSignal,
  type Accessor,
  type Setter,
  type SignalOptions,
} from 'solid-js';
import {
  createStore,
  type Store,
  type StoreNode,
  type SetStoreFunction,
} from 'solid-js/store';

/**
 * Create a store that syncs to the local storage.
 *
 * In case of access is denied to the local storage for some reason (eg: cookies are blocked),
 * the store will behave as an in-memory store having the same effect as `createStore`.
 *
 * @param name - The local storage key name.
 * @param init - Initial store state.
 * @returns Store getter and setter.
 */
export function createLocalStore<T extends StoreNode>(
  name: string,
  init: T
): [get: Store<T>, set: SetStoreFunction<T>] {
  const localState = getItem(name);

  // Create a store from the local state if available, otherwise use the initial value.
  const [state, setState] = createStore<T>(
    localState ? JSON.parse(localState) : init
  );

  // Update the local storage on state change.
  createEffect(() => {
    setItem(name, JSON.stringify(state));
  });

  return [state, setState];
}

/**
 * Create a signal that stores the value in local storage if available.
 *
 * @param name - The local storage key name.
 * @param value - Initial signal value.
 * @param options - Optional signal options.
 * @returns Signal getter and setter.
 */
export function createLocalSignal<T>(
  name: string,
  value: T,
  options?: SignalOptions<T>
): [state: Accessor<T>, setState: Setter<T>] {
  const localState = getItem(name);

  const [state, setState] = createSignal<T>(
    localState ? JSON.parse(localState) : value,
    options
  );

  createEffect(() => {
    setItem(name, JSON.stringify(state()));
  });

  return [state, setState];
}

/**
 * Check if the error is a `DOMException` with the name `SecurityError`.
 */
function isSecurityError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'SecurityError';
}

/**
 * Add or update a value in the local storage and ignore access denied errors.
 *
 * Note: A `SecurityError` exception is thrown in the case of denied access to `localStorage`.
 */
function setItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    if (!isSecurityError(error)) {
      throw error;
    }
  }
}

/**
 * Get a value from the local storage and ignore access denied errors.
 *
 * Note: A `SecurityError` exception is thrown in the case of denied access to `localStorage`
 */
function getItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    if (!isSecurityError(error)) {
      throw error;
    }
  }

  return null;
}
