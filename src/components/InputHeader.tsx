import { Show, createEffect, onCleanup } from 'solid-js';
import { BarsIcon, ServerIcon, PlayIcon, StopIcon } from '~/components/icons';
import { useStore } from '~/lib/store';
import { useDisplayMobileMenu } from '~/lib/state';
import { FetchError, TimeoutError } from '~/lib/jsonp';
import { fetchStats } from '~/lib/stats';
import { createPoller } from '~/lib/poller';

export default function InputHeader() {
  const [store, actions] = useStore();
  const [__, setDisplay] = useDisplayMobileMenu();

  const poller = createPoller(() => fetchStats(store.url), {
    interval: 1000,
    onSuccess: (stats) => {
      actions.setServerStats(stats);
    },
    onError: (error) => {
      // TODO: should not stop on first error (Maybe user defined option).
      actions.setActive(false);
      if (error instanceof FetchError) {
        console.log('Fetch error:', error);
      } else if (error instanceof TimeoutError) {
        console.log('Timeout error:', error);
      } else {
        console.log('Other error:', error);
      }
    },
  });

  createEffect(() => {
    if (store.active) {
      poller.start();
    } else {
      poller.stop();
    }
  });

  onCleanup(poller.stop);

  const toggleMonitor = async (e: Event) => {
    e.preventDefault();

    if (store.url.trim() !== '') {
      actions.toggleActive();
    }
  };

  return (
    <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white dark:border-white/5 dark:bg-gray-900 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        class="-m-2.5 p-2.5 text-gray-700 dark:text-white lg:hidden"
        onClick={() => setDisplay(true)}
      >
        <span class="sr-only">Open sidebar</span>
        <BarsIcon class="h-6 w-6" />
      </button>

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
            class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500 focus:ring-0 sm:text-sm disabled:cursor-not-allowed disabled:text-gray-500"
            disabled={store.active}
            placeholder="Server URL"
            type="url"
            spellcheck={false}
            list="url-list"
            value={store.url}
            onInput={(e) => {
              actions.setURL(e.target.value);
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
            class="rounded-full bg-cyan-600 p-1 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            classList={{
              'bg-gray-600 hover:bg-gray-500 focus-visible:outline-gray-600':
                store.active,
            }}
            onClick={toggleMonitor}
          >
            <Show when={store.active} fallback={<PlayIcon class="h-5 w-5" />}>
              <StopIcon class="h-5 w-5" />
            </Show>
          </button>
        </div>
      </div>
    </div>
  );
}
