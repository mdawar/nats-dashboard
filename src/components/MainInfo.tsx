export default function MainInfo() {
  return (
    <div class="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-50 dark:bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
      <div>
        <div class="flex items-center gap-x-3">
          <div class="flex-none rounded-full bg-emerald-500/20 text-emerald-500 dark:bg-green-400/10 dark:text-green-400 p-1">
            <div class="h-2 w-2 rounded-full bg-current"></div>
          </div>

          <h1 class="flex gap-x-3 text-base leading-7">
            <span class="font-semibold text-gray-900 dark:text-white">
              us-south-nats-demo
            </span>
            <span class="text-gray-600">/</span>
            <span class="font-semibold text-gray-900 dark:text-white">
              v2.9.20
            </span>
            <span class="text-gray-600">/</span>
            <span class="font-semibold text-gray-900 dark:text-white">
              18d17h18m36s
            </span>
          </h1>
        </div>
        <p class="mt-2 text-xs leading-6 text-gray-500 dark:text-gray-400">
          <span class="font-semibold">Server ID</span>:
          <span class="break-all ml-1">
            NBEZOCAHBWFH46KO3YEL6IHPTYSTNZ5OH3U4JQ6BZVK4IXPVSULNU7JC
          </span>
        </p>
      </div>

      <div class="order-first flex-none rounded-full bg-cyan-50 text-cyan-700 ring-cyan-700/10 dark:bg-cyan-400/10 px-2 py-1 text-xs font-medium dark:text-cyan-400 ring-1 ring-inset dark:ring-cyan-400/30 sm:order-none">
        v2.9.20
      </div>
    </div>
  );
}
