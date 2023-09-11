import { mergeProps, Show } from 'solid-js';

import { useVarz } from '~/lib/queries';
import { Stats, StatCell } from '~/components/dashboard/Stats';

interface Props {
  details?: boolean;
}

export default function ServerStats(props: Props) {
  props = mergeProps({ details: false } satisfies Props, props);

  const varz = useVarz();

  return (
    <Stats>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px">
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

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-px mt-px">
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

      <Show when={props.details}>
        <ServerDetails varz={varz} />
      </Show>
    </Stats>
  );
}

function ServerDetails(props: { varz: ReturnType<typeof useVarz> }) {
  return (
    <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-px mt-px">
      <StatCell title="Leaf Nodes" stat={props.varz.data?.leafnodes} />
      <StatCell title="Routes" stat={props.varz.data?.routes} />
      <StatCell title="Remotes" stat={props.varz.data?.remotes} />
      <StatCell
        title="Max Connections"
        stat={props.varz.data?.info.maxConns.value}
        unit={props.varz.data?.info.maxConns.unit}
      />
      <StatCell
        title="Max Payload"
        stat={props.varz.data?.info.maxPayload.value}
        unit={props.varz.data?.info.maxPayload.unit}
      />
      <StatCell
        title="Max Pending"
        stat={props.varz.data?.info.maxPending.value}
        unit={props.varz.data?.info.maxPending.unit}
      />
      <StatCell
        title="Max Control Line"
        stat={props.varz.data?.info.maxControlLine.value}
        unit={props.varz.data?.info.maxControlLine.unit}
      />
      <StatCell
        title="Ping Interval"
        stat={props.varz.data?.info.pingInterval.value}
        unit={props.varz.data?.info.pingInterval.unit}
      />
      <StatCell title="Max Pings Out" stat={props.varz.data?.ping_max} />
      <StatCell
        title="Write Deadline"
        stat={props.varz.data?.info.writeDeadline.value}
        unit={props.varz.data?.info.writeDeadline.unit}
      />
      <StatCell
        title="Auth. Timeout"
        stat={props.varz.data?.auth_timeout}
        unit="s"
      />
      <StatCell
        title="TLS Timeout"
        stat={props.varz.data?.tls_timeout}
        unit="s"
      />
    </div>
  );
}
