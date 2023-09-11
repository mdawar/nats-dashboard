import type { JszQuery } from '~/lib/queries';
import { useStore } from '~/components/context/store';
import { formatDate } from '~/lib/utils';
import {
  InfoSection,
  DetailList,
  DetailItem,
} from '~/components/dashboard/InfoSection';
import Indicator from '~/components/Indicator';
import Badge from '~/components/Badge';

export default function JetStreamInfo(props: { jsz: JszQuery }) {
  const [store] = useStore();

  return (
    <InfoSection>
      <div>
        <div class="flex items-center gap-x-3">
          <Indicator
            color={store.active ? 'green' : 'gray'}
            title={store.active ? 'Monitoring' : 'Not Monitoring'}
          />

          <h1
            class="flex gap-x-3 text-base leading-7 font-semibold text-gray-900 dark:text-white break-all"
            title="Server ID"
          >
            {props.jsz.data?.server_id}
          </h1>
        </div>

        <DetailList>
          <DetailItem
            name="Server Time"
            value={formatDate(props.jsz.data?.now ?? '', 'UTC')}
          />
          <DetailItem
            name="Store Directory"
            value={props.jsz.data?.config?.store_dir}
          />
          <DetailItem
            name="Max Memory"
            value={props.jsz.data?.info.config.maxMemory.str}
          />
          <DetailItem
            name="Max Storage"
            value={props.jsz.data?.info.config.maxStorage.str}
          />
          <DetailItem
            name="Compression Allowed"
            value={props.jsz.data?.config?.compress_ok ? 'Yes' : 'No'}
          />
        </DetailList>
      </div>

      <Badge
        type="pill"
        class="order-first sm:order-none flex-none"
        color={props.jsz.data?.disabled ? 'red' : 'green'}
      >
        {props.jsz.data?.disabled ? 'Disabled' : 'Enabled'}
      </Badge>
    </InfoSection>
  );
}
