import { Show } from 'solid-js';
import { useServerStats } from '~/lib/state';
import { formatBytes, abbreviateNum, msTimeDiff } from '~/lib/utils';

export default function Stats() {
  const [stats] = useServerStats();

  const memory = () => formatBytes(stats().varz?.mem ?? 0);
  const conns = () => abbreviateNum(stats().varz?.connections ?? 0);
  const totalConns = () => abbreviateNum(stats().varz?.total_connections ?? 0);
  const subs = () => abbreviateNum(stats().varz?.subscriptions ?? 0);
  const slowCons = () => abbreviateNum(stats().varz?.slow_consumers ?? 0);
  const inMsgs = () => abbreviateNum(stats().varz?.in_msgs ?? 0);
  const outMsgs = () => abbreviateNum(stats().varz?.out_msgs ?? 0);
  const inBytes = () => formatBytes(stats().varz?.in_bytes ?? 0);
  const outBytes = () => formatBytes(stats().varz?.out_bytes ?? 0);

  // Time delta between the current and previous request in milliseconds.
  // Using the server reported time instead of request time.
  const timeDelta = () => {
    if (stats().lastVarz?.now) {
      return msTimeDiff(stats().varz.now, stats().lastVarz.now);
    }

    return 0;
  };

  const inMsgsDelta = () => {
    if (stats().lastVarz?.in_msgs !== undefined) {
      return stats().varz.in_msgs - stats().lastVarz.in_msgs;
    }

    return 0;
  };

  const inMsgsRate = () => {
    const rate = timeDelta() > 0 ? inMsgsDelta() / (timeDelta() / 1000) : 0;
    return abbreviateNum(rate);
  };

  const outMsgsDelta = () => {
    if (stats().lastVarz?.out_msgs !== undefined) {
      return stats().varz.out_msgs - stats().lastVarz.out_msgs;
    }

    return 0;
  };

  const outMsgsRate = () => {
    const rate = timeDelta() > 0 ? outMsgsDelta() / (timeDelta() / 1000) : 0;
    return abbreviateNum(rate);
  };

  const inBytesDelta = () => {
    if (stats().lastVarz?.in_bytes !== undefined) {
      return stats().varz.in_bytes - stats().lastVarz.in_bytes;
    }

    return 0;
  };

  const inBytesRate = () => {
    const rate = timeDelta() > 0 ? inBytesDelta() / (timeDelta() / 1000) : 0;
    return formatBytes(rate);
  };

  const outBytesDelta = () => {
    if (stats().lastVarz?.out_bytes !== undefined) {
      return stats().varz.out_bytes - stats().lastVarz.out_bytes;
    }

    return 0;
  };

  const outBytesRate = () => {
    const rate = timeDelta() > 0 ? outBytesDelta() / (timeDelta() / 1000) : 0;
    return formatBytes(rate);
  };

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
                {stats().varz?.cpu}%
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
                {inMsgsRate().str}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {inMsgsRate().unit}/s
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
                {outMsgsRate().str}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {outMsgsRate().unit}/s
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
                {inBytesRate().str}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {inBytesRate().unit}/s
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
                {outBytesRate().str}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {outBytesRate().unit}/s
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
