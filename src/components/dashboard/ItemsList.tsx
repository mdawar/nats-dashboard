import { Index } from 'solid-js';

interface Props {
  title: string;
  items: string[];
}

export default function ItemsList(props: Props) {
  return (
    <div>
      <h3 class="font-medium text-gray-900 dark:text-white">{props.title}</h3>
      <div class="mt-2 divide-y divide-gray-200 dark:divide-white/10 border-b border-t border-gray-200 dark:border-white/10">
        <Index each={props.items}>
          {(item) => (
            <p class="py-3 text-sm font-medium text-gray-500 dark:text-gray-400 break-all">
              {item()}
            </p>
          )}
        </Index>
      </div>
    </div>
  );
}
