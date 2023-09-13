import { createSignal, Switch, Match } from 'solid-js';

import type { FormattedStreamDetail } from '~/lib/format';
import { Tabs, Tab, TabPanel } from '~/components/Tabs';
import { SlideOverContent } from '~/components/SlideOver';

import StreamInfo from './StreamInfo';
import StreamConfig from './StreamConfig';
import ConsumerDetails from './ConsumerDetails';

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
                  <p class="text-gray-500 dark:text-gray-400">
                    Fetching configuration must be enabled to display the stream
                    config.
                  </p>
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
                  <p class="text-gray-500 dark:text-gray-400">
                    Fetching consumers must be enabled to display the consumer
                    information.
                  </p>
                </Match>
              </Switch>
            </TabPanel>
          </Match>
        </Switch>
      </SlideOverContent>
    </>
  );
}
