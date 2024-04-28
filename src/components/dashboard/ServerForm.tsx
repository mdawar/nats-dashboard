import {
  splitProps,
  onMount,
  createEffect,
  Show,
  For,
  type ComponentProps,
} from 'solid-js';
import { useSearchParams } from '@solidjs/router';

import type { Server } from '~/components/context/config';
import { useStore } from '~/components/context/store';
import { ServerIcon } from '~/components/icons';

interface Props extends ComponentProps<'form'> {
  /** List of servers to suggest. */
  servers?: Server[];
}

export default function ServerForm(props: Props) {
  const [local, rest] = splitProps(props, ['servers']);

  const [store, storeActions] = useStore();
  const [params, setParams] = useSearchParams();

  onMount(() => {
    if (params.url) {
      storeActions.setURL(params.url);
      storeActions.setActive(true);
    }
  });

  createEffect(() => {
    setParams({ url: store.url });
  });

  return (
    <form class="relative flex flex-1" {...rest}>
      <label for="nats-url" class="sr-only">
        Server URL
      </label>
      <ServerIcon class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 dark:text-gray-500" />
      <input
        id="nats-url"
        class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500 focus:ring-0 sm:text-sm disabled:cursor-not-allowed disabled:text-gray-500 dark:disabled:text-gray-400"
        disabled={store.active}
        placeholder="Enter a NATS monitoring server URL"
        type="url"
        spellcheck={false}
        list="url-list"
        value={store.url}
        onInput={(e) => {
          storeActions.setURL(e.target.value);
        }}
      />
      <Show when={local.servers}>
        {(servers) => (
          <datalist id="url-list">
            <For each={servers()}>
              {(server) => <option value={server.url} />}
            </For>
          </datalist>
        )}
      </Show>
    </form>
  );
}
