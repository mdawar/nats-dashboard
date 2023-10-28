import { createSignal, createMemo, Show } from 'solid-js';

import type { ConsumerInfo } from '~/types';
import { formatConsumerInfo } from '~/lib/format';
import Select, { type Option } from '~/components/Select';
import InfoList from '~/components/dashboard/InfoList';
import DataList from '~/components/dashboard/DataList';

interface Props {
  consumers: ConsumerInfo[];
}

export default function ConsumerDetails(props: Props) {
  const [selected, setSelected] = createSignal(0);

  const consumer = createMemo(() => {
    const cons = props.consumers[selected()];
    return cons && formatConsumerInfo(cons);
  });

  return (
    <div class="space-y-6">
      <Show when={props.consumers.length > 1}>
        <div>
          <Select
            options={
              props.consumers.map((c, i) => ({
                label: c.name,
                value: i,
              })) satisfies Option<number>[]
            }
            value={selected()}
            onChange={setSelected}
          />
        </div>
      </Show>

      <Show when={consumer()}>
        {(c) => (
          <>
            <InfoList
              info={{
                Name: c().name,
                'Stream Name': c().stream_name,
                Created: c().info.created,
              }}
            />

            <DataList
              title="State"
              data={{
                Pending: c().info.state.pending.str,
                Waiting: c().info.state.waiting.str,
                'Ack. Pending': c().info.state.ackPending.str,
                Redelivered: c().info.state.redelivered.str,
              }}
            />

            <Show when={c().cluster}>
              <DataList
                title="Cluster"
                data={{
                  Name: c().cluster?.name,
                  Leader: c().cluster?.leader,
                  Replicas: c().cluster?.replicas?.length,
                }}
              />
            </Show>

            <Show when={c().config}>
              <DataList
                title="Config"
                data={{
                  Name: c().config?.name,
                  'Durable Name': c().config?.durable_name,
                  Replicas: c().config?.num_replicas,
                  'Filter Subject': c().config?.filter_subject,
                  'Filter Subjects': c().config?.filter_subjects?.join(', '),
                  'Deliver Group': c().config?.deliver_group,
                  'Deliver Subject': c().config?.deliver_subject,
                  'Deliver Policy': c().info.config.deliverPolicy,
                  'Replay Policy': c().info.config.replayPolicy,
                  'Ack. Policy': c().info.config.ackPolicy,
                  'Max Deliver': c().info.config.maxDeliver,
                  'Max Waiting': c().info.config.maxWaiting?.str,
                  'Ack. Wait': c().info.config.ackWait,
                  'Max Ack. Pending': c().info.config.maxAckPending,
                  Backoff: c().info.config.backoff?.join(', '),
                }}
              />
            </Show>

            <DataList
              title="Delivered"
              data={{
                'Consumer Sequence': c().delivered.consumer_seq,
                'Stream Sequence': c().delivered.stream_seq,
                'Last Active': c().info.delivered.lastActive,
              }}
            />

            <DataList
              title="Ack. Floor"
              data={{
                'Consumer Sequence': c().ack_floor.consumer_seq,
                'Stream Sequence': c().ack_floor.stream_seq,
                'Last Active': c().info.ackFloor.lastActive,
              }}
            />
          </>
        )}
      </Show>
    </div>
  );
}
