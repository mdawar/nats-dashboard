import { createSignal, createMemo, Switch, Match, For, Show } from 'solid-js';

import { useStore } from '~/components/context/store';
import { useSettings } from '~/components/context/settings';
import { useConnz } from '~/lib/queries';
import Button from '~/components/Button';
import Badge from '~/components/Badge';
import Toggle from '~/components/Toggle';
import Modal from '~/components/Modal';
import SlideOver from '~/components/SlideOver';
import Dropdown from '~/components/Dropdown';
import ConnectionItem from '~/components/dashboard/ConnectionItem';
import ConnectionDetails from '~/components/dashboard/ConnectionDetails';
import ConnectionSettings from '~/components/dashboard/ConnectionSettings';
import {
  ChevronUpDownIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  LoadingIcon,
  Cog6ToothIcon,
} from '~/components/icons';
import {
  sortOptions,
  limitOptions,
  stateOptions,
  subsOptions,
} from '~/components/dashboard/options';

export default function ConnectionsList() {
  const [store] = useStore();
  const [settings, actions] = useSettings();
  const [offset, setOffset] = createSignal(0);
  const [showSettings, setShowSettings] = createSignal(false);

  const connz = useConnz(() => ({
    state: settings.connz.state,
    sort: settings.connz.sort,
    limit: settings.connz.limit,
    subs: settings.connz.subs,
    auth: settings.connz.auth,
    offset: offset(),
  }));

  const [selectedID, setSelectedID] = createSignal<number>();
  const selectedConn = createMemo(
    () => connz.data?.connections.find((c) => c.cid === selectedID())
  );

  const prev = () => setOffset((o) => Math.max(0, o - settings.connz.limit));
  const next = () => setOffset((o) => o + settings.connz.limit);

  const isFirstPage = () => offset() === 0;
  const isLastPage = () =>
    offset() + settings.connz.limit >= (connz.data?.total ?? 0);

  const numConnections = () => {
    const total = connz.data?.total ?? 0;
    const current = connz.data?.num_connections ?? 0;

    if (total > 0 && total !== current) {
      return `${current} of ${total}`;
    }

    return total;
  };

  return (
    <section class="tabular-nums slashed-zero">
      <header class="flex items-center justify-between border-b border-gray-200 dark:border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h1 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
          Connections
          <Badge
            type="pill"
            color={(connz.data?.total ?? 0) > 0 ? 'green' : 'gray'}
            class="ml-3"
          >
            {numConnections()}
          </Badge>
        </h1>

        <div class="flex items-center gap-6">
          <div class="hidden sm:flex items-center gap-2">
            <button
              type="button"
              class="flex flex-none items-center justify-center p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-default"
              onClick={prev}
              disabled={isFirstPage()}
            >
              <ChevronLeftIcon class="h-4 w-4" />
            </button>
            <button
              type="button"
              class="flex flex-none items-center justify-center p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-default"
              onClick={next}
              disabled={isLastPage()}
            >
              <ChevronRightIcon class="h-4 w-4" />
            </button>
          </div>

          <Dropdown
            class="hidden xl:block"
            width="20"
            options={limitOptions}
            active={settings.connz.limit}
            onChange={actions.setConnzLimit}
          >
            <button
              type="button"
              class="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Limit
              <ChevronDownIcon class="h-4 w-4 text-gray-500" />
            </button>
          </Dropdown>

          {/* Separator */}
          <div class="hidden xl:block h-6 w-px bg-gray-300 dark:bg-white/10" />

          <Dropdown
            class="hidden xl:block"
            width="20"
            options={stateOptions}
            active={settings.connz.state}
            onChange={actions.setConnzState}
          >
            <button
              type="button"
              class="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              State
              <ChevronDownIcon class="h-4 w-4 text-gray-500" />
            </button>
          </Dropdown>

          {/* Separator */}
          <div class="hidden xl:block h-6 w-px bg-gray-300 dark:bg-white/10" />

          <Dropdown
            class="hidden xl:block"
            options={subsOptions}
            active={settings.connz.subs}
            onChange={actions.setConnzSubs}
          >
            <button
              type="button"
              class="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Subs
              <ChevronDownIcon class="h-4 w-4 text-gray-500" />
            </button>
          </Dropdown>

          {/* Separator */}
          <div class="hidden xl:block h-6 w-px bg-gray-300 dark:bg-white/10" />

          <div class="hidden xl:flex items-center">
            <Toggle
              checked={settings.connz.auth}
              onChange={actions.setConnzAuth}
            />
            <span class="ml-3 text-sm">
              <span class="text-gray-900 dark:text-white">Auth</span>
            </span>
          </div>

          {/* Separator */}
          <div class="hidden xl:block h-6 w-px bg-gray-300 dark:bg-white/10" />

          <Dropdown
            class="hidden xl:block"
            options={sortOptions(settings.connz.state)}
            active={settings.connz.sort}
            onChange={actions.setConnzSort}
          >
            <button
              type="button"
              class="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Sort by
              <ChevronUpDownIcon class="h-5 w-5 text-gray-500" />
            </button>
          </Dropdown>

          {/* Separator */}
          <div class="hidden sm:block xl:hidden h-6 w-px bg-gray-300 dark:bg-white/10" />

          {/* Settings button */}
          <button
            type="button"
            class="xl:hidden relative text-gray-900 dark:text-white"
            onClick={() => setShowSettings(true)}
          >
            <Cog6ToothIcon class="h-5 w-5" />
            <span class="absolute -inset-2.5"></span>
          </button>
          <Show when={showSettings()}>
            <Modal onClose={() => setShowSettings(false)} size="lg">
              {(close) => (
                <>
                  <ConnectionSettings />
                  <div class="mt-5 sm:mt-6">
                    <Button class="w-full" onClick={close}>
                      Go back to dashboard
                    </Button>
                  </div>
                </>
              )}
            </Modal>
          </Show>
        </div>
      </header>

      <Switch>
        <Match when={!store.active && !connz.isFetched}>
          <p class="px-4 py-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
            Start monitoring to display connections.
          </p>
        </Match>

        {/* Note: Cannot check isLoading (New query is created on options change). */}
        <Match when={store.active && !connz.isFetched}>
          <div class="flex items-center justify-center h-40 px-4 py-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
            <LoadingIcon class="h-5 w-5" />
          </div>
        </Match>

        <Match when={connz.isSuccess}>
          <ul role="list" class="divide-y divide-gray-200 dark:divide-white/5">
            <For
              each={connz.data?.connections}
              fallback={
                <li class="px-4 py-6 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
                  No connections to display.
                </li>
              }
            >
              {(conn) => (
                <ConnectionItem connection={conn} onClick={setSelectedID} />
              )}
            </For>
          </ul>
        </Match>
      </Switch>

      {/* Slide over connection details. */}
      <Show when={selectedConn()}>
        <SlideOver
          title="Connection Info"
          onClose={() => setSelectedID(undefined)}
          size="lg"
        >
          <ConnectionDetails connection={selectedConn()!} />
        </SlideOver>
      </Show>
    </section>
  );
}
