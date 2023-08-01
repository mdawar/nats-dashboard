export default function Stats() {
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
                3%
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
                21.3
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">MiB</span>
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
                32
              </span>
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
                293,218
              </span>
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
                227
              </span>
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
                9
              </span>
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
                512.59
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">M</span>
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
                418.42
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">K</span>
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
                12.34
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">GiB</span>
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
                11.12
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">GiB</span>
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
