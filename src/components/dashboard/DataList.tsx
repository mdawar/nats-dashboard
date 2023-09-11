import { createMemo, For, Show } from 'solid-js';

interface Props {
  title: string;
  data: Record<string, number | string | undefined>;
}

export default function DataList(props: Props) {
  const data = createMemo(() => Object.entries(props.data));

  return (
    <div>
      <h3 class="font-medium text-gray-900 dark:text-white">{props.title}</h3>
      <dl class="mt-2 divide-y divide-gray-200 dark:divide-white/10 border-b border-t border-gray-200 dark:border-white/10">
        <For each={data()}>
          {([key, value]) => (
            <Show when={value}>
              <div class="flex justify-between py-3 text-sm font-medium">
                <dt class="text-gray-500 dark:text-gray-400">{key}</dt>
                <dd class="text-gray-900 dark:text-white">{value}</dd>
              </div>
            </Show>
          )}
        </For>
      </dl>
    </div>
  );
}
