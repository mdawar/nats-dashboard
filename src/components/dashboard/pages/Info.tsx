import { Switch, Match } from 'solid-js';

import { useVarz } from '~/lib/queries';
import { useStore } from '~/components/context/store';
import GetStarted from '~/components/dashboard/GetStarted';
import { LoadingIcon } from '~/components/icons';

import ServerInfo from '~/components/dashboard/server/ServerInfo';
import ServerStats from '~/components/dashboard/server/ServerStats';
import InfoCards from '~/components/dashboard/server/InfoCards';

export default function Info() {
  const [store] = useStore();
  const varz = useVarz();

  return (
    <Switch>
      <Match when={!store.active && varz.isPending}>
        <GetStarted />
      </Match>

      <Match when={store.active && varz.isLoading}>
        <div class="flex items-center justify-center h-40 px-4 py-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
          <LoadingIcon class="h-5 w-5" />
        </div>
      </Match>

      <Match when={varz.isSuccess}>
        <ServerInfo varz={varz} details />
        <ServerStats varz={varz} details />
        <InfoCards varz={varz} />
      </Match>
    </Switch>
  );
}
