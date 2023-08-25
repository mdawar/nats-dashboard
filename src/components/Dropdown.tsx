import { createSignal, For, Show, type ParentProps } from 'solid-js';
import { Transition } from 'solid-transition-group';

// @ts-expect-error
import { clickOutside } from '~/lib/directives';

export interface Option<T> {
  value: T;
  label: string | number;
}

export type Options<T> = Option<T>[];

interface Props<T extends keyof any> extends ParentProps {
  options: Options<T>;
  active: T;
  onChange: (id: T) => void;
  class?: string;
}

export default function Dropdown<T extends keyof any>(props: Props<T>) {
  const [show, setShow] = createSignal(false);

  return (
    <div
      class="relative"
      classList={{ [props.class!]: !!props.class }}
      use:clickOutside={() => setShow(false)}
    >
      <div onClick={() => setShow((prev) => !prev)}>{props.children}</div>

      <Transition
        enterActiveClass="transition ease-out duration-100"
        enterClass="transform opacity-0 scale-95"
        enterToClass="transform opacity-100 scale-100"
        exitActiveClass="transition ease-in duration-75"
        exitClass="transform opacity-100 scale-100"
        exitToClass="transform opacity-0 scale-95"
        appear={true}
      >
        <Show when={show()}>
          <div
            class="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            tabindex="-1"
          >
            <For each={props.options}>
              {({ value, label }) => (
                <button
                  class="block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50"
                  classList={{ 'bg-gray-50': props.active === value }}
                  role="menuitem"
                  onClick={() => {
                    props.onChange(value);
                    setShow(false);
                  }}
                >
                  {label}
                </button>
              )}
            </For>
          </div>
        </Show>
      </Transition>
    </div>
  );
}
