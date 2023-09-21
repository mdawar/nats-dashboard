import { Switch, Match } from 'solid-js';

import { useStore } from '~/components/context/store';
import { useVarz } from '~/components/dashboard/queries';
import GetStarted from '~/components/dashboard/GetStarted';
import { LoadingIcon } from '~/components/icons';
import Button from '~/components/Button';

import ServerInfo from '~/components/dashboard/server/ServerInfo';
import ServerStats from '~/components/dashboard/server/ServerStats';
import Connections from '~/components/dashboard/pages/Connections';

export default function Overview() {
  const [store, actions] = useStore();
  const varz = useVarz();

  return (
    <div>
      <Switch>
        <Match when={!store.active && varz.isPending}>
          <GetStarted />
        </Match>

        <Match when={store.active && varz.isLoading}>
          <div class="flex items-center justify-center h-40 px-4 py-6 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
            <LoadingIcon class="h-5 w-5" />
          </div>
        </Match>

        <Match when={varz.isSuccess}>
          <ServerInfo varz={varz} />
          <ServerStats varz={varz} />
        </Match>

        <Match when={varz.isError}>
          <div class="h-40 px-4 py-6 sm:px-6 lg:px-8 text-gray-900 dark:text-white space-y-4">
            <p>There was an error while fetching the server information.</p>
            <Button color="secondary" onClick={() => actions.setActive(true)}>
              Retry
            </Button>
          </div>
        </Match>
      </Switch>

      <Connections />
    </div>
  );
}
