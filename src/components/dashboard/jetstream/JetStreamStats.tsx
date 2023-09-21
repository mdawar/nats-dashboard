import type { JszQuery } from '~/components/dashboard/queries';
import { Stats, StatCell } from '~/components/dashboard/Stats';

interface Props {
  jsz: JszQuery;
  compact?: boolean;
}

export default function JetStreamStats(props: Props) {
  return (
    <Stats>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px"
        classList={{ 'xl:grid-cols-6': props.compact }}
      >
        <StatCell
          title="Memory"
          stat={props.jsz.data?.info.memory.value}
          unit={props.jsz.data?.info.memory.unit}
        />
        <StatCell
          title="Storage"
          stat={props.jsz.data?.info.storage.value}
          unit={props.jsz.data?.info.storage.unit}
        />
        <StatCell
          title="Reserved Memory"
          stat={props.jsz.data?.info.reservedMemory.value}
          unit={props.jsz.data?.info.reservedMemory.unit}
        />
        <StatCell
          title="Reserved Storage"
          stat={props.jsz.data?.info.reservedStorage.value}
          unit={props.jsz.data?.info.reservedStorage.unit}
        />
        <StatCell title="Accounts" stat={props.jsz.data?.accounts ?? 0} />
        <StatCell title="HA Assets" stat={props.jsz.data?.ha_assets ?? 0} />
        <StatCell title="Streams" stat={props.jsz.data?.streams ?? 0} />
        <StatCell title="Consumers" stat={props.jsz.data?.consumers ?? 0} />
        <StatCell
          title="Messages"
          stat={props.jsz.data?.info.messages.value}
          unit={props.jsz.data?.info.messages.unit}
        />
        <StatCell
          title="Data"
          stat={props.jsz.data?.info.bytes.value}
          unit={props.jsz.data?.info.bytes.unit}
        />
        <StatCell
          title="API Requests"
          stat={props.jsz.data?.info.api.total.value}
          unit={props.jsz.data?.info.api.total.unit}
        />
        <StatCell
          title="API Errors"
          stat={props.jsz.data?.info.api.errors.value}
          unit={props.jsz.data?.info.api.errors.unit}
        />
      </div>
    </Stats>
  );
}
