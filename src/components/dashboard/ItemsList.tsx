import { Show, Index } from 'solid-js';

interface Props {
  title?: string;
  items: string[];
}

export default function ItemsList(props: Props) {
  return (
    <div>
      <Show when={props.title}>
        <h3 class="pb-2 mb-3 font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/10">
          {props.title}
        </h3>
      </Show>
      <div class="divide-y divide-gray-200 dark:divide-white/10 border-b border-gray-200 dark:border-white/10">
        <Index each={props.items}>
          {(item) => (
            <p class="py-3 first:pt-0 text-sm font-medium text-gray-500 dark:text-gray-400 break-all">
              {item()}
            </p>
          )}
        </Index>
      </div>
    </div>
  );
}
