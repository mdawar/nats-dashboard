import { Show, createEffect, type ParentProps } from 'solid-js';
import { Transition } from 'solid-transition-group';

import { useConfig } from '~/components/context/config';
import { useStore } from '~/components/context/store';
import InputHeader from '~/components/dashboard/InputHeader';
import Navigation from '~/components/dashboard/Navigation';
import { LoadingIcon } from '~/components/icons';

export default function Root(props: ParentProps) {
  const config = useConfig();
  const [_, storeActions] = useStore();

  // Server URL set in the config file.
  createEffect(() => {
    if (config().url) {
      storeActions.setURL(config().url);
      storeActions.setActive(true);
    }
  });

  return (
    <Transition
      enterActiveClass="ease-in duration-300"
      enterClass="opacity-0"
      enterToClass="opacity-100"
      // Prevent a page jump when removing the loading indicator.
      exitActiveClass="hidden"
    >
      <Show
        when={!config.loading}
        fallback={
          <div class="flex items-center justify-center min-h-screen text-gray-900 dark:text-white">
            <LoadingIcon class="h-10 w-10" />
          </div>
        }
      >
        <div>
          <InputHeader />

          <main>
            <Navigation />
            {props.children}
          </main>
        </div>
      </Show>
    </Transition>
  );
}
