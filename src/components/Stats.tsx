import { useServerStats } from '~/lib/state';
import { formatStats } from '~/lib/stats';
import StatCell from '~/components/StatCell';

export default function Stats() {
  const [rawStats] = useServerStats();
  const stats = () => formatStats(rawStats());

  // Note: the bg colors with the gap are used to display a separator between the stats instead of using borders
  // also the multiple div layers are intentional, used for the dark mode color
  return (
    <div class="bg-gray-200 dark:bg-gray-700/50 border-y border-gray-200 dark:border-gray-700/50">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-px">
        <StatCell title="CPU Load" stat={stats().cpu} unit="%" />
        <StatCell
          title="Memory Usage"
          stat={stats().memory.str}
          unit={stats().memory.unit}
        />
        <StatCell
          title="Connections"
          stat={stats().conns.str}
          unit={stats().conns.unit}
        />
        <StatCell
          title="Total Connections"
          stat={stats().totalConns.str}
          unit={stats().totalConns.unit}
        />
        <StatCell
          title="Subscriptions"
          stat={stats().subs.str}
          unit={stats().subs.unit}
        />
        <StatCell
          title="Slow Consumers"
          stat={stats().slowCons.str}
          unit={stats().slowCons.unit}
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px mt-px">
        <StatCell
          title="Total Messages Received"
          stat={stats().inMsgs.str}
          unit={stats().inMsgs.unit}
        />
        <StatCell
          title="Total Messages Sent"
          stat={stats().outMsgs.str}
          unit={stats().outMsgs.unit}
        />
        <StatCell
          title="Total Data Received"
          stat={stats().inBytes.str}
          unit={stats().inBytes.unit}
        />
        <StatCell
          title="Total Data Sent"
          stat={stats().outBytes.str}
          unit={stats().outBytes.unit}
        />
        <StatCell
          title="Messages Received Rate"
          stat={stats().inMsgsRate.str}
          unit={`${stats().inMsgsRate.unit}/s`}
        />
        <StatCell
          title="Messages Sent Rate"
          stat={stats().outMsgsRate.str}
          unit={`${stats().outMsgsRate.unit}/s`}
        />
        <StatCell
          title="Data Received Rate"
          stat={stats().inBytesRate.str}
          unit={`${stats().inBytesRate.unit}/s`}
        />
        <StatCell
          title="Data Sent Rate"
          stat={stats().outBytesRate.str}
          unit={`${stats().outBytesRate.unit}/s`}
        />
      </div>
    </div>
  );
}
