import { mergeProps, For, Show } from 'solid-js';

import type { AccountDetail } from '~/types';

interface Props {
  accounts: AccountDetail[];
  /** Active account ID. */
  active: string;
  onChange: (id: string) => void;
  /** Display/hide the streams number (Default: true). */
  numStreams?: boolean;
}

export default function AccountTabs(props: Props) {
  props = mergeProps({ numStreams: true } satisfies Partial<Props>, props);

  return (
    <div>
      <div class="sm:hidden p-4 border-b border-gray-200 dark:border-white/10">
        <label
          for="account-tabs"
          class="text-gray-900 dark:text-white font-medium"
        >
          Account
        </label>
        <select
          id="account-tabs"
          name="tabs"
          class="block w-full rounded-md border-gray-300 mt-2 py-2 pl-3 pr-10 text-base focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm dark:bg-white/5 dark:text-white dark:border-none dark:ring-1 dark:ring-inset dark:ring-white/10 dark:focus:ring-2 [&_*]:text-black"
          onChange={(e) => props.onChange(e.target.value)}
        >
          <For each={props.accounts}>
            {(acc) => (
              <option selected={props.active === acc.id} value={acc.id}>
                {acc.name}
              </option>
            )}
          </For>
        </select>
      </div>

      <div class="hidden sm:block">
        <div class="flex border-b border-gray-200 dark:border-white/10">
          <nav
            class="-mb-px flex space-x-8 px-4 sm:px-6 lg:px-8"
            aria-label="Tabs"
          >
            <span class="text-gray-900 dark:text-white flex whitespace-nowrap py-6 px-1 text-sm font-medium">
              Account
            </span>
            <For each={props.accounts}>
              {(acc) => (
                <a
                  href="#"
                  class="flex whitespace-nowrap border-b-2 py-6 px-1 text-sm font-medium"
                  classList={{
                    'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:border-gray-300/10 dark:hover:text-gray-300':
                      props.active !== acc.id,
                    'border-sky-500 text-sky-600 dark:text-sky-500':
                      props.active === acc.id,
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    props.onChange(acc.id);
                  }}
                >
                  {acc.name}
                  <Show when={props.numStreams}>
                    <span
                      class="ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block"
                      classList={{
                        'bg-gray-100 text-gray-900 dark:text-gray-400 dark:bg-gray-400/10':
                          props.active !== acc.id,
                        'bg-sky-100 text-sky-600 dark:text-sky-500 dark:bg-gray-300/10':
                          props.active === acc.id,
                      }}
                    >
                      {acc.stream_detail?.length ?? 0}
                    </span>
                  </Show>
                </a>
              )}
            </For>
          </nav>
        </div>
      </div>
    </div>
  );
}
