import {
  createSignal,
  createRenderEffect,
  splitProps,
  onMount,
  Show,
  type ParentProps,
  type ComponentProps,
} from 'solid-js';
import { useMobileMenu } from '~/lib/global';
import { ThemeProvider, useTheme } from '~/components/context/theme';
// @ts-expect-error
import { clickOutside } from '~/lib/directives';
import { Transition } from 'solid-transition-group';
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
  DesktopIcon,
} from '~/components/icons';

export default function Sidebar() {
  return (
    <ThemeProvider>
      <MobileSidebar />
      <DesktopSidebar />
    </ThemeProvider>
  );
}

// Off-canvas menu for mobile, show/hide based on off-canvas menu state.
function MobileSidebar() {
  const [menuActive, actions] = useMobileMenu();
  // Workaround to keep the container element until the animation ends.
  // Without this workaround the animated child elements are removed from the DOM before any animations are applied.
  const [showContainer, setShowContainer] = createSignal(menuActive()); // Start with the initial state of the menu.

  // Track enabling the mobile menu to display the container.
  // Hiding the container is done after the animation completes.
  createRenderEffect(() => {
    if (menuActive()) {
      setShowContainer(true);
    }
  });

  return (
    <Show when={showContainer()}>
      <div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
        {/* Off-canvas menu backdrop. */}
        <Transition
          enterActiveClass="transition-opacity ease-linear duration-300"
          enterClass="opacity-0"
          enterToClass="opacity-100"
          exitActiveClass="transition-opacity ease-linear duration-300"
          exitClass="opacity-100"
          exitToClass="opacity-0"
          appear={true}
          onAfterExit={() => {
            // Hide the menu container (Must be hidden only after the animation ends).
            setShowContainer(false);
          }}
        >
          <Show when={menuActive()}>
            <div class="fixed inset-0 bg-gray-900/80"></div>
          </Show>
        </Transition>

        <div class="fixed inset-0 flex">
          {/* Off-canvas menu. */}
          <Transition
            enterActiveClass="transition ease-in-out duration-300 transform"
            enterClass="-translate-x-full"
            enterToClass="translate-x-0"
            exitActiveClass="transition ease-in-out duration-300 transform"
            exitClass="translate-x-0"
            exitToClass="-translate-x-full"
            appear={true}
          >
            <Show when={menuActive()}>
              <div
                class="relative mr-16 flex w-full max-w-xs flex-1 dark:bg-gray-900"
                use:clickOutside={actions.hideMenu}
              >
                {/*
                  Close button, show/hide based on off-canvas menu state.

                  Entering: "ease-in-out duration-300"
                    From: "opacity-0"
                    To: "opacity-100"
                  Leaving: "ease-in-out duration-300"
                    From: "opacity-100"
                    To: "opacity-0"

                  Note: Cannot use the Transition component to transition the close button.
                  The Transition component does not support child component transitions
                  and in its current state, the element will be removed from the DOM before
                  any transition styles are applied.
                */}
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    onClick={actions.hideMenu}
                  >
                    <span class="sr-only">Close sidebar</span>
                    <CloseIcon class="h-6 w-6 text-white" />
                  </button>
                </div>

                <Menu />
              </div>
            </Show>
          </Transition>
        </div>
      </div>
    </Show>
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
  const theme = useTheme();

  const [showThemeToggle, setShowThemeToggle] = createSignal(false);

  // Display the theme toggle only on the client to prevent hydration issues.
  // Can be removed with the state when using the `client:only` directive.
  onMount(() => {
    setShowThemeToggle(true);
  });

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
                <MenuItem href="/" active={true}>
                  <ChartBarSquareIcon class="h-6 w-6 shrink-0 text-sky-600 dark:text-white" />
                  Dashboard
                </MenuItem>
              </li>
              <li>
                <MenuItem href="#" active={false}>
                  <SignalIcon class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-sky-600 dark:group-hover:text-white" />
                  Connect
                </MenuItem>
              </li>
              <li>
                <MenuItem href="#" active={false}>
                  <ChatBubbleIcon class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-sky-600 dark:group-hover:text-white" />
                  FAQ
                </MenuItem>
              </li>
              <li>
                <MenuItem href="#" active={false}>
                  <InfoCircleIcon class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-sky-600 dark:group-hover:text-white" />
                  About
                </MenuItem>
              </li>
            </ul>
          </li>
          <li>
            <div class="text-xs font-semibold leading-6 text-gray-400">
              External Links
            </div>
            <ul role="list" class="-mx-2 mt-2 space-y-1">
              <li>
                <SecondaryMenuItem
                  href="https://github.com/mdawar/natsdashboard"
                  letter="G"
                  target="_blank"
                >
                  GitHub
                </SecondaryMenuItem>
              </li>
              <li>
                <SecondaryMenuItem href="https://nats.io/" letter="N">
                  NATS.io
                </SecondaryMenuItem>
              </li>
              <li>
                <SecondaryMenuItem href="https://docs.nats.io/" letter="D">
                  NATS Docs
                </SecondaryMenuItem>
              </li>
            </ul>
          </li>

          <Show when={showThemeToggle()}>
            <li class="mt-auto flex flex-col sm:flex-row gap-3">
              <button
                class="group flex gap-x-3 w-full rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-sky-600 dark:text-white dark:hover:bg-gray-800"
                onClick={theme.toggle}
              >
                <Show
                  when={theme.isDark()}
                  fallback={
                    <>
                      <MoonIcon class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-sky-600 dark:group-hover:text-white" />
                      Dark
                    </>
                  }
                >
                  <SunIcon class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-sky-600 dark:group-hover:text-white" />
                  Light
                </Show>
              </button>

              <Show when={!theme.isAuto()}>
                <button
                  class="group flex gap-x-3 w-full rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-sky-600 dark:text-white dark:hover:bg-gray-800"
                  onClick={theme.reset}
                >
                  <DesktopIcon class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-sky-600 dark:group-hover:text-white" />
                  System
                </button>
              </Show>
            </li>
          </Show>
        </ul>
      </nav>
    </div>
  );
}

interface MenuItemProps extends ComponentProps<'a'> {
  href: string;
  active: boolean;
}

function MenuItem(props: ParentProps<MenuItemProps>) {
  const [local, rest] = splitProps(props, ['href', 'active', 'children']);

  return (
    <a
      href={local.href}
      class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
      classList={{
        'bg-gray-50 text-sky-600 dark:bg-gray-800 dark:text-white':
          local.active,
        'text-gray-700 hover:text-sky-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800':
          !local.active,
      }}
      {...rest}
    >
      {local.children}
    </a>
  );
}

interface SecondaryMenuItemProps extends ComponentProps<'a'> {
  href: string;
  letter: string;
}

function SecondaryMenuItem(props: ParentProps<SecondaryMenuItemProps>) {
  const [local, rest] = splitProps(props, ['href', 'letter', 'children']);

  return (
    <a
      href={local.href}
      class="text-gray-700 hover:text-sky-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
      {...rest}
    >
      <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-sky-600 group-hover:text-sky-600 dark:border-gray-700 dark:bg-gray-800 dark:group-hover:border-gray-700 dark:group-hover:text-white">
        {local.letter}
      </span>
      <span class="truncate">{local.children}</span>
    </a>
  );
}
