import { splitProps, type ComponentProps } from 'solid-js';

export default function Checkbox(props: Omit<ComponentProps<'input'>, 'type'>) {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <input
      type="checkbox"
      class="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600 dark:border-white/10 dark:bg-white/5 dark:checked:bg-sky-600 dark:focus:ring-offset-gray-900"
      classList={{ [local.class!]: !!local.class }}
      {...rest}
    />
  );
}
