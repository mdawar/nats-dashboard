import { Show, createSignal } from 'solid-js';
import { useDisplayMobileMenu } from '~/lib/state';
import natsIconBlack from '~/assets/nats-icon-black.svg';
import natsIconWhite from '~/assets/nats-icon-white.svg';
import {
  ChartBarSquareIcon,
  ChatBubbleIcon,
  InfoCircleIcon,
  SignalIcon,
  CloseIcon,
  SunIcon,
  MoonIcon,
} from '~/components/icons';

export default function Sidebar() {
  return (
    <>
      <MobileSidebar />
      <DesktopSidebar />
    </>
  );
}

// Off-canvas menu for mobile, show/hide based on off-canvas menu state.
function MobileSidebar() {
  const [display, setDisplay] = useDisplayMobileMenu();

  return (
    <div
      class="relative z-50 lg:hidden"
      classList={{ hidden: !display() }}
      role="dialog"
      aria-modal="true"
    >
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
            <button
              type="button"
              class="-m-2.5 p-2.5"
              onClick={() => setDisplay(false)}
            >
              <span class="sr-only">Close sidebar</span>
              <CloseIcon class="h-6 w-6 text-white" />
            </button>
          </div>

          <Menu />
        </div>
      </div>
    </div>
  );
}

function DesktopSidebar() {
  return (
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <Menu />
    </div>
  );
}

function Menu() {
  // TODO: check if dark theme is already applied
  const [darkMode, setDarkMode] = createSignal(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode((d) => !d);
  };

  return (
    <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white dark:border-none dark:bg-black/10 dark:ring-1 dark:ring-white/5 px-6 pb-4">
      <a href="/" class="flex gap-4 h-16 shrink-0 items-center">
        <img class="h-8 w-auto dark:hidden" src={natsIconBlack} alt="NATS" />
        <img
          class="h-8 w-auto hidden dark:block"
          src={natsIconWhite}
          alt="NATS"
        />
        <h1 class="text-gray-900 dark:text-white font-bold">Dashboard</h1>
      </a>

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
                  <ChartBarSquareIcon class="h-6 w-6 shrink-0 text-cyan-600 dark:text-white" />
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                >
                  <SignalIcon class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-white" />
                  Connect
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                >
                  <ChatBubbleIcon class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-white" />
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-700 hover:text-cyan-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                >
                  <InfoCircleIcon class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-white" />
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
                  <SunIcon class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-white" />
                }
              >
                <MoonIcon class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-white" />
              </Show>
              {darkMode() ? 'Light' : 'Dark'}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
