import { onCleanup, type Accessor } from 'solid-js';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      clickOutside: Function;
    }
  }
}

/**
 * Directive used to call a function when a click event happens outside of the element.
 *
 * Usage: <div use:clickOutside={() => doSometing()} />
 */
export function clickOutside(el: HTMLElement, accessor: Accessor<Function>) {
  const onClick = (e: Event) => {
    // The accessor returns the registered handler function.
    !el.contains(e.target as Node) && accessor()?.();
  };

  document.body.addEventListener('click', onClick);
  onCleanup(() => document.body.removeEventListener('click', onClick));
}
