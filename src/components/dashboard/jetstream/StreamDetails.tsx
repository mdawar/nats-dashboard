import { createSignal, Switch, Match } from 'solid-js';

import type { FormattedStreamDetail } from '~/lib/format';
import { durationFromNs } from '~/lib/utils';
import { Tabs, Tab, TabPanel } from '~/components/Tabs';
import { SlideOverContent } from '~/components/SlideOver';
import InfoList from '~/components/dashboard/InfoList';
import DataList from '~/components/dashboard/DataList';
import ItemsList from '~/components/dashboard/ItemsList';

interface Props {
  stream: FormattedStreamDetail;
}

export default function StreamDetails(props: Props) {
  const [tab, setTab] = createSignal(0);
  const updateTab = (i: number) => (e: Event) => {
    e.preventDefault();
    setTab(i);
  };

  return (
    <>
      <Tabs>
        <Tab active={tab() === 0} onClick={updateTab(0)}>
          Info
        </Tab>
        <Tab active={tab() === 1} onClick={updateTab(1)}>
          Config
        </Tab>
      </Tabs>

      <SlideOverContent>
        <Switch>
          <Match when={tab() === 0}>
            <TabPanel>
              <div class="space-y-6">
                <InfoList
                  info={{
                    Name: props.stream.name,
                    Type: props.stream.info.label,
                    Created: props.stream.info.created,
                  }}
                />

                <DataList
                  title="State"
                  data={{
                    Consumers: props.stream.info.state.consumerCount,
                    Subjects: props.stream.info.state.numSubjects.str,
                    Messages: props.stream.info.state.messages.str,
                    'Data Size': props.stream.info.state.data.str,
                    'Num. Deleted': props.stream.info.state.numDeleted.str,
                    'First Sequence':
                      props.stream.info.state.messages.num > 0
                        ? props.stream.info.state.firstSeq
                        : undefined,
                    'Last Sequence':
                      props.stream.info.state.messages.num > 0
                        ? props.stream.info.state.lastSeq
                        : undefined,
                    'First Timestamp':
                      props.stream.info.state.messages.num > 0
                        ? props.stream.info.state.firstTS
                        : undefined,
                    'Last Timestamp':
                      props.stream.info.state.messages.num > 0
                        ? props.stream.info.state.lastTS
                        : undefined,
                  }}
                />

                <DataList
                  title="Cluster"
                  data={{
                    Name: props.stream.cluster?.name,
                    Leader: props.stream.cluster?.leader,
                    Replicas: props.stream.cluster?.replicas?.length,
                  }}
                />
              </div>
            </TabPanel>
          </Match>

          <Match when={tab() === 1}>
            <TabPanel>
              <div class="space-y-6">
                <DataList
                  data={{
                    Name: props.stream.config?.name,
                    Retention: props.stream.config?.retention,
                    'Max Consumers': props.stream.config?.max_consumers,
                    'Max Messages': props.stream.config?.max_msgs,
                    'Max Bytes': props.stream.config?.max_bytes,
                    'Max Age': props.stream.config?.max_age,
                    'Max Msgs. Per Subject':
                      props.stream.config?.max_msgs_per_subject,
                    'Max Message Size': props.stream.config?.max_msg_size,
                    Discard: props.stream.config?.discard,
                    Storage: props.stream.config?.storage,
                    Replicas: props.stream.config?.num_replicas,
                    'Duplicate Window': durationFromNs(
                      props.stream.config?.duplicate_window ?? 0
                    ).str,
                    'Allow Direct': props.stream.config?.allow_direct
                      ? 'Yes'
                      : 'No',
                    'Mirror Direct': props.stream.config?.mirror_direct
                      ? 'Yes'
                      : 'No',
                    Sealed: props.stream.config?.sealed ? 'Yes' : 'No',
                    'Deny Delete': props.stream.config?.deny_delete
                      ? 'Yes'
                      : 'No',
                    'Deny Purge': props.stream.config?.deny_purge
                      ? 'Yes'
                      : 'No',
                    'Allow Rollup Headers': props.stream.config
                      ?.allow_rollup_hdrs
                      ? 'Yes'
                      : 'No',
                  }}
                />

                <ItemsList
                  title="Subjects"
                  items={props.stream.config?.subjects ?? []}
                />
              </div>
            </TabPanel>
          </Match>
        </Switch>
      </SlideOverContent>
    </>
  );
}
