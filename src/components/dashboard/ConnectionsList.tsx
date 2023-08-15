import { createSignal, For, Show } from 'solid-js';

import type { ConnzSortOpt } from '~/types';
import { useConnz } from '~/lib/queries';
import Badge from '~/components/Badge';
import ConnectionItem from '~/components/dashboard/ConnectionItem';
import Dropdown from '~/components/Dropdown';
import { ChevronUpDownIcon, LoadingIcon } from '~/components/icons';

const sortOptions: Record<ConnzSortOpt, string> = {
  cid: 'CID',
  rtt: 'RTT',
  uptime: 'Uptime',
  last: 'Last Activity',
  idle: 'Idle Time',
  subs: 'Subscriptions',
  msgs_from: 'Msgs. Sent',
  msgs_to: 'Msgs. Received',
  bytes_from: 'Data Size Sent',
  bytes_to: 'Data Size Received',
  pending: 'Pending Data',
  start: 'Connection Start',
  stop: 'Connection Stop',
  reason: 'Close Reason',
};

export default function ConnectionsList() {
  const [sortOpt, setSortOpt] = createSignal<ConnzSortOpt>('cid');
  const connz = useConnz(() => ({ sort: sortOpt() }));

  return (
    <section class="tabular-nums slashed-zero">
      <header class="flex items-center justify-between border-b border-gray-200 dark:border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h1 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
          Connections
          <Badge type="pill" color="green" class="ml-3">
            {connz.data?.numConnections}
          </Badge>
        </h1>

        <Dropdown
          options={sortOptions}
          active={sortOpt()}
          onChange={setSortOpt}
        >
          Sort by
          <ChevronUpDownIcon class="h-5 w-5 text-gray-500" />
        </Dropdown>
      </header>

      <Show
        when={connz.data?.connections.length}
        fallback={
          <div class="flex items-center justify-center h-40 px-4 py-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
            <LoadingIcon class="h-5 w-5" />
          </div>
        }
      >
        <ul role="list" class="divide-y divide-gray-200 dark:divide-white/5">
          <For each={connz.data?.connections}>
            {(conn) => <ConnectionItem {...conn} />}
          </For>
        </ul>
      </Show>
    </section>
  );
}
