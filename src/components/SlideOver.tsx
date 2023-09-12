import {
  createSignal,
  mergeProps,
  Show,
  type JSX,
  type ParentProps,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { Transition } from 'solid-transition-group';

import { clickOutside } from '~/lib/directives';
clickOutside; // Preserve the import.
import { CloseIcon } from '~/components/icons';

const slideOverSizes = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
} as const;

type SlideOverSize = keyof typeof slideOverSizes;

interface Props {
  /** Slide over title. */
  title: string;
  /** Slide over close handler. */
  onClose: () => void;
  /**
   * The children prop may be a function that accepts a close function as an argument.
   *
   * Note: This is temporary solution to prevent the modal from closing without the exit animation.
   */
  children?: JSX.Element | ((close: () => void) => JSX.Element);
  /** Slide over size (Default is md). */
  size?: SlideOverSize;
  /** Background overlay. */
  bgOverlay?: boolean;
}

export default function SlideOver(props: Props) {
  props = mergeProps(
    { bgOverlay: true, size: 'md' } satisfies Partial<Props>,
    props
  );

  // Note: This state is temporary, used to control the transition
  // Without it the slide over will close without the exit animation.
  const [show, setShow] = createSignal(true);
  const close = () => setShow(false);

  return (
    <Portal mount={document.body}>
      <div class="relative z-50" role="dialog" aria-modal="true">
        <Show
          when={props.bgOverlay}
          // Background backdrop.
          fallback={<div class="fixed inset-0"></div>}
        >
          <Transition
            enterActiveClass="ease-in-out duration-500"
            enterClass="opacity-0"
            enterToClass="opacity-100"
            exitActiveClass="ease-in-out duration-500"
            exitClass="opacity-100"
            exitToClass="opacity-0"
            appear={true}
          >
            <Show when={show()}>
              <div class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-700 dark:bg-opacity-75 transition-opacity"></div>
            </Show>
          </Transition>
        </Show>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition
                enterActiveClass="transform transition ease-in-out duration-500 sm:duration-700"
                enterClass="translate-x-full"
                enterToClass="translate-x-0"
                exitActiveClass="transform transition ease-in-out duration-500 sm:duration-700"
                exitClass="translate-x-0"
                exitToClass="translate-x-full"
                appear={true}
                onAfterExit={props.onClose}
              >
                <Show when={show()}>
                  <div
                    class="pointer-events-auto w-screen text-gray-900 dark:text-white dark:bg-gray-900"
                    classList={{
                      [slideOverSizes[props.size!]]: true,
                    }}
                    use:clickOutside={close}
                  >
                    <div class="flex h-full flex-col overflow-y-scroll bg-white dark:bg-black/10 py-6 space-y-6 shadow-xl">
                      <div class="px-4 sm:px-6">
                        <div class="flex items-start justify-between">
                          <h2 class="text-base font-semibold leading-6">
                            {props.title}
                          </h2>
                          <div class="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              class="relative rounded-md text-gray-400 hover:text-gray-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                              onClick={close}
                            >
                              <span class="absolute -inset-2.5"></span>
                              <span class="sr-only">Close panel</span>
                              <CloseIcon class="h-6 w-6" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {typeof props.children === 'function'
                        ? props.children(close)
                        : props.children}
                    </div>
                  </div>
                </Show>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}

/** To be used for the slide-over's main content. */
export function SlideOverContent(props: ParentProps) {
  return <div class="relative flex-1 px-4 sm:px-6" {...props} />;
}
