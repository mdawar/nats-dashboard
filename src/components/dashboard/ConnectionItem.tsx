import { For, Show } from 'solid-js';
import type { ConnectionInfo } from '~/lib/stats';

// TODO: .net, nats.deno, java
const langColor: Record<string, string> = {
  unknown: 'text-gray-500 dark:text-gray-400 bg-gray-400/10 ring-gray-400/20',
  go: 'bg-cyan-50 text-cyan-700 ring-cyan-600/20 dark:bg-cyan-400/10 dark:text-cyan-500 dark:ring-cyan-400/20',
  rust: 'bg-orange-50 text-orange-700 ring-orange-600/20 dark:bg-orange-400/10 dark:text-orange-500 dark:ring-orange-400/20',
  'nats.js':
    'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20',
  python3:
    'bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-500 dark:ring-sky-400/20',
};

const indicatorColors = {
  gray: 'bg-gray-100 text-gray-500 dark:bg-gray-100/10 dark:text-gray-500',
  green:
    'bg-emerald-500/20 text-emerald-500 dark:bg-green-400/10 dark:text-green-400',
  red: 'bg-red-100 text-red-400 dark:bg-rose-400/10 dark:text-rose-400',
};

export default function ConnectionItem(props: ConnectionInfo) {
  const infoEntries = () => Object.entries(props.info ?? {});

  const lang = props.lang?.toLowerCase() ?? 'Unknown';
  const langName = lang in langColor ? lang : 'unknown';

  const indicator = () => ((props?.lastActive ?? 0) <= 60 ? 'green' : 'gray');

  return (
    <li class="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8">
      <div class="min-w-0 flex-auto">
        <div class="flex items-center gap-x-3">
          <div
            class="flex-none rounded-full p-1"
            classList={{
              [indicatorColors[indicator()]]: true,
            }}
          >
            <div class="h-2 w-2 rounded-full bg-current"></div>
          </div>

          <h2 class="min-w-0 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            <a href="#" class="flex gap-x-2">
              <span class="whitespace-nowrap">CID {props.cid}</span>
              <span class="text-gray-500 dark:text-gray-400">/</span>
              <span class="truncate">{props.host}</span>
              <Show when={props.name}>
                <span class="text-gray-500 dark:text-gray-400">/</span>
                <span class="truncate">{props.name}</span>
              </Show>
            </a>
          </h2>
        </div>

        <Show when={!!infoEntries().length}>
          <div class="mt-3 flex flex-col sm:flex-row flex-wrap sm:items-center gap-2 sm:gap-3 text-xs leading-5 text-gray-500 dark:text-gray-400">
            <For each={infoEntries()}>
              {([key, value], index) => (
                <>
                  <p>
                    <span class="text-gray-600 dark:text-gray-200">{key}</span>:{' '}
                    {value}
                  </p>
                  {index() < infoEntries().length - 1 && <CircleSep />}
                </>
              )}
            </For>
          </div>
        </Show>
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

/** Separator used for the connection info. */
function CircleSep() {
  return (
    <svg
      viewBox="0 0 2 2"
      class="h-0.5 w-0.5 flex-none hidden sm:block fill-gray-400 dark:fill-gray-300"
    >
      <circle cx="1" cy="1" r="1"></circle>
    </svg>
  );
}
