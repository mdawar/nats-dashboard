import { Show } from 'solid-js';

import type { ClientConnection } from '~/lib/format';
import { formatRTT } from '~/lib/utils';
import Indicator from '~/components/Indicator';
import Badge from '~/components/Badge';
import { ArrowUpIcon, ArrowDownIcon } from '~/components/icons';

const langColor: Record<string, string> = {
  unknown: 'text-gray-500 dark:text-gray-400 bg-gray-400/10 ring-gray-400/20',
  go: 'bg-cyan-50 text-cyan-700 ring-cyan-600/20 dark:bg-cyan-400/10 dark:text-cyan-500 dark:ring-cyan-400/20',
  rust: 'bg-orange-50 text-orange-700 ring-orange-600/20 dark:bg-orange-400/10 dark:text-orange-500 dark:ring-orange-400/20',
  'nats.js':
    'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20',
  'nats.deno':
    'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-500 dark:ring-blue-400/20',
  python3:
    'bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-500 dark:ring-sky-400/20',
  java: 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-500 dark:ring-amber-400/20',
  '.net':
    'bg-lime-50 text-lime-700 ring-lime-600/20 dark:bg-lime-400/10 dark:text-lime-500 dark:ring-lime-400/20',
};

const greenIfNotZero = (n: number) => (n > 0 ? 'green' : 'gray');

export default function ConnectionItem(props: ClientConnection) {
  const lang = props.lang?.toLowerCase() ?? 'unknown';
  const langName = lang in langColor ? lang : 'unknown';

  const indicator = () =>
    (props?.info.lastActive ?? 0) <= 60 ? 'green' : 'gray';

  return (
    <li class="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8">
      <div class="min-w-0 flex-auto">
        <div class="flex items-center gap-x-3">
          <Indicator color={indicator()} />

          <h2 class="min-w-0 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            <a href="#" class="flex gap-x-2">
              <span class="whitespace-nowrap">CID {props.cid}</span>
              <span class="text-gray-500 dark:text-gray-400">/</span>
              <span class="truncate">
                {props.ip}
                <span class="text-gray-600 dark:text-gray-500">
                  :{props.port}
                </span>
              </span>
              <Show when={props.name}>
                <span class="text-gray-500 dark:text-gray-400">/</span>
                <span class="truncate">{props.name}</span>
              </Show>
            </a>
          </h2>
        </div>

        <div class="mt-3 flex flex-col sm:flex-row flex-wrap sm:items-center gap-2 sm:gap-3 text-xs leading-5 text-gray-500 dark:text-gray-400">
          <Badge
            border={false}
            color="gray"
            class="flex items-center gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Uptime</span>
            {props.info.uptime}
          </Badge>
          <Badge
            border={false}
            color={(props?.info.lastActive ?? 0) <= 10 ? 'green' : 'gray'}
            class="flex items-center gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Last Activity</span>
            {props.info.lastActivity}
          </Badge>
          <Badge
            border={false}
            color="gray"
            class="flex items-center gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">RTT</span>
            {formatRTT(props.rtt ?? '')}
          </Badge>
        </div>

        <div class="mt-3 flex flex-col sm:flex-row flex-wrap sm:items-center gap-2 sm:gap-3 text-xs leading-5 text-gray-500 dark:text-gray-400">
          <Badge
            border={false}
            color={greenIfNotZero(props.subscriptions)}
            class="flex items-center gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Subs</span>
            {props.subscriptions}
          </Badge>

          <Badge
            border={false}
            color={greenIfNotZero(props.info.pending.bytes)}
            class="flex items-center gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Pending</span>
            {props.info.pending.str}
          </Badge>

          <Badge
            border={false}
            color={greenIfNotZero(
              props.info.inMsgs.num || props.info.outMsgs.num
            )}
            class="flex items-center gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Msgs.</span>
            <ArrowUpIcon class="w-3 h-3" />
            <span title="Sent Messages">{props.info.inMsgs.str}</span>
            <span>/</span>
            <ArrowDownIcon class="w-3 h-3" />
            <span title="Received Messages">{props.info.outMsgs.str}</span>
          </Badge>

          <Badge
            border={false}
            color={greenIfNotZero(
              props.info.inBytes.bytes || props.info.outBytes.bytes
            )}
            class="flex items-center gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Data</span>
            <ArrowUpIcon class="w-3 h-3" />
            <span title="Data Sent">{props.info.inBytes.str}</span>
            <span>/</span>
            <ArrowDownIcon class="w-3 h-3" />
            <span title="Data Received">{props.info.outBytes.str}</span>
          </Badge>

          <Badge
            border={false}
            color={greenIfNotZero(
              props.info.inMsgsRate.num || props.info.outMsgsRate.num
            )}
            class="flex items-center gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Msgs. Rate</span>
            <ArrowUpIcon class="w-3 h-3" />
            <span title="Sent Messages Rate">
              {props.info.inMsgsRate.str}/s
            </span>
            <span>/</span>
            <ArrowDownIcon class="w-3 h-3" />
            <span title="Received Messages Rate">
              {props.info.outMsgsRate.str}/s
            </span>
          </Badge>

          <Badge
            border={false}
            color={greenIfNotZero(
              props.info.inBytesRate.bytes || props.info.outBytesRate.bytes
            )}
            class="flex items-center gap-x-1.5"
          >
            <span class="text-gray-900 dark:text-white">Data Rate</span>
            <ArrowUpIcon class="w-3 h-3" />
            <span title="Data Sent Rate">{props.info.inBytesRate.str}/s</span>
            <span>/</span>
            <ArrowDownIcon class="w-3 h-3" />
            <span title="Data Received Rate">
              {props.info.outBytesRate.str}/s
            </span>
          </Badge>
        </div>
      </div>

      <div
        class="rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
        classList={{
          [langColor[langName]!]: true,
        }}
      >
        {lang} {props.version}
      </div>

      <svg
        class="h-5 w-5 flex-none text-gray-500 dark:text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </li>
  );
}
