import { Show } from 'solid-js';

interface Props {
  title: string;
  stat: string | number;
  unit?: string | undefined;
}

export default function StatCell(props: Props) {
  return (
    <div class="bg-gray-50 dark:bg-gray-900">
      <div class="h-full px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-700/10">
        <p class="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
          {props.title}
        </p>
        <p class="mt-2 flex items-baseline gap-x-2">
          <span class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {props.stat}
          </span>
          <Show when={props.unit}>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {props.unit}
            </span>
          </Show>
        </p>
      </div>
    </div>
  );
}
