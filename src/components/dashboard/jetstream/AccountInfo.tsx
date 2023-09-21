import type { AccountDetail } from '~/types';
import { formatBytes, abbreviateNum } from '~/lib/utils';
import Badge, { greenIfPositive, redIfPositive } from '~/components/Badge';

export default function AccountInfo(props: { account: AccountDetail }) {
  return (
    <div class="flex flex-wrap gap-4 border-b border-gray-200 dark:border-white/10 px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
      <Badge color={greenIfPositive(props.account.memory)}>
        Memory {formatBytes(props.account.memory).str}
      </Badge>
      <Badge color={greenIfPositive(props.account.storage)}>
        Storage {formatBytes(props.account.storage).str}
      </Badge>
      <Badge color={greenIfPositive(props.account.reserved_memory)}>
        Reserved Memory {formatBytes(props.account.reserved_memory).str}
      </Badge>
      <Badge color={greenIfPositive(props.account.reserved_storage)}>
        Reserved Storage {formatBytes(props.account.reserved_storage).str}
      </Badge>
      <Badge color={greenIfPositive(props.account.ha_assets)}>
        HA Assets {props.account.ha_assets}
      </Badge>
      <Badge color={greenIfPositive(props.account.api.total)}>
        API Requests {abbreviateNum(props.account.api.total).str}
      </Badge>
      <Badge color={redIfPositive(props.account.api.errors)}>
        API Errors {abbreviateNum(props.account.api.errors).str}
      </Badge>
    </div>
  );
}
