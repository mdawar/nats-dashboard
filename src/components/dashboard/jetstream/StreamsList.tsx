import { createMemo, createSignal, For, Show } from 'solid-js';

import type { StreamDetail } from '~/types';
import { formatStream } from '~/lib/format';
import Badge, { greenIfPositive } from '~/components/Badge';
import {
  StackedListContainer,
  Header,
  HeaderTitle,
  StackedList,
  ListItem,
} from '~/components/dashboard/StackedList';
import SlideOver from '~/components/SlideOver';

import StreamItem from './StreamItem';
import StreamDetails from './StreamDetails';

/** Sort streams by creation time. */
function byCreationTime(a: StreamDetail, b: StreamDetail) {
  return new Date(a.created).getTime() - new Date(b.created).getTime();
}

interface Props {
  streams: StreamDetail[];
}

export default function StreamsList(props: Props) {
  const streams = createMemo(() =>
    (props.streams.slice().sort(byCreationTime) ?? []).map(formatStream)
  );

  const [selectedName, setSelectedName] = createSignal<string>();
  const selectedStream = createMemo(() =>
    streams().find((s) => s.name === selectedName())
  );

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
              {streams().length}
            </Badge>
          </HeaderTitle>
        </Header>

        <StackedList>
          <For
            each={streams()}
            fallback={<ListItem>No streams to display.</ListItem>}
          >
            {(stream) => (
              <StreamItem stream={stream} onClick={setSelectedName} />
            )}
          </For>
        </StackedList>
      </StackedListContainer>

      {/* Slide over for stream details. */}
      <Show when={selectedStream()}>
        {(stream) => (
          <SlideOver
            title="Stream Info"
            onClose={() => setSelectedName(undefined)}
            size="lg"
          >
            <StreamDetails stream={stream()} />
          </SlideOver>
        )}
      </Show>
    </>
  );
}
