import { For } from 'solid-js';

import { useConnz } from '~/lib/queries';
import Badge from '~/components/Badge';
import ConnectionItem from '~/components/dashboard/ConnectionItem';

export default function ConnectionsList() {
  const connz = useConnz();

  return (
    <section class="tabular-nums slashed-zero">
      <header class="flex items-center justify-between border-b border-gray-200 dark:border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h1 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
          Connections
          <Badge type="pill" color="green" class="ml-3">
            {connz.data?.numConnections}
          </Badge>
        </h1>

        {/* Sort dropdown */}
        <div class="relative">
          <button
            type="button"
            class="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-900 dark:text-white"
            id="sort-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            Sort by
            <svg
              class="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>

          {/*
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          */}
          <div
            class="hidden absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="sort-menu-button"
            tabindex="-1"
          >
            {/* Active: "bg-gray-50", Not Active: "" */}
            <a
              href="#"
              class="block px-3 py-1 text-sm leading-6 text-gray-900"
              role="menuitem"
              tabindex="-1"
              id="sort-menu-item-0"
            >
              CID
            </a>
            <a
              href="#"
              class="block px-3 py-1 text-sm leading-6 text-gray-900"
              role="menuitem"
              tabindex="-1"
              id="sort-menu-item-1"
            >
              Last Activity
            </a>
            <a
              href="#"
              class="block px-3 py-1 text-sm leading-6 text-gray-900"
              role="menuitem"
              tabindex="-1"
              id="sort-menu-item-2"
            >
              Subscriptions
            </a>
          </div>
        </div>
      </header>

      <ul role="list" class="divide-y divide-gray-200 dark:divide-white/5">
        <For
          each={connz.data?.connections}
          fallback={
            <li class="px-4 py-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
              No connections to display.
            </li>
          }
        >
          {(conn) => <ConnectionItem {...conn} />}
        </For>
      </ul>
    </section>
  );
}
