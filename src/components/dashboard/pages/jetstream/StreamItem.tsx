import { Show, Switch, Match } from 'solid-js';

import type { StreamDetail } from '~/types';
import { formatBytes, abbreviateNum, formatDate } from '~/lib/utils';
import { ListItem } from '~/components/dashboard/DataList';
import Badge, { greenIfNotZero } from '~/components/Badge';
import { ChevronRightIcon } from '~/components/icons';

const streamColor: Record<string, string> = {
  kv: 'bg-cyan-50 text-cyan-700 ring-cyan-600/20 dark:bg-cyan-400/10 dark:text-cyan-500 dark:ring-cyan-400/20',
  obj: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20 dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-indigo-400/20',
  mqtt: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20',
};

interface StreamItemProps {
  stream: StreamDetail;
}

export default function StreamItem(props: StreamItemProps) {
  return (
    <ListItem class="relative flex items-center space-x-4">
      <div class="min-w-0 flex-auto">
        <div class="flex items-center gap-x-3">
          <h2 class="min-w-0 text-sm font-semibold leading-6">
            <a href="#" class="flex gap-x-2">
              <span class="whitespace-nowrap">{props.stream.name}</span>
              <Show when={props.stream.cluster?.name}>
                <span class="text-gray-500 dark:text-gray-400">/</span>
                <span class="truncate">
                  Cluster: {props.stream.cluster?.name}
                </span>
              </Show>
              {/* Make the whole item clickable. */}
              <span class="absolute inset-0"></span>
            </a>
          </h2>
        </div>

        <div class="mt-3 flex flex-col sm:flex-row flex-wrap sm:items-center gap-2 sm:gap-3 text-xs leading-5 text-gray-500 dark:text-gray-400">
          <Badge
            border={false}
            color={greenIfNotZero(props.stream.state?.consumer_count ?? 0)}
            class="flex items-center justify-between gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Consumers</span>
            {props.stream.state?.consumer_count ?? 0}
          </Badge>

          <Badge
            border={false}
            color={greenIfNotZero(props.stream.state?.num_subjects ?? 0)}
            class="flex items-center justify-between gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Subjects</span>
            {props.stream.state?.num_subjects ?? 0}
          </Badge>

          <Badge
            border={false}
            color={greenIfNotZero(props.stream.state?.messages ?? 0)}
            class="flex items-center justify-between gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Messages</span>
            {abbreviateNum(props.stream.state?.messages ?? 0).str}
          </Badge>

          <Badge
            border={false}
            color={greenIfNotZero(props.stream.state?.bytes ?? 0)}
            class="flex items-center justify-between gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Data</span>
            {formatBytes(props.stream.state?.bytes ?? 0).str}
          </Badge>

          <Badge
            border={false}
            color="gray"
            class="flex items-center justify-between gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Deleted</span>
            {abbreviateNum(props.stream.state?.num_deleted ?? 0).str}
          </Badge>

          <Badge
            border={false}
            color="gray"
            class="flex items-center justify-between gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Created</span>
            {formatDate(props.stream.created)}
          </Badge>
        </div>

        <Show when={(props.stream.state?.messages ?? 0) > 0}>
          <div class="mt-3 flex flex-col sm:flex-row flex-wrap sm:items-center gap-2 sm:gap-3 text-xs leading-5 text-gray-500 dark:text-gray-400">
            <Badge
              border={false}
              color="gray"
              class="flex items-center justify-between gap-x-1.5"
            >
              <span class="text-gray-900 dark:text-white">First Seq.</span>
              {props.stream.state?.first_seq ?? 0}
            </Badge>

            <Badge
              border={false}
              color="gray"
              class="flex items-center justify-between gap-x-1.5"
            >
              <span class="text-gray-900 dark:text-white">Last Seq.</span>
              {props.stream.state?.last_seq ?? 0}
            </Badge>

            <Badge
              border={false}
              color="gray"
              class="flex items-center justify-between gap-x-1.5"
            >
              <span class="text-gray-900 dark:text-white">First TS</span>
              {formatDate(props.stream.state?.first_ts ?? '')}
            </Badge>

            <Badge
              border={false}
              color="gray"
              class="flex items-center justify-between gap-x-1.5"
            >
              <span class="text-gray-900 dark:text-white">Last TS</span>
              {formatDate(props.stream.state?.last_ts ?? '')}
            </Badge>
          </div>
        </Show>
      </div>

      <Show
        when={
          props.stream.name.startsWith('OBJ_') ||
          props.stream.name.startsWith('KV_') ||
          props.stream.name.startsWith('$MQTT_')
        }
      >
        <div
          class="rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
          classList={{
            [streamColor['obj']!]: props.stream.name.startsWith('OBJ_'),
            [streamColor['kv']!]: props.stream.name.startsWith('KV_'),
            [streamColor['mqtt']!]: props.stream.name.startsWith('$MQTT_'),
          }}
        >
          <Switch>
            <Match when={props.stream.name.startsWith('KV_')}>KV Store</Match>
            <Match when={props.stream.name.startsWith('OBJ_')}>
              Object Store
            </Match>
            <Match when={props.stream.name.startsWith('$MQTT_')}>MQTT</Match>
          </Switch>
        </div>
      </Show>

      <ChevronRightIcon
        aria-hidden="true"
        class="h-5 w-5 flex-none text-gray-500 dark:text-gray-400"
      />
    </ListItem>
  );
}
