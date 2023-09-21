import {
  createSignal,
  createMemo,
  createEffect,
  Show,
  Switch,
  Match,
} from 'solid-js';

import { useJsz } from '~/components/dashboard/queries';
import { useStore } from '~/components/context/store';
import { useSettings } from '~/components/context/settings';
import GetStarted from '~/components/dashboard/GetStarted';
import { LoadingIcon } from '~/components/icons';
import Button from '~/components/Button';

import JetStreamInfo from '~/components/dashboard/jetstream/JetStreamInfo';
import JetStreamStats from '~/components/dashboard/jetstream/JetStreamStats';
import AccountTabs from '~/components/dashboard/jetstream/AccountTabs';
import AccountInfo from '~/components/dashboard/jetstream/AccountInfo';
import StreamsList from '~/components/dashboard/jetstream/StreamsList';

export default function JetStream() {
  const [store, actions] = useStore();
  const [settings] = useSettings();

  const jsz = useJsz(() => settings.jsz.query);

  const [selected, setSelected] = createSignal<string | undefined>();

  const account = createMemo(
    () => jsz.data?.account_details?.find((a) => a.id === selected())
  );

  createEffect(() => {
    // Select the first account in the list when we get the data
    // and don't have an account selected.
    if (selected() === undefined && jsz.isSuccess) {
      setSelected(jsz.data.account_details?.[0]?.id);
    }
  });

  return (
    <div>
      <Switch>
        <Match when={!store.active && jsz.isPending}>
          <GetStarted />
        </Match>

        <Match when={store.active && jsz.isLoading}>
          <div class="flex items-center justify-center h-40 px-4 py-6 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
            <LoadingIcon class="h-5 w-5" />
          </div>
        </Match>

        <Match when={jsz.isSuccess}>
          <JetStreamInfo
            jsz={jsz}
            // Display a loading indicator only for initial requests (e.g. When the settings change).
            isLoading={!jsz.isFetched && jsz.isFetching}
          />
          <JetStreamStats
            jsz={jsz}
            // Use less space when displaying streams.
            compact={settings.jsz.query.streams}
          />

          <Show when={jsz.data?.account_details}>
            {(accounts) => (
              <AccountTabs
                accounts={accounts()}
                active={selected()}
                onChange={setSelected}
                // Display the number of streams only when they're fetched.
                numStreams={settings.jsz.query.streams}
              />
            )}
          </Show>

          <Show when={account()}>
            {(acc) => <AccountInfo account={acc()} />}
          </Show>

          <Show when={settings.jsz.query.streams && account()?.stream_detail}>
            {(streams) => <StreamsList streams={streams()} />}
          </Show>
        </Match>

        <Match when={jsz.isError}>
          <div class="px-4 py-6 sm:px-6 lg:px-8 text-gray-900 dark:text-white space-y-4">
            <p>
              There was an error while fetching the JetStream server
              information.
            </p>
            <Button color="secondary" onClick={() => actions.setActive(true)}>
              Retry
            </Button>
          </div>
        </Match>
      </Switch>
    </div>
  );
}
