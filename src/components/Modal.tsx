import { createSignal, mergeProps, Show, type JSX } from 'solid-js';
import { Portal } from 'solid-js/web';
import { Transition } from 'solid-transition-group';

import { clickOutside } from '~/lib/directives';
clickOutside; // Preserve the import.

const modalSizes = {
  xs: 'sm:max-w-xs',
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl',
  '6xl': 'sm:max-w-6xl',
  '7xl': 'sm:max-w-7xl',
} as const;

type ModalSize = keyof typeof modalSizes;

interface Props {
  /** Modal close handler. */
  onClose: () => void;
  /**
   * The children prop may be a function that accepts a close function as an argument.
   *
   * Note: This is temporary solution to prevent the modal from closing without the exit animation.
   */
  children?: JSX.Element | ((close: () => void) => JSX.Element);
  /** Disabling the padding is useful when the content must take the full modal width. */
  padding?: boolean;
  /** Modal size or max width (Defaults to sm). */
  size?: ModalSize;
}

export default function Modal(props: Props) {
  props = mergeProps(
    { padding: true, size: 'sm' } satisfies Partial<Props>,
    props
  );

  // Note: This state is temporary, used to control the transition
  // Without it the modal will close without the exit animation.
  const [show, setShow] = createSignal(true);
  const close = () => setShow(false);

  return (
    <Portal mount={document.body}>
      <div class="relative z-50" role="dialog" aria-modal="true">
        <Transition
          enterActiveClass="ease-out duration-300"
          enterClass="opacity-0"
          enterToClass="opacity-100"
          exitActiveClass="ease-in duration-200"
          exitClass="opacity-100"
          exitToClass="opacity-0"
          appear={true}
          // Call the close handler only when the animation completes.
          onAfterExit={props.onClose}
        >
          <Show when={show()}>
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-700 dark:bg-opacity-75 transition-opacity"></div>
          </Show>
        </Transition>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition
              enterActiveClass="ease-out duration-300"
              enterClass="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterToClass="opacity-100 translate-y-0 sm:scale-100"
              exitActiveClass="ease-in duration-200"
              exitClass="opacity-100 translate-y-0 sm:scale-100"
              exitToClass="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              appear={true}
            >
              <Show when={show()}>
                <div
                  class="relative transform overflow-hidden rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:text-white text-left shadow-xl transition-all sm:my-8 sm:w-full"
                  classList={{
                    'px-4 pb-4 pt-5 sm:p-6': props.padding,
                    [modalSizes[props.size!]]: true,
                  }}
                  use:clickOutside={close}
                >
                  {typeof props.children === 'function'
                    ? props.children(close)
                    : props.children}
                </div>
              </Show>
            </Transition>
          </div>
        </div>
      </div>
    </Portal>
  );
}
