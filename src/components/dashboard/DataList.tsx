import { createMemo, For, Show } from 'solid-js';

interface Props {
  title?: string;
  data: Record<string, number | string | undefined>;
}

export default function DataList(props: Props) {
  const data = createMemo(() => Object.entries(props.data));

  return (
    <div>
      <Show when={props.title}>
        <h3 class="pb-2 mb-3 font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/10">
          {props.title}
        </h3>
      </Show>
      <dl class="divide-y divide-gray-200 dark:divide-white/10 border-b border-gray-200 dark:border-white/10">
        <For each={data()}>
          {([key, value]) => (
            <Show when={value !== undefined}>
              <div class="flex justify-between py-3 first:pt-0 text-sm font-medium">
                <dt class="text-gray-500 dark:text-gray-400 truncate">{key}</dt>
                <dd class="text-gray-900 dark:text-white truncate">{value}</dd>
              </div>
            </Show>
          )}
        </For>
      </dl>
    </div>
  );
}
