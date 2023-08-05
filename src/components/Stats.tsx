import { Show } from 'solid-js';
import { useServerStats } from '~/lib/state';
import { formatStats } from '~/lib/stats';
import { formatBytes, abbreviateNum, msTimeDiff } from '~/lib/utils';

export default function Stats() {
  const [rawStats] = useServerStats();
  const stats = () => formatStats(rawStats());

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
                {stats().cpu}%
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
                {stats().memory.str}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {stats().memory.unit}
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
                {stats().conns.str}
              </span>
              <Show when={stats().conns.unit}>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {stats().conns.unit}
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
                {stats().totalConns.str}
              </span>
              <Show when={stats().totalConns.unit}>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {stats().totalConns.unit}
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
                {stats().subs.str}
              </span>
              <Show when={stats().subs.unit}>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {stats().subs.unit}
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
                {stats().slowCons.str}
              </span>
              <Show when={stats().slowCons.unit}>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {stats().slowCons.unit}
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
                {stats().inMsgs.str}
              </span>
              <Show when={stats().inMsgs.unit}>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {stats().inMsgs.unit}
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
                {stats().outMsgs.str}
              </span>
              <Show when={stats().outMsgs.unit}>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {stats().outMsgs.unit}
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
                {stats().inBytes.str}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {stats().inBytes.unit}
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
                {stats().outBytes.str}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {stats().outBytes.unit}
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
                {stats().inMsgsRate.str}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {stats().inMsgsRate.unit}/s
              </span>
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
                {stats().outMsgsRate.str}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {stats().outMsgsRate.unit}/s
              </span>
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
                {stats().inBytesRate.str}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {stats().inBytesRate.unit}/s
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
                {stats().outBytesRate.str}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {stats().outBytesRate.unit}/s
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
