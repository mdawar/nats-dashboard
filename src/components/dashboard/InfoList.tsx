import { createMemo, For, Show, type JSX } from 'solid-js';

interface Props {
  info: Record<string, JSX.Element | undefined>;
}

export default function InfoList(props: Props) {
  const info = createMemo(() => Object.entries(props.info));

  return (
    <div>
      <dl class="space-y-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 dark:sm:divide-white/10">
        <For each={info()}>
          {([key, value]) => (
            <Show when={value !== undefined}>
              <div class="sm:flex sm:py-4">
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 sm:w-40 sm:flex-shrink-0 lg:w-48">
                  {key}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:ml-6 sm:mt-0 break-all">
                  {value}
                </dd>
              </div>
            </Show>
          )}
        </For>
      </dl>
    </div>
  );
}
