import { Match, Switch } from 'solid-js';

import { useStore } from '~/lib/store';
import { useVarz } from '~/lib/queries';
import MainInfo from '~/components/dashboard/MainInfo';
import Stats from '~/components/dashboard/Stats';
import ConnectionsList from '~/components/dashboard/ConnectionsList';
import GetStarted from '~/components/dashboard/GetStarted';
import { LoadingIcon } from '~/components/icons';

export default function Overview() {
  const [store] = useStore();
  const varz = useVarz();

  return (
    <div>
      <Switch>
        <Match when={!store.active && !varz.isFetched}>
          <GetStarted />
        </Match>

        <Match when={store.active && !varz.isFetched}>
          <div class="flex items-center justify-center h-40 px-4 py-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
            <LoadingIcon class="h-5 w-5" />
          </div>
        </Match>

        <Match when={varz.isFetched}>
          <MainInfo />
          <Stats />
        </Match>
      </Switch>

      <ConnectionsList />
    </div>
  );
}
