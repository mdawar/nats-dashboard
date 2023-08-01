import { Show, createSignal } from 'solid-js';

export default function Sidebar() {
  return (
    <>
      <MobileSidebar />
      <DesktopSidebar />
    </>
  );
}

// TODO: check if dark theme is already applied
const [darkMode, setDarkMode] = createSignal(false);

const toggleTheme = () => {
  document.documentElement.classList.toggle('dark');
  setDarkMode((d) => !d);
};

// Off-canvas menu for mobile, show/hide based on off-canvas menu state.
function MobileSidebar() {
  // TODO: remove hidden and add state for the menu
  return (
    <div class="hidden relative z-50 lg:hidden" role="dialog" aria-modal="true">
      {/*
      Off-canvas menu backdrop, show/hide based on off-canvas menu state.

      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
      */}
      <div class="fixed inset-0 bg-gray-900/80"></div>

      <div class="fixed inset-0 flex">
        {/*
          Off-canvas menu, show/hide based on off-canvas menu state.

          Entering: "transition ease-in-out duration-300 transform"
            From: "-translate-x-full"
            To: "translate-x-0"
          Leaving: "transition ease-in-out duration-300 transform"
            From: "translate-x-0"
            To: "-translate-x-full"
          */}
        {/* Note: added dark bg for consistency with the desktop menu bg color (Using bg-black/10 on top) */}
        <div class="relative mr-16 flex w-full max-w-xs flex-1 dark:bg-gray-900">
          {/*
            Close button, show/hide based on off-canvas menu state.

            Entering: "ease-in-out duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "ease-in-out duration-300"
              From: "opacity-100"
              To: "opacity-0"
            */}
          <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
            <button type="button" class="-m-2.5 p-2.5">
              <span class="sr-only">Close sidebar</span>
              <svg
                class="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-black/10 dark:ring-1 dark:ring-white/5 px-6 pb-4">
            <div class="flex h-16 shrink-0 items-center">
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=600"
                alt="Your Company"
              />
            </div>
            <nav class="flex flex-1 flex-col">
              <ul role="list" class="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" class="-mx-2 space-y-1">
                    <li>
                      {/* Current: "bg-gray-50 text-cyan-600 dark:bg-gray-800 dark:text-white", Default: "text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800" */}
                      <a
                        href="#"
                        class="bg-gray-50 text-cyan-600 dark:bg-gray-800 dark:text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      >
                        <svg
                          class="h-6 w-6 shrink-0 text-cyan-600 dark:text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                          />
                        </svg>
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      >
                        <svg
                          class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                        Connect
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      >
                        <svg
                          class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                          />
                        </svg>
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      >
                        <svg
                          class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                          />
                        </svg>
                        About
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <div class="text-xs font-semibold leading-6 text-gray-400">
                    External Links
                  </div>
                  <ul role="list" class="-mx-2 mt-2 space-y-1">
                    <li>
                      <a
                        href="https://github.com/mdawar/natsdashboard"
                        class="text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      >
                        <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-cyan-600 group-hover:text-cyan-600 dark:border-gray-700 dark:bg-gray-800 dark:group-hover:border-gray-700 dark:group-hover:text-white">
                          G
                        </span>
                        <span class="truncate">GitHub</span>
                      </a>
                    </li>
                    <li>
                      {/* Current: "bg-gray-50 text-cyan-600 dark:bg-gray-800 dark:text-white", Default: "text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800" */}
                      <a
                        href="https://nats.io/"
                        class="text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      >
                        <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-cyan-600 group-hover:text-cyan-600 dark:border-gray-700 dark:bg-gray-800 dark:group-hover:border-gray-700 dark:group-hover:text-white">
                          N
                        </span>
                        <span class="truncate">NATS.io</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://docs.nats.io/"
                        class="text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      >
                        <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-cyan-600 group-hover:text-cyan-600 dark:border-gray-700 dark:bg-gray-800 dark:group-hover:border-gray-700 dark:group-hover:text-white">
                          D
                        </span>
                        <span class="truncate">NATS Docs</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="mt-auto">
                  <button
                    class="group -mx-2 flex gap-x-3 w-full rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-cyan-600 dark:text-white dark:hover:bg-gray-800"
                    onClick={toggleTheme}
                  >
                    <Show
                      when={darkMode()}
                      fallback={
                        <svg
                          class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                          />
                        </svg>
                      }
                    >
                      <svg
                        class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        />
                      </svg>
                    </Show>
                    {darkMode() ? 'Light' : 'Dark'}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopSidebar() {
  return (
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white dark:border-none dark:bg-black/10 dark:ring-1 dark:ring-white/5 px-6 pb-4">
        <div class="flex h-16 shrink-0 items-center">
          <img
            class="h-8 w-auto dark:hidden"
            src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=600"
            alt="NATS Dashboard"
          />
          <img
            class="h-8 w-auto hidden dark:block"
            src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=500"
            alt="NATS Dashboard"
          />
        </div>

        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li>
                  {/* Current: "bg-gray-50 text-cyan-600 dark:bg-gray-800 dark:text-white", Default: "text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800" */}
                  <a
                    href="#"
                    class="bg-gray-50 text-cyan-600 dark:bg-gray-800 dark:text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <svg
                      class="h-6 w-6 shrink-0 text-cyan-600 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                      />
                    </svg>
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <svg
                      class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                    Connect
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <svg
                      class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                      />
                    </svg>
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <svg
                      class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                    About
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <div class="text-xs font-semibold leading-6 text-gray-400">
                External Links
              </div>
              <ul role="list" class="-mx-2 mt-2 space-y-1">
                <li>
                  <a
                    href="https://github.com/mdawar/natsdashboard"
                    class="text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-cyan-600 group-hover:text-cyan-600 dark:border-gray-700 dark:bg-gray-800 dark:group-hover:border-gray-700 dark:group-hover:text-white">
                      G
                    </span>
                    <span class="truncate">GitHub</span>
                  </a>
                </li>
                <li>
                  {/* Current: "bg-gray-50 text-cyan-600 dark:bg-gray-800 dark:text-white", Default: "text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800" */}
                  <a
                    href="https://nats.io/"
                    class="text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-cyan-600 group-hover:text-cyan-600 dark:border-gray-700 dark:bg-gray-800 dark:group-hover:border-gray-700 dark:group-hover:text-white">
                      N
                    </span>
                    <span class="truncate">NATS.io</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.nats.io/"
                    class="text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-cyan-600 group-hover:text-cyan-600 dark:border-gray-700 dark:bg-gray-800 dark:group-hover:border-gray-700 dark:group-hover:text-white">
                      D
                    </span>
                    <span class="truncate">NATS Docs</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="mt-auto">
              <button
                class="group -mx-2 flex gap-x-3 w-full rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-cyan-600 dark:text-white dark:hover:bg-gray-800"
                onClick={toggleTheme}
              >
                <Show
                  when={darkMode()}
                  fallback={
                    <svg
                      class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                  }
                >
                  <svg
                    class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                  </svg>
                </Show>
                {darkMode() ? 'Light' : 'Dark'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
