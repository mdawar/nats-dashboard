import { createSignal, createRenderEffect, Show } from 'solid-js';
import { Transition } from 'solid-transition-group';

import { useMobileMenu } from '~/lib/global';
import { clickOutside } from '~/lib/directives';
clickOutside; // Preserve the import.
import { ThemeProvider } from '~/components/context/theme';
import Menu, { type Props as MenuProps } from '~/components/Menu';
import { CloseIcon } from '~/components/icons';

export default function Sidebar(props: MenuProps) {
  return (
    <ThemeProvider>
      <MobileSidebar {...props} />
      <DesktopSidebar {...props} />
    </ThemeProvider>
  );
}

// Off-canvas menu for mobile, show/hide based on off-canvas menu state.
function MobileSidebar(props: MenuProps) {
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

                <Menu {...props} />
              </div>
            </Show>
          </Transition>
        </div>
      </div>
    </Show>
  );
}

function DesktopSidebar(props: MenuProps) {
  return (
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <Menu {...props} />
    </div>
  );
}
