import { createSignal, createMemo, Switch, Match, For, Show } from 'solid-js';

import { useStore } from '~/components/context/store';
import { useSettings } from '~/components/context/settings';
import { useConnz } from '~/lib/queries';
import Button from '~/components/Button';
import Badge, { greenIfPositive } from '~/components/Badge';
import Toggle from '~/components/Toggle';
import Modal from '~/components/Modal';
import SlideOver from '~/components/SlideOver';
import Dropdown from '~/components/Dropdown';
import {
  StackedListContainer,
  Header,
  HeaderTitle,
  HeaderButton,
  HeaderSeparator,
  HeaderControls,
  ContentContainer,
  StackedList,
  ListItem,
} from '~/components/dashboard/StackedList';
import {
  ChevronUpDownIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  LoadingIcon,
  Cog6ToothIcon,
} from '~/components/icons';

import ConnectionItem from '~/components/dashboard/connections/ConnectionItem';
import ConnectionDetails from '~/components/dashboard/connections/ConnectionDetails';
import ConnectionSettings from '~/components/dashboard/connections/ConnectionSettings';
import {
  sortOptions,
  limitOptions,
  stateOptions,
  subsOptions,
} from '~/components/dashboard/connections/options';

export default function Connections() {
  const [store] = useStore();
  const [settings, actions] = useSettings();
  const [offset, setOffset] = createSignal(0);
  const [showSettings, setShowSettings] = createSignal(false);

  const connz = useConnz(() => ({
    ...settings.connz,
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
    <StackedListContainer>
      <Header>
        <HeaderTitle>
          Connections
          <Badge
            type="pill"
            color={greenIfPositive(connz.data?.total ?? 0)}
            class="ml-3"
          >
            {numConnections()}
          </Badge>
          {/* Display only for initial requests (e.g. When the settings change). */}
          <Show when={!connz.isFetched && connz.isFetching}>
            <LoadingIcon class="inline-flex ml-3 h-4 w-4" />
          </Show>
        </HeaderTitle>

        <HeaderControls>
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
            <HeaderButton class="flex items-center gap-x-1">
              Limit
              <ChevronDownIcon class="h-4 w-4 text-gray-500" />
            </HeaderButton>
          </Dropdown>

          <HeaderSeparator class="hidden xl:block" />

          <Dropdown
            class="hidden xl:block"
            width="20"
            options={stateOptions}
            active={settings.connz.state}
            onChange={actions.setConnzState}
          >
            <HeaderButton class="flex items-center gap-x-1">
              State
              <ChevronDownIcon class="h-4 w-4 text-gray-500" />
            </HeaderButton>
          </Dropdown>

          <HeaderSeparator class="hidden xl:block" />

          <Dropdown
            class="hidden xl:block"
            options={subsOptions}
            active={settings.connz.subs}
            onChange={actions.setConnzSubs}
          >
            <HeaderButton class="flex items-center gap-x-1">
              Subs
              <ChevronDownIcon class="h-4 w-4 text-gray-500" />
            </HeaderButton>
          </Dropdown>

          <HeaderSeparator class="hidden xl:block" />

          <div class="hidden xl:flex items-center">
            <Toggle
              checked={settings.connz.auth}
              onChange={actions.setConnzAuth}
            />
            <span class="ml-3 text-sm">
              <span class="text-gray-900 dark:text-white">Auth</span>
            </span>
          </div>

          <HeaderSeparator class="hidden xl:block" />

          <Dropdown
            class="hidden xl:block"
            options={sortOptions(settings.connz.state)}
            active={settings.connz.sort}
            onChange={actions.setConnzSort}
          >
            <HeaderButton class="flex items-center gap-x-1">
              Sort by
              <ChevronUpDownIcon class="h-5 w-5 text-gray-500" />
            </HeaderButton>
          </Dropdown>

          <HeaderSeparator class="hidden sm:block xl:hidden" />

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
        </HeaderControls>
      </Header>

      <Switch>
        <Match when={!store.active && connz.isPending}>
          <ContentContainer>
            <p>Start monitoring to display connections.</p>
          </ContentContainer>
        </Match>

        <Match when={store.active && connz.isLoading}>
          <ContentContainer class="flex items-center justify-center h-40">
            <LoadingIcon class="h-5 w-5" />
          </ContentContainer>
        </Match>

        <Match when={connz.isSuccess}>
          <StackedList>
            <For
              each={connz.data?.connections}
              fallback={<ListItem>No connections to display.</ListItem>}
            >
              {(conn) => (
                <ConnectionItem connection={conn} onClick={setSelectedID} />
              )}
            </For>
          </StackedList>
        </Match>
      </Switch>

      {/* Slide over connection details. */}
      <Show when={selectedConn()}>
        {(conn) => (
          <SlideOver
            title="Connection Info"
            onClose={() => setSelectedID(undefined)}
            size="lg"
          >
            <ConnectionDetails connection={conn()} />
          </SlideOver>
        )}
      </Show>
    </StackedListContainer>
  );
}
