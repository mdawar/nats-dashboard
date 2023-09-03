import { createMemo, For, type ParentProps } from 'solid-js';

interface CardProps extends ParentProps {
  title: string;
  data: Record<string, number | string | undefined>;
}

export default function DataCard(props: CardProps) {
  const data = createMemo(() => Object.entries(props.data));

  return (
    <div class="divide-y divide-gray-800/10 dark:divide-white/10 overflow-hidden bg-gray-50 dark:bg-gray-700/10 border border-gray-800/10 dark:border-white/10 shadow-sm">
      <h4 class="px-4 py-5 sm:px-6 dark:text-white text-sm font-semibold">
        {props.title}
      </h4>
      <div>
        <dl class="divide-y divide-gray-200 dark:divide-white/10">
          <For each={data()}>
            {([key, value]) => {
              // Do not display undefined values.
              if (value === undefined) return null;

              return (
                <div class="flex justify-between p-4 py-3 sm:px-6 text-sm font-medium">
                  <dt class="text-gray-500 dark:text-gray-400 truncate">
                    {key}
                  </dt>
                  <dd class="text-gray-900 dark:text-white truncate">
                    {value}
                  </dd>
                </div>
              );
            }}
          </For>
        </dl>
      </div>
    </div>
  );
}
