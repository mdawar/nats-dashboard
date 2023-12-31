import { mergeProps, Show } from 'solid-js';

import type { VarzQuery } from '~/components/dashboard/queries';
import { useStore } from '~/components/context/store';
import { formatDate } from '~/lib/utils';
import Indicator from '~/components/Indicator';
import {
  InfoSection,
  DetailList,
  DetailItem,
  InfoBadge,
} from '~/components/dashboard/InfoSection';

interface Props {
  varz: VarzQuery;
  details?: boolean;
}

export default function ServerInfo(props: Props) {
  props = mergeProps({ details: false } satisfies Partial<Props>, props);

  const [store] = useStore();

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
              {props.varz.data?.server_name}
            </span>
            <Show
              when={props.varz.data?.server_name !== props.varz.data?.server_id}
            >
              <span class="text-gray-600 hidden lg:inline">/</span>
              <span
                class="font-semibold text-gray-900 dark:text-white hidden lg:inline break-all truncate"
                title="Server ID"
              >
                {props.varz.data?.server_id}
              </span>
            </Show>
          </h1>
        </div>

        <DetailList>
          <Show
            when={props.varz.data?.server_name !== props.varz.data?.server_id}
          >
            <DetailItem
              name="Server ID"
              value={props.varz.data?.server_id}
              class="lg:hidden"
            />
          </Show>

          <DetailItem name="Uptime" value={props.varz.data?.info.uptime} />

          <Show when={props.details}>
            <ServerDetails varz={props.varz} />
          </Show>
        </DetailList>
      </div>

      <InfoBadge>v{props.varz.data?.version}</InfoBadge>
    </InfoSection>
  );
}

function ServerDetails(props: { varz: VarzQuery }) {
  return (
    <>
      <DetailItem
        name="Server Time"
        value={props.varz.data?.now && formatDate(props.varz.data?.now, 'UTC')}
      />
      <DetailItem
        name="Start Time"
        value={
          props.varz.data?.start && formatDate(props.varz.data?.start, 'UTC')
        }
      />
      <DetailItem
        name="Config Load Time"
        value={
          props.varz.data?.config_load_time &&
          formatDate(props.varz.data?.config_load_time, 'UTC')
        }
      />
    </>
  );
}
