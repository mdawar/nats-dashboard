import { createMemo, splitProps, For, type ComponentProps } from 'solid-js';

import { paginationRange } from '~/lib/pagination';

export function StackedListContainer(props: ComponentProps<'section'>) {
  return <section class="tabular-nums slashed-zero" {...props} />;
}

export function Header(props: ComponentProps<'header'>) {
  return (
    <header
      class="flex items-center justify-between border-b border-gray-200 dark:border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
      {...props}
    />
  );
}

export function HeaderTitle(props: ComponentProps<'h2'>) {
  return (
    <h2
      class="text-base font-semibold leading-7 text-gray-900 dark:text-white"
      {...props}
    />
  );
}

export function HeaderControls(props: ComponentProps<'div'>) {
  return <div class="flex items-center gap-6" {...props} />;
}

export function HeaderButton(props: ComponentProps<'button'>) {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <button
      type="button"
      class="text-sm font-medium leading-6 text-gray-900 dark:text-white"
      classList={{ [local.class!]: !!local.class }}
      {...rest}
    />
  );
}

export function HeaderSeparator(props: ComponentProps<'div'>) {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <div
      class="h-6 w-px bg-gray-300 dark:bg-white/10"
      classList={{ [local.class!]: !!local.class }}
      {...rest}
    />
  );
}

export function ContentContainer(props: ComponentProps<'div'>) {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <div
      class="px-4 py-6 sm:px-6 lg:px-8 text-gray-900 dark:text-white"
      classList={{ [local.class!]: !!local.class }}
      {...rest}
    />
  );
}

export function StackedList(props: ComponentProps<'ul'>) {
  return (
    <ul
      role="list"
      class="divide-y divide-gray-200 dark:divide-white/5"
      {...props}
    />
  );
}

export function ListItem(props: ComponentProps<'li'>) {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <li
      class="px-4 py-6 sm:px-6 lg:px-8 text-gray-900 dark:text-white"
      classList={{ [local.class!]: !!local.class }}
      {...rest}
    />
  );
}

export function ListPagination(props: ComponentProps<'nav'>) {
  return (
    <nav
      class="flex items-center justify-between border-t border-gray-200 dark:border-white/10 px-4 pb-6 sm:px-6 lg:px-8"
      {...props}
    />
  );
}

export function PrevButton(props: ComponentProps<'button'>) {
  return (
    <div class="-mt-px flex w-0 flex-1">
      <button
        class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/30 dark:hover:text-gray-300 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:pointer-events-none"
        {...props}
      >
        <svg
          class="mr-3 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
            clip-rule="evenodd"
          />
        </svg>
        Previous
      </button>
    </div>
  );
}

export function NextButton(props: ComponentProps<'button'>) {
  return (
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <button
        class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/30 dark:hover:text-gray-300 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:pointer-events-none"
        {...props}
      >
        Next
        <svg
          class="ml-3 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

interface PaginationRangeProps {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
  rangeSize?: number;
}

export function PaginationRange(props: PaginationRangeProps) {
  const range = createMemo(() =>
    paginationRange({
      total: props.totalPages,
      current: props.currentPage,
      size: props.rangeSize ?? 7,
    })
  );

  return (
    <div class="hidden md:-mt-px md:flex">
      <For each={range()}>
        {(page) => {
          if (page === '...') {
            return (
              <span class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-default">
                ...
              </span>
            );
          } else {
            return (
              <button
                class="inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium"
                classList={{
                  'border-sky-500 text-sky-600':
                    page === String(props.currentPage),
                  'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/30 dark:hover:text-gray-300':
                    page !== String(props.currentPage),
                }}
                onClick={() => props.onChange?.(Number(page))}
              >
                {page}
              </button>
            );
          }
        }}
      </For>
    </div>
  );
}
