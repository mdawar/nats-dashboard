export default function Navigation() {
  return (
    <nav class="flex overflow-x-auto border-b border-gray-200 dark:border-white/10 py-4">
      <ul
        role="list"
        class="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-500 dark:text-gray-400 sm:px-6 lg:px-8"
      >
        <li>
          <a href="#" class="text-cyan-600 dark:text-cyan-400">
            Overview
          </a>
        </li>
        <li>
          <a href="#" class="">
            JetStream
          </a>
        </li>
        <li>
          <a href="#" class="">
            Connections
          </a>
        </li>
        <li>
          <a href="#" class="">
            Accounts
          </a>
        </li>
        <li>
          <a href="#" class="">
            Routes
          </a>
        </li>
      </ul>
    </nav>
  );
}
