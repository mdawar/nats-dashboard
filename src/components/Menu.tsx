import {
  createSignal,
  splitProps,
  onMount,
  Show,
  For,
  type ParentProps,
  type ComponentProps,
} from 'solid-js';
import { Transition } from 'solid-transition-group';

import { useTheme } from '~/components/context/theme';
import natsIconBlack from '~/assets/nats-icon-black.svg';
import natsIconWhite from '~/assets/nats-icon-white.svg';
import {
  ChartBarSquareIcon,
  ChatBubbleIcon,
  InfoCircleIcon,
  SunIcon,
  MoonIcon,
  DesktopIcon,
} from '~/components/icons';
import Badge from '~/components/Badge';
import { externalLinks } from '~/config';
import pkg from '../../package.json';

export interface Props {
  activePage: string;
}

export default function Menu(props: Props) {
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
        <img
          class="h-8 w-auto dark:hidden"
          src={natsIconBlack.src}
          alt="NATS"
        />
        <img
          class="h-8 w-auto hidden dark:block"
          src={natsIconWhite.src}
          alt="NATS"
        />
        <h1 class="text-gray-900 dark:text-white font-bold">
          Dashboard
          <Badge class="ml-3">v{pkg.version}</Badge>
        </h1>
      </a>

      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li>
                <MenuItem href="/" active={props.activePage === '/'}>
                  <ChartBarSquareIcon class="h-6 w-6 shrink-0" />
                  Dashboard
                </MenuItem>
              </li>
              <li>
                <MenuItem href="/faq" active={props.activePage === '/faq'}>
                  <ChatBubbleIcon class="h-6 w-6 shrink-0" />
                  FAQ
                </MenuItem>
              </li>
              <li>
                <MenuItem href="/about" active={props.activePage === '/about'}>
                  <InfoCircleIcon class="h-6 w-6 shrink-0" />
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
              <For each={externalLinks}>
                {(link) => (
                  <li>
                    <SecondaryMenuItem {...link} />
                  </li>
                )}
              </For>
            </ul>
          </li>

          <Transition
            enterActiveClass="ease-in duration-300"
            enterClass="opacity-0"
            enterToClass="opacity-100"
            exitActiveClass="ease-out duration-200"
            exitClass="opacity-100"
            exitToClass="opacity-0"
          >
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
          </Transition>
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

export interface SecondaryMenuItemProps extends ComponentProps<'a'> {
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
