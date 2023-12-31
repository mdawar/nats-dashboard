import { createMemo, createSignal, For, Show } from 'solid-js';

import { useSettings } from '~/components/context/settings';
import type { StreamDetail } from '~/types';
import { formatStream } from '~/lib/format';
import { paginate } from '~/lib/pagination';
import Dropdown from '~/components/Dropdown';
import Badge, { greenIfPositive } from '~/components/Badge';
import {
  StackedListContainer,
  Header,
  HeaderTitle,
  HeaderControls,
  HeaderButton,
  StackedList,
  ListItem,
  ListPagination,
  PrevButton,
  NextButton,
  PaginationRange,
} from '~/components/dashboard/StackedList';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '~/components/icons';
import SlideOver from '~/components/SlideOver';

import StreamItem from './StreamItem';
import StreamDetails from './StreamDetails';
import { pageSizeOptions } from './options';

/** Sort streams by creation time. */
function byCreationTime(a: StreamDetail, b: StreamDetail) {
  return new Date(a.created).getTime() - new Date(b.created).getTime();
}

interface Props {
  streams: StreamDetail[];
}

export default function StreamsList(props: Props) {
  const [settings, actions] = useSettings();

  const streams = createMemo(() =>
    (props.streams.slice().sort(byCreationTime) ?? []).map(formatStream)
  );

  const [currentPage, setCurrentPage] = createSignal(1);

  const totalPages = createMemo(() =>
    Math.ceil(streams().length / settings.jsz.pageSize)
  );

  const next = () => setCurrentPage((p) => Math.min(p + 1, totalPages()));
  const prev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  const isFirstPage = () => currentPage() === 1;
  const isLastPage = () => currentPage() === totalPages();

  const pageStreams = createMemo(() =>
    paginate(streams(), settings.jsz.pageSize, currentPage())
  );

  const [selectedName, setSelectedName] = createSignal<string>();
  const selectedStream = createMemo(() =>
    pageStreams().find((s) => s.name === selectedName())
  );

  const numStreams = () => {
    const total = streams().length;
    const current = pageStreams().length;

    if (total > 0 && total !== current) {
      return `${current} of ${total}`;
    }

    return total;
  };

  return (
    <>
      <StackedListContainer>
        <Header>
          <HeaderTitle>
            Streams
            <Badge
              type="pill"
              color={greenIfPositive(streams().length)}
              class="ml-3"
            >
              {numStreams()}
            </Badge>
          </HeaderTitle>

          <HeaderControls>
            <div class="hidden sm:flex items-center gap-2">
              <Show when={totalPages() > 1}>
                <span class="text-xs leading-6 text-gray-900 dark:text-white">
                  Page {currentPage()} of {totalPages()}
                </span>
              </Show>
              <button
                type="button"
                class="flex flex-none items-center justify-center p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white disabled:text-gray-400 dark:disabled:text-gray-600 disabled:pointer-events-none"
                onClick={prev}
                disabled={isFirstPage()}
              >
                <ChevronLeftIcon class="h-4 w-4" />
              </button>
              <button
                type="button"
                class="flex flex-none items-center justify-center p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white disabled:text-gray-400 dark:disabled:text-gray-600 disabled:pointer-events-none"
                onClick={next}
                disabled={isLastPage()}
              >
                <ChevronRightIcon class="h-4 w-4" />
              </button>
            </div>

            <Dropdown
              width="20"
              options={pageSizeOptions}
              active={settings.jsz.pageSize}
              onChange={actions.setJszStreamsPageSize}
            >
              <HeaderButton class="flex items-center gap-x-1">
                Display
                <ChevronDownIcon class="h-4 w-4 text-gray-500" />
              </HeaderButton>
            </Dropdown>
          </HeaderControls>
        </Header>

        <StackedList>
          <For
            each={pageStreams()}
            fallback={<ListItem>No streams to display.</ListItem>}
          >
            {(stream) => (
              <StreamItem stream={stream} onClick={setSelectedName} />
            )}
          </For>
        </StackedList>

        <Show when={totalPages() > 1}>
          <ListPagination>
            <PrevButton onClick={prev} disabled={isFirstPage()} />
            <PaginationRange
              totalPages={totalPages()}
              currentPage={currentPage()}
              onChange={setCurrentPage}
            />
            <NextButton onClick={next} disabled={isLastPage()} />
          </ListPagination>
        </Show>
      </StackedListContainer>

      {/* Slide over for stream details. */}
      <Show when={selectedStream()}>
        {(stream) => (
          <SlideOver
            title="Stream Info"
            onClose={() => setSelectedName(undefined)}
            size="xl"
          >
            <StreamDetails stream={stream()} />
          </SlideOver>
        )}
      </Show>
    </>
  );
}
