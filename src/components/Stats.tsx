import { Show } from 'solid-js';
import { useServerStats } from '~/lib/state';
import { formatBytes, abbreviateNum } from '~/lib/utils';

export default function Stats() {
  const [info] = useServerStats();

  const memory = () => formatBytes(info().mem ?? 0);
  const conns = () => abbreviateNum(info().connections ?? 0);
  const totalConns = () => abbreviateNum(info().total_connections ?? 0);
  const subs = () => abbreviateNum(info().subscriptions ?? 0);
  const slowCons = () => abbreviateNum(info().slow_consumers ?? 0);
  const inMsgs = () => abbreviateNum(info().in_msgs ?? 0);
  const outMsgs = () => abbreviateNum(info().out_msgs ?? 0);
  const inBytes = () => formatBytes(info().in_bytes ?? 0);
  const outBytes = () => formatBytes(info().out_bytes ?? 0);

  // Note: the bg colors with the gap are used to display a separator between the stats instead of using borders
  // also the multiple div layers are intentional, used for the dark mode color
  return (
    <div class="bg-gray-200 dark:bg-gray-700/50 border-y border-gray-200 dark:border-gray-700/50">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-px">
        <div class="bg-gray-50 dark:bg-gray-900">
          <div class="h-full px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-700/10">
            <p class="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
              CPU Load
            </p>
            <p class="mt-2 flex items-baseline gap-x-2">
              <span class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {info().cpu}%
              </span>
            </p>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900">
          <div class="h-full px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-700/10">
            <p class="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
              Memory Usage
            </p>
            <p class="mt-2 flex items-baseline gap-x-2">
              <span class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {memory().str}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {memory().unit}
              </span>
            </p>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900">
          <div class="h-full px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-700/10">
            <p class="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
              Connections
            </p>
            <p class="mt-2 flex items-baseline gap-x-2">
              <span class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {conns().str}
              </span>
              <Show when={conns().unit}>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {conns().unit}
                </span>
              </Show>
            </p>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900">
          <div class="h-full px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-700/10">
            <p class="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
              Total Connections
            </p>
            <p class="mt-2 flex items-baseline gap-x-2">
              <span class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {totalConns().str}
              </span>
              <Show when={totalConns().unit}>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {totalConns().unit}
                </span>
              </Show>
            </p>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900">
          <div class="h-full px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-700/10">
            <p class="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
              Subscriptions
            </p>
            <p class="mt-2 flex items-baseline gap-x-2">
              <span class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {subs().str}
              </span>
              <Show when={subs().unit}>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {subs().unit}
                </span>
              </Show>
            </p>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900">
          <div class="h-full px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-700/10">
            <p class="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
              Slow Consumers
            </p>
            <p class="mt-2 flex items-baseline gap-x-2">
              <span class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {slowCons().str}
              </span>
              <Show when={slowCons().unit}>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {slowCons().unit}
                </span>
              </Show>
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px mt-px">
        <div class="bg-gray-50 dark:bg-gray-900">
          <div class="h-full px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-700/10">
            <p class="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
              Total Messages Received
            </p>
            <p class="mt-2 flex items-baseline gap-x-2">
              <span class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {inMsgs().str}
              </span>
              <Show when={inMsgs().unit}>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {inMsgs().unit}
                </span>
              </Show>
            </p>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900">
          <div class="h-full px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-700/10">
            <p class="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
              Total Messages Sent
            </p>
            <p class="mt-2 flex items-baseline gap-x-2">
              <span class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {outMsgs().str}
              </span>
              <Show when={outMsgs().unit}>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {outMsgs().unit}
                </span>
              </Show>
            </p>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900">
          <div class="h-full px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-700/10">
            <p class="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
              Total Data Received
            </p>
            <p class="mt-2 flex items-baseline gap-x-2">
              <span class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {inBytes().str}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {inBytes().unit}
              </span>
            </p>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900">
          <div class="h-full px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-700/10">
            <p class="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
              Total Data Sent
            </p>
            <p class="mt-2 flex items-baseline gap-x-2">
              <span class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {outBytes().str}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {outBytes().unit}
              </span>
            </p>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900">
          <div class="h-full px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-700/10">
            <p class="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
              Messages Received Rate
            </p>
            <p class="mt-2 flex items-baseline gap-x-2">
              <span class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                1,574.12
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">/ s</span>
            </p>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900">
          <div class="h-full px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-700/10">
            <p class="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
              Messages Sent Rate
            </p>
            <p class="mt-2 flex items-baseline gap-x-2">
              <span class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                782.35
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">/ s</span>
            </p>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900">
          <div class="h-full px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-700/10">
            <p class="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
              Data Received Rate
            </p>
            <p class="mt-2 flex items-baseline gap-x-2">
              <span class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                5.12
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                MiB/s
              </span>
            </p>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900">
          <div class="h-full px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-700/10">
            <p class="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
              Data Sent Rate
            </p>
            <p class="mt-2 flex items-baseline gap-x-2">
              <span class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                896.32
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                KiB/s
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
