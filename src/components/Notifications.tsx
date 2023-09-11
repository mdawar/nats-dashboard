import { createSignal, onCleanup, For, Show, Switch, Match } from 'solid-js';
import { TransitionGroup } from 'solid-transition-group';
import { Portal } from 'solid-js/web';

import {
  CheckCircleIcon,
  XCircleIcon,
  CloseIcon,
  ExclamationTriangleIcon,
} from '~/components/icons';

type NotificationIcon = 'success' | 'error' | 'warning';

interface NotificationData {
  /** Notification ID. */
  id: number;
  /** Notification title. */
  title: string;
  /** Notification message. */
  message: string;
  /** Notification timeout in milliseconds (Default: no timeout). */
  timeout?: number;
  /** Notification icon (Default: no icon). */
  icon?: NotificationIcon;
}

const [notifications, setNotifications] = createSignal<NotificationData[]>([]);

function remove(id: number) {
  setNotifications((ns) => ns.filter((n) => n.id !== id));
}

const id = (function () {
  let count = 0;
  return () => count++;
})();

/** Display a notification message. */
export function notify(notification: Omit<NotificationData, 'id'>) {
  setNotifications((ns) => [...ns, { ...notification, id: id() }]);
}

export default function Notifications() {
  return (
    <Portal mount={document.body}>
      <div
        aria-live="assertive"
        class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
      >
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end transition-all duration-300 ease-in-out">
          <TransitionGroup
            enterActiveClass="transform ease-out duration-300 transition"
            enterClass="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterToClass="translate-y-0 opacity-100 sm:translate-x-0"
            exitActiveClass="transition ease-in duration-100"
            exitClass="opacity-100"
            exitToClass="opacity-0"
          >
            <For each={notifications()}>
              {(n) => (
                <Notification
                  title={n.title}
                  message={n.message}
                  timeout={n.timeout}
                  onClose={() => remove(n.id)}
                  icon={n.icon}
                />
              )}
            </For>
          </TransitionGroup>
        </div>
      </div>
    </Portal>
  );
}

interface NotificationProps {
  title: string;
  message: string;
  /** Function to call on timeout or close button click. */
  onClose: VoidFunction;
  /** Notification timeout in milliseconds. */
  timeout?: number | undefined;
  /** Notification icon. */
  icon?: NotificationIcon | undefined;
}

function Notification(props: NotificationProps) {
  if (props.timeout !== undefined) {
    const timeout = setTimeout(props.onClose, props.timeout);
    onCleanup(() => clearTimeout(timeout));
  }

  return (
    <div class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white/10">
      <div class="p-4 dark:bg-black/10">
        <div class="flex items-start">
          <Show when={props.icon}>
            <div class="flex-shrink-0">
              <Switch>
                <Match when={props.icon === 'success'}>
                  <CheckCircleIcon class="h-6 w-6 text-green-400" />
                </Match>
                <Match when={props.icon === 'error'}>
                  <XCircleIcon class="h-6 w-6 text-red-400" />
                </Match>
                <Match when={props.icon === 'warning'}>
                  <ExclamationTriangleIcon class="h-6 w-6 text-amber-400" />
                </Match>
              </Switch>
            </div>
          </Show>

          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900 dark:text-white">
              {props.title}
            </p>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {props.message}
            </p>
          </div>

          <div class="ml-4 flex flex-shrink-0">
            <button
              type="button"
              class="inline-flex rounded-md bg-white dark:bg-white/10 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-0"
              onClick={props.onClose}
            >
              <span class="sr-only">Close</span>
              <CloseIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
