import { For } from 'solid-js';

import type { AccountDetail } from '~/types';
import Badge, { greenIfNotZero } from '~/components/Badge';
import {
  DataListContainer,
  Header,
  HeaderTitle,
  DataList,
  ListItem,
} from '~/components/dashboard/DataList';

import StreamItem from './StreamItem';

// TODO: Sort streams and add stream type (eg: kv, obj, mqtt).
export default function StreamsList(props: { account: AccountDetail }) {
  return (
    <DataListContainer>
      <Header>
        <HeaderTitle>
          Streams
          <Badge
            type="pill"
            color={greenIfNotZero(props.account.stream_detail?.length ?? 0)}
            class="ml-3"
          >
            {props.account.stream_detail?.length ?? 0}
          </Badge>
        </HeaderTitle>
      </Header>

      <DataList>
        <For
          each={props.account.stream_detail ?? []}
          fallback={<ListItem>No streams to display.</ListItem>}
        >
          {(stream) => <StreamItem stream={stream} />}
        </For>
      </DataList>
    </DataListContainer>
  );
}
