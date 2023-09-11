import { Show } from 'solid-js';

import type { FormattedStreamDetail } from '~/lib/format';
import { ListItem } from '~/components/dashboard/StackedList';
import Badge, { greenIfPositive, redIfPositive } from '~/components/Badge';
import { ChevronRightIcon } from '~/components/icons';

const streamColor = {
  stream:
    'bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-500 dark:ring-sky-400/20',
  kv: 'bg-cyan-50 text-cyan-700 ring-cyan-600/20 dark:bg-cyan-400/10 dark:text-cyan-500 dark:ring-cyan-400/20',
  obj: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20 dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-indigo-400/20',
  mqtt: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20',
} as const;

interface StreamItemProps {
  stream: FormattedStreamDetail;
  onClick: (name: string) => void;
}

export default function StreamItem(props: StreamItemProps) {
  return (
    <ListItem class="relative flex items-center space-x-4">
      <div class="min-w-0 flex-auto">
        <div class="flex items-center gap-x-3">
          <h2 class="min-w-0 text-sm font-semibold leading-6">
            <a
              href="#"
              class="flex gap-x-2"
              onClick={(e) => {
                e.preventDefault();
                props.onClick(props.stream.name);
              }}
            >
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
            color={greenIfPositive(props.stream.info.state.consumerCount)}
            class="flex items-center justify-between gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Consumers</span>
            {props.stream.info.state.consumerCount}
          </Badge>

          <Badge
            border={false}
            color={greenIfPositive(props.stream.info.state.numSubjects.num)}
            class="flex items-center justify-between gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Subjects</span>
            {props.stream.info.state.numSubjects.str}
          </Badge>

          <Badge
            border={false}
            color={greenIfPositive(props.stream.info.state.messages.num)}
            class="flex items-center justify-between gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Messages</span>
            {props.stream.info.state.messages.str}
          </Badge>

          <Badge
            border={false}
            color={greenIfPositive(props.stream.info.state.data.bytes)}
            class="flex items-center justify-between gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Data</span>
            {props.stream.info.state.data.str}
          </Badge>

          <Badge
            border={false}
            color={redIfPositive(props.stream.info.state.numDeleted.num)}
            class="flex items-center justify-between gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Deleted</span>
            {props.stream.info.state.numDeleted.str}
          </Badge>

          <Badge
            border={false}
            color="gray"
            class="flex items-center justify-between gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Created</span>
            {props.stream.info.created}
          </Badge>
        </div>

        <Show when={props.stream.info.state.messages.num > 0}>
          <div class="mt-3 flex flex-col sm:flex-row flex-wrap sm:items-center gap-2 sm:gap-3 text-xs leading-5 text-gray-500 dark:text-gray-400">
            <Badge
              border={false}
              color="gray"
              class="flex items-center justify-between gap-x-1.5"
            >
              <span class="text-gray-900 dark:text-white">First Seq.</span>
              {props.stream.info.state.firstSeq}
            </Badge>

            <Badge
              border={false}
              color="gray"
              class="flex items-center justify-between gap-x-1.5"
            >
              <span class="text-gray-900 dark:text-white">Last Seq.</span>
              {props.stream.info.state.lastSeq}
            </Badge>

            <Badge
              border={false}
              color="gray"
              class="flex items-center justify-between gap-x-1.5"
            >
              <span class="text-gray-900 dark:text-white">First TS</span>
              {props.stream.info.state.firstTS}
            </Badge>

            <Badge
              border={false}
              color="gray"
              class="flex items-center justify-between gap-x-1.5"
            >
              <span class="text-gray-900 dark:text-white">Last TS</span>
              {props.stream.info.state.lastTS}
            </Badge>
          </div>
        </Show>
      </div>

      <div
        class="rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
        classList={{
          [streamColor['obj']]: props.stream.info.isObjectStore,
          [streamColor['kv']]: props.stream.info.isKVStore,
          [streamColor['mqtt']]: props.stream.info.isMQTT,
          [streamColor['stream']]: props.stream.info.isRegular,
        }}
      >
        {props.stream.info.label}
      </div>

      <ChevronRightIcon
        aria-hidden="true"
        class="h-5 w-5 flex-none text-gray-500 dark:text-gray-400"
      />
    </ListItem>
  );
}
