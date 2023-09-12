import { createMemo } from 'solid-js';

import type { StreamConfig } from '~/types';
import { formatStreamConfig } from '~/lib/format';
import DataList from '~/components/dashboard/DataList';
import ItemsList from '~/components/dashboard/ItemsList';

interface Props {
  config: StreamConfig;
}

export default function StreamConfig(props: Props) {
  const config = createMemo(() => formatStreamConfig(props.config));

  return (
    <div class="space-y-6">
      <ItemsList title="Subjects" items={props.config?.subjects ?? []} />

      <DataList
        title="Stream Config"
        data={{
          Name: props.config.name,
          'Retention Policy': config().info.retention,
          'Discard Policy': config().info.discard,
          Storage: config().info.storage,
          Replicas: props.config.num_replicas,
          'Max Consumers': config().info.maxConsumers,
          'Max Messages': config().info.maxMsgs,
          'Max Bytes': config().info.maxBytes,
          'Max Message Age': config().info.maxAge,
          'Max Msgs. Per Subject': config().info.maxMsgsPerSubject,
          'Max Message Size': config().info.maxMsgSize,
          'Duplicate Window': config().info.duplicateWindow,
          'Allow Direct Access': props.config.allow_direct ? 'Yes' : 'No',
          'Mirror Direct Access': props.config.mirror_direct ? 'Yes' : 'No',
          Sealed: props.config.sealed ? 'Yes' : 'No',
          'Deny Delete': props.config.deny_delete ? 'Yes' : 'No',
          'Deny Purge': props.config.deny_purge ? 'Yes' : 'No',
          'Allow Rollup Header': props.config.allow_rollup_hdrs ? 'Yes' : 'No',
        }}
      />
    </div>
  );
}
