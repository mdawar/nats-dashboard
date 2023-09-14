import type { ComponentProps } from 'solid-js';

import { useSettings } from '~/components/context/settings';
import Checkbox from '~/components/Checkbox';

export default function JetStreamSettings(props: ComponentProps<'fieldset'>) {
  const [settings, actions] = useSettings();

  return (
    <fieldset {...props}>
      <legend class="sr-only">Options</legend>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="relative flex items-start">
          <div class="flex h-6 items-center">
            <Checkbox
              id="accounts-opt"
              checked={settings.jsz.accounts}
              disabled={settings.jsz.streams}
              onChange={(e) => actions.setJszAccounts(e.target.checked)}
            />
          </div>
          <div class="ml-3 text-sm leading-6">
            <label
              for="accounts-opt"
              class="font-medium text-gray-900 dark:text-white"
              // Disabled style.
              classList={{ 'opacity-60': settings.jsz.streams }}
              title="Include account specific JetStream information."
            >
              Accounts
            </label>
          </div>
        </div>

        <div class="relative flex items-start">
          <div class="flex h-6 items-center">
            <Checkbox
              id="streams-opt"
              checked={settings.jsz.streams}
              disabled={settings.jsz.consumers}
              onChange={(e) => actions.setJszStreams(e.target.checked)}
            />
          </div>
          <div class="ml-3 text-sm leading-6">
            <label
              for="streams-opt"
              class="font-medium text-gray-900 dark:text-white"
              // Disabled style.
              classList={{ 'opacity-60': settings.jsz.consumers }}
              title="Include streams information."
            >
              Streams
            </label>
          </div>
        </div>

        <div class="relative flex items-start">
          <div class="flex h-6 items-center">
            <Checkbox
              id="consumers-opt"
              checked={settings.jsz.consumers}
              onChange={(e) => actions.setJszConsumers(e.target.checked)}
            />
          </div>
          <div class="ml-3 text-sm leading-6">
            <label
              for="consumers-opt"
              class="font-medium text-gray-900 dark:text-white"
              title="Include consumers information."
            >
              Consumers
            </label>
          </div>
        </div>

        <div class="relative flex items-start">
          <div class="flex h-6 items-center">
            <Checkbox
              id="config-opt"
              checked={settings.jsz.config}
              onChange={(e) => actions.setJszConfig(e.target.checked)}
            />
          </div>
          <div class="ml-3 text-sm leading-6">
            <label
              for="config-opt"
              class="font-medium text-gray-900 dark:text-white"
              title="Include the configuration of streams and consumers."
            >
              Config
            </label>
          </div>
        </div>
      </div>
    </fieldset>
  );
}
