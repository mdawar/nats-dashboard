import { createMemo, For, Show } from 'solid-js';

import type { ConsumerInfo } from '~/types';
import { formatConsumerInfo } from '~/lib/format';
import InfoList from '~/components/dashboard/InfoList';
import DataList from '~/components/dashboard/DataList';

interface Props {
  consumers: ConsumerInfo[];
}

// TODO: use select element for multiple consumers.
export default function ConsumerDetails(props: Props) {
  const consumers = createMemo(() => props.consumers.map(formatConsumerInfo));

  return (
    <div class="space-y-6">
      <For each={consumers()}>
        {(c) => (
          <>
            <InfoList
              info={{
                Name: c.name,
                'Stream Name': c.stream_name,
                Created: c.info.created,
              }}
            />

            <DataList
              title="State"
              data={{
                Pending: c.info.state.pending.str,
                Waiting: c.info.state.waiting.str,
                'Ack. Pending': c.info.state.ackPending.str,
                Redelivered: c.info.state.redelivered.str,
              }}
            />

            <Show when={c.cluster}>
              <DataList
                title="Cluster"
                data={{
                  Name: c.cluster?.name,
                  Leader: c.cluster?.leader,
                  Replicas: c.cluster?.replicas?.length,
                }}
              />
            </Show>

            <Show when={c.config}>
              <DataList
                title="Config"
                data={{
                  Name: c.config?.name,
                  'Durable Name': c.config?.durable_name,
                  Replicas: c.config?.num_replicas,
                  'Filter Subject': c.config?.filter_subject,
                  'Deliver Group': c.config?.deliver_group,
                  'Deliver Subject': c.config?.deliver_subject,
                  'Deliver Policy': c.info.config.deliverPolicy,
                  'Replay Policy': c.info.config.replayPolicy,
                  'Ack. Policy': c.info.config.ackPolicy,
                  'Max Deliver': c.info.config.maxDeliver,
                  'Max Waiting': c.info.config.maxWaiting?.str,
                  'Ack. Wait': c.info.config.ackWait,
                  'Max Ack. Pending': c.info.config.maxAckPending?.str,
                  Backoff: c.info.config.backoff?.join(', '),
                }}
              />
            </Show>

            <DataList
              title="Delivered"
              data={{
                'Consumer Sequence': c.delivered.consumer_seq,
                'Stream Sequence': c.delivered.stream_seq,
                'Last Active': c.info.delivered.lastActive,
              }}
            />

            <DataList
              title="Ack. Floor"
              data={{
                'Consumer Sequence': c.ack_floor.consumer_seq,
                'Stream Sequence': c.ack_floor.stream_seq,
                'Last Active': c.info.ackFloor.lastActive,
              }}
            />
          </>
        )}
      </For>
    </div>
  );
}
