import type { ComponentProps, ParentProps } from 'solid-js';
import { Transition } from 'solid-transition-group';

export function Tabs(props: ParentProps) {
  return (
    <div class="border-b border-gray-200 dark:border-white/10">
      <div class="px-6">
        <nav class="-mb-px flex space-x-6" aria-label="Tabs">
          {props.children}
        </nav>
      </div>
    </div>
  );
}

interface TabProps extends ComponentProps<'a'> {
  active: boolean;
}

export function Tab(props: TabProps) {
  return (
    <a
      href="#"
      class="whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
      classList={{
        'border-sky-500 text-sky-600 dark:text-sky-500': props.active,
        'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:border-gray-300/10 dark:hover:text-gray-300':
          !props.active,
      }}
      {...props}
    />
  );
}

export function TabPanel(props: ParentProps) {
  return (
    <Transition
      enterActiveClass="ease-in-out duration-300"
      enterClass="opacity-0"
      enterToClass="opacity-100"
      exitActiveClass="ease-in-out duration-300"
      exitClass="opacity-100"
      exitToClass="opacity-0"
      appear={true}
    >
      {props.children}
    </Transition>
  );
}
