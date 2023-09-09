import { mergeProps, Show } from 'solid-js';

import { useStore } from '~/components/context/store';
import { useVarz } from '~/lib/queries';
import { formatDate } from '~/lib/utils';
import Indicator from '~/components/Indicator';
import {
  InfoSection,
  DetailList,
  DetailItem,
  InfoBadge,
} from '~/components/dashboard/InfoSection';

interface Props {
  details?: boolean;
}

export default function ServerInfo(props: Props) {
  props = mergeProps({ details: false } satisfies Props, props);

  const [store] = useStore();
  const varz = useVarz();

  return (
    <InfoSection>
      <div>
        <div class="flex items-center gap-x-3">
          <Indicator
            color={store.active ? 'green' : 'gray'}
            title={store.active ? 'Monitoring' : 'Not Monitoring'}
          />

          <h1 class="flex gap-x-3 text-base leading-7">
            <span
              class="font-semibold text-gray-900 dark:text-white"
              title="Server Name"
            >
              {varz.data?.server_name}
            </span>
            <span class="text-gray-600">/</span>
            <span
              class="font-semibold text-gray-900 dark:text-white"
              title="Uptime"
            >
              {varz.data?.info.uptime}
            </span>
          </h1>
        </div>

        <DetailList>
          <DetailItem name="Server ID" value={varz.data?.server_id} />

          <Show when={props.details}>
            <ServerDetails varz={varz} />
          </Show>
        </DetailList>
      </div>

      <InfoBadge>v{varz.data?.version}</InfoBadge>
    </InfoSection>
  );
}

function ServerDetails(props: { varz: ReturnType<typeof useVarz> }) {
  return (
    <>
      <DetailItem
        name="Server Time"
        value={props.varz.data?.now && formatDate(props.varz.data?.now, 'UTC')}
      />
      <DetailItem
        name="Start Time"
        value={props.varz.data?.start && formatDate(props.varz.data?.start)}
      />
      <DetailItem
        name="Config Load Time"
        value={
          props.varz.data?.config_load_time &&
          formatDate(props.varz.data?.config_load_time)
        }
      />
    </>
  );
}
