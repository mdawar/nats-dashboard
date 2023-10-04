import type { ParentProps } from 'solid-js';

export function InfoSection(props: ParentProps) {
  return (
    <div
      class="relative flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-50 dark:bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8 tabular-nums slashed-zero"
      {...props}
    />
  );
}

export function DetailList(props: ParentProps) {
  return (
    <div
      class="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-1"
      {...props}
    />
  );
}

interface DetailItemProps {
  name: string;
  value: string | undefined;
  class?: string;
}

export function DetailItem(props: DetailItemProps) {
  if (!props.value) return null;

  return (
    <p
      class="text-xs leading-6 text-gray-500 dark:text-gray-400"
      classList={{
        [props.class!]: !!props.class,
      }}
    >
      <span class="font-semibold text-gray-900 dark:text-white">
        {props.name}
      </span>
      <span class="break-all ml-1">{props.value}</span>
    </p>
  );
}

export function InfoBadge(props: ParentProps) {
  return (
    <div
      class="order-first flex-none rounded-full bg-sky-50 text-sky-700 ring-sky-700/10 dark:bg-sky-400/10 px-2 py-1 text-xs font-medium dark:text-sky-400 ring-1 ring-inset dark:ring-sky-400/30 sm:order-none"
      {...props}
    />
  );
}
