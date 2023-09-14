import { createSignal, Switch, Match } from 'solid-js';

import type { FormattedStreamDetail } from '~/lib/format';
import { useJsz } from '~/lib/queries';
import { useStore } from '~/components/context/store';
import { useSettings } from '~/components/context/settings';
import { Tabs, Tab, TabPanel } from '~/components/Tabs';
import { SlideOverContent } from '~/components/SlideOver';
import Button from '~/components/Button';

import StreamInfo from './StreamInfo';
import StreamConfig from './StreamConfig';
import ConsumerDetails from './ConsumerDetails';

interface Props {
  stream: FormattedStreamDetail;
}

export default function StreamDetails(props: Props) {
  const [store] = useStore();
  const [settings, actions] = useSettings();

  const jsz = useJsz(() => ({
    accounts: settings.jsz.accounts,
    streams: settings.jsz.streams,
    consumers: settings.jsz.consumers,
    config: settings.jsz.config,
  }));

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
        <Tab active={tab() === 2} onClick={updateTab(2)}>
          Consumers
        </Tab>
      </Tabs>

      <SlideOverContent>
        <Switch>
          <Match when={tab() === 0}>
            <TabPanel>
              <StreamInfo stream={props.stream} />
            </TabPanel>
          </Match>

          <Match when={tab() === 1}>
            <TabPanel>
              <Switch>
                <Match when={props.stream.config}>
                  {(config) => <StreamConfig config={config()} />}
                </Match>

                <Match when={!props.stream.config}>
                  <div class="space-y-6">
                    <p class="text-gray-500 dark:text-gray-400">
                      Fetching configuration must be enabled to display the
                      stream config.
                    </p>
                    <Button
                      color="secondary"
                      size="md"
                      onClick={() => {
                        actions.setJszConfig(true);

                        // If polling is not active, fetch only once.
                        if (!store.active) {
                          jsz.refetch();
                        }
                      }}
                      isLoading={!jsz.isFetched && jsz.isFetching}
                    >
                      Fetch Config
                    </Button>
                  </div>
                </Match>
              </Switch>
            </TabPanel>
          </Match>

          <Match when={tab() === 2}>
            <TabPanel>
              <Switch>
                <Match when={props.stream.consumer_detail}>
                  {(consumers) => <ConsumerDetails consumers={consumers()} />}
                </Match>

                <Match
                  when={
                    props.stream.state?.consumer_count !== undefined &&
                    props.stream.state.consumer_count === 0
                  }
                >
                  <p class="text-gray-500 dark:text-gray-400">
                    No consumers to display.
                  </p>
                </Match>

                <Match when={!props.stream.consumer_detail}>
                  <div class="space-y-6">
                    <p class="text-gray-500 dark:text-gray-400">
                      Fetching consumers must be enabled to display the consumer
                      information.
                    </p>
                    <Button
                      color="secondary"
                      size="md"
                      onClick={() => {
                        actions.setJszConsumers(true);

                        // If polling is not active, fetch only once.
                        if (!store.active) {
                          jsz.refetch();
                        }
                      }}
                      isLoading={!jsz.isFetched && jsz.isFetching}
                    >
                      Fetch Consumers
                    </Button>
                  </div>
                </Match>
              </Switch>
            </TabPanel>
          </Match>
        </Switch>
      </SlideOverContent>
    </>
  );
}
