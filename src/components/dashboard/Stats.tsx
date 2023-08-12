import { createMemo } from 'solid-js';

import { useStore } from '~/lib/store';
import { formatStats } from '~/lib/stats';
import StatCell from '~/components/dashboard/StatCell';

export default function Stats() {
  const [store] = useStore();
  const stats = createMemo(() => formatStats(store.varz));

  return (
    <div class="bg-gray-200 dark:bg-gray-700/50 border-y border-gray-200 dark:border-gray-700/50 tabular-nums">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-px">
        <StatCell title="CPU Load" stat={stats().cpu} unit="%" />
        <StatCell
          title="Memory Usage"
          stat={stats().memory.value}
          unit={stats().memory.unit}
        />
        <StatCell
          title="Connections"
          stat={stats().conns.value}
          unit={stats().conns.unit}
        />
        <StatCell
          title="Total Connections"
          stat={stats().totalConns.value}
          unit={stats().totalConns.unit}
        />
        <StatCell
          title="Subscriptions"
          stat={stats().subs.value}
          unit={stats().subs.unit}
        />
        <StatCell
          title="Slow Consumers"
          stat={stats().slowCons.value}
          unit={stats().slowCons.unit}
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px mt-px">
        <StatCell
          title="Total Messages Received"
          stat={stats().inMsgs.value}
          unit={stats().inMsgs.unit}
        />
        <StatCell
          title="Total Messages Sent"
          stat={stats().outMsgs.value}
          unit={stats().outMsgs.unit}
        />
        <StatCell
          title="Total Data Received"
          stat={stats().inBytes.value}
          unit={stats().inBytes.unit}
        />
        <StatCell
          title="Total Data Sent"
          stat={stats().outBytes.value}
          unit={stats().outBytes.unit}
        />
        <StatCell
          title="Messages Received Rate"
          stat={stats().inMsgsRate.value}
          unit={`${stats().inMsgsRate.unit}/s`}
        />
        <StatCell
          title="Messages Sent Rate"
          stat={stats().outMsgsRate.value}
          unit={`${stats().outMsgsRate.unit}/s`}
        />
        <StatCell
          title="Data Received Rate"
          stat={stats().inBytesRate.value}
          unit={`${stats().inBytesRate.unit}/s`}
        />
        <StatCell
          title="Data Sent Rate"
          stat={stats().outBytesRate.value}
          unit={`${stats().outBytesRate.unit}/s`}
        />
      </div>
    </div>
  );
}
