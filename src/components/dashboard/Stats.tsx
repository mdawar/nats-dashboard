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
          stat={varz.data?.memory.value}
          unit={varz.data?.memory.unit}
        />
        <StatCell
          title="Connections"
          stat={varz.data?.conns.value}
          unit={varz.data?.conns.unit}
        />
        <StatCell
          title="Total Connections"
          stat={varz.data?.totalConns.value}
          unit={varz.data?.totalConns.unit}
        />
        <StatCell
          title="Subscriptions"
          stat={varz.data?.subs.value}
          unit={varz.data?.subs.unit}
        />
        <StatCell
          title="Slow Consumers"
          stat={varz.data?.slowCons.value}
          unit={varz.data?.slowCons.unit}
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px mt-px">
        <StatCell
          title="Total Messages Received"
          stat={varz.data?.inMsgs.value}
          unit={varz.data?.inMsgs.unit}
        />
        <StatCell
          title="Total Messages Sent"
          stat={varz.data?.outMsgs.value}
          unit={varz.data?.outMsgs.unit}
        />
        <StatCell
          title="Total Data Received"
          stat={varz.data?.inBytes.value}
          unit={varz.data?.inBytes.unit}
        />
        <StatCell
          title="Total Data Sent"
          stat={varz.data?.outBytes.value}
          unit={varz.data?.outBytes.unit}
        />
        <StatCell
          title="Messages Received Rate"
          stat={varz.data?.inMsgsRate.value}
          unit={`${varz.data?.inMsgsRate.unit}/s`}
        />
        <StatCell
          title="Messages Sent Rate"
          stat={varz.data?.outMsgsRate.value}
          unit={`${varz.data?.outMsgsRate.unit}/s`}
        />
        <StatCell
          title="Data Received Rate"
          stat={varz.data?.inBytesRate.value}
          unit={`${varz.data?.inBytesRate.unit}/s`}
        />
        <StatCell
          title="Data Sent Rate"
          stat={varz.data?.outBytesRate.value}
          unit={`${varz.data?.outBytesRate.unit}/s`}
        />
      </div>
    </div>
  );
}
