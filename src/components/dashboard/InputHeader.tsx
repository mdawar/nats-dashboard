import { onMount, createSignal, createEffect, Show } from 'solid-js';
import { useSearchParams } from '@solidjs/router';

import { useStore } from '~/components/context/store';
import MenuToggle from '~/components/MenuToggle';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import {
  ServerIcon,
  PlayIcon,
  StopIcon,
  Cog6ToothIcon,
} from '~/components/icons';
import AppSettings from '~/components/dashboard/AppSettings';

export default function InputHeader() {
  const [store, storeActions] = useStore();
  const [showSettings, setShowSettings] = createSignal(false);
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

  const toggleMonitor = async (e: Event) => {
    e.preventDefault();

    // TODO: show an error if there's no URL
    if (store.url.trim() !== '') {
      storeActions.toggleActive();
    }
  };

  return (
    <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white dark:border-white/5 dark:bg-gray-900 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <MenuToggle class="lg:hidden" />

      {/* Separator */}
      <div
        class="h-6 w-px bg-gray-200 dark:bg-gray-600 lg:hidden"
        aria-hidden="true"
      ></div>

      <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form class="relative flex flex-1" onSubmit={toggleMonitor}>
          <label for="nats-url" class="sr-only">
            Server URL
          </label>
          <ServerIcon class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 dark:text-gray-500" />
          <input
            id="nats-url"
            class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500 focus:ring-0 sm:text-sm disabled:cursor-not-allowed disabled:text-gray-500 dark:disabled:text-gray-400"
            disabled={store.active}
            placeholder="Server URL"
            type="url"
            spellcheck={false}
            list="url-list"
            value={store.url}
            onInput={(e) => {
              storeActions.setURL(e.target.value);
            }}
          />
          <datalist id="url-list">
            <option value="http://localhost:8222" />
            <option value="https://localhost:8222" />
            <option value="https://demo.nats.io:8222" />
          </datalist>
        </form>

        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            class="relative text-gray-900 dark:text-white"
            onClick={toggleMonitor}
          >
            <Show
              when={store.active}
              fallback={
                <>
                  <PlayIcon class="h-5 w-5" />
                  <span class="absolute -inset-2.5"></span>
                </>
              }
            >
              <StopIcon class="h-5 w-5" />
              <span class="absolute -inset-2.5"></span>
            </Show>
          </button>

          {/* Separator */}
          <div
            class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-white/10"
            aria-hidden="true"
          />

          <button
            type="button"
            class="relative text-gray-900 dark:text-white"
            onClick={() => setShowSettings(true)}
          >
            <Cog6ToothIcon class="h-5 w-5" />
            <span class="absolute -inset-2.5"></span>
          </button>
          <Show when={showSettings()}>
            <Modal onClose={() => setShowSettings(false)} size="lg">
              {(close) => (
                <>
                  <AppSettings />
                  <div class="mt-4 sm:mt-6">
                    <Button class="w-full" onClick={close}>
                      Go back to dashboard
                    </Button>
                  </div>
                </>
              )}
            </Modal>
          </Show>
        </div>
      </div>
    </div>
  );
}
