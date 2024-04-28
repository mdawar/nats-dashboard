import { For } from 'solid-js';

import { useConfig } from '~/components/context/config';
import { useStore } from '~/components/context/store';
import { ServerIcon, PlusIcon } from '~/components/icons';
import Button from '~/components/Button';

export default function GetStarted() {
  const config = useConfig();
  const [_, actions] = useStore();

  return (
    <div class="text-center px-4 py-20 sm:py-32 sm:px-6 lg:px-8">
      <ServerIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
        No data
      </h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Get started by monitoring a new NATS server.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-6 mt-6">
        <For each={config().servers}>
          {(server) => (
            <Button
              color="secondary"
              onClick={() => {
                actions.setURL(server.url);
                actions.setActive(true);
              }}
            >
              <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
              {server.name ?? server.url}
            </Button>
          )}
        </For>
      </div>
    </div>
  );
}
