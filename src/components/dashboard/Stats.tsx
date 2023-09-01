import { useVarz } from '~/lib/queries';
import StatCell from '~/components/dashboard/StatCell';

export default function Stats() {
  const varz = useVarz();

  return (
    <div class="bg-gray-200 dark:bg-gray-700/50 border-y border-gray-200 dark:border-gray-700/50 tabular-nums">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-px">
        <StatCell title="CPU Load" stat={varz.data?.cpu} unit="%" />
        <StatCell
          title="Memory Usage"
          stat={varz.data?.info.memory.value}
          unit={varz.data?.info.memory.unit}
        />
        <StatCell
          title="Connections"
          stat={varz.data?.info.conns.value}
          unit={varz.data?.info.conns.unit}
        />
        <StatCell
          title="Total Connections"
          stat={varz.data?.info.totalConns.value}
          unit={varz.data?.info.totalConns.unit}
        />
        <StatCell
          title="Subscriptions"
          stat={varz.data?.info.subs.value}
          unit={varz.data?.info.subs.unit}
        />
        <StatCell
          title="Slow Consumers"
          stat={varz.data?.info.slowCons.value}
          unit={varz.data?.info.slowCons.unit}
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px mt-px">
        <StatCell
          title="Total Messages Received"
          stat={varz.data?.info.inMsgs.value}
          unit={varz.data?.info.inMsgs.unit}
        />
        <StatCell
          title="Total Messages Sent"
          stat={varz.data?.info.outMsgs.value}
          unit={varz.data?.info.outMsgs.unit}
        />
        <StatCell
          title="Total Data Received"
          stat={varz.data?.info.inBytes.value}
          unit={varz.data?.info.inBytes.unit}
        />
        <StatCell
          title="Total Data Sent"
          stat={varz.data?.info.outBytes.value}
          unit={varz.data?.info.outBytes.unit}
        />
        <StatCell
          title="Messages Received Rate"
          stat={varz.data?.info.inMsgsRate.value}
          unit={`${varz.data?.info.inMsgsRate.unit}/s`}
        />
        <StatCell
          title="Messages Sent Rate"
          stat={varz.data?.info.outMsgsRate.value}
          unit={`${varz.data?.info.outMsgsRate.unit}/s`}
        />
        <StatCell
          title="Data Received Rate"
          stat={varz.data?.info.inBytesRate.value}
          unit={`${varz.data?.info.inBytesRate.unit}/s`}
        />
        <StatCell
          title="Data Sent Rate"
          stat={varz.data?.info.outBytesRate.value}
          unit={`${varz.data?.info.outBytesRate.unit}/s`}
        />
      </div>
    </div>
  );
}
