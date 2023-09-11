import { createMemo, For } from 'solid-js';

import type { AccountDetail, StreamDetail } from '~/types';
import Badge, { greenIfNotZero } from '~/components/Badge';
import {
  DataListContainer,
  Header,
  HeaderTitle,
  DataList,
  ListItem,
} from '~/components/dashboard/DataList';

import StreamItem from './StreamItem';

/** Sort streams by creation time. */
function byCreationTime(a: StreamDetail, b: StreamDetail) {
  return new Date(a.created).getTime() - new Date(b.created).getTime();
}

export default function StreamsList(props: { account: AccountDetail }) {
  const streams = createMemo(
    () => props.account.stream_detail?.slice().sort(byCreationTime) ?? []
  );

  return (
    <DataListContainer>
      <Header>
        <HeaderTitle>
          Streams
          <Badge
            type="pill"
            color={greenIfNotZero(streams().length ?? 0)}
            class="ml-3"
          >
            {streams().length ?? 0}
          </Badge>
        </HeaderTitle>
      </Header>

      <DataList>
        <For
          each={streams()}
          fallback={<ListItem>No streams to display.</ListItem>}
        >
          {(stream) => <StreamItem stream={stream} />}
        </For>
      </DataList>
    </DataListContainer>
  );
}
