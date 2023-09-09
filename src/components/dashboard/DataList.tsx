import { splitProps, type ComponentProps } from 'solid-js';

export function DataListContainer(props: ComponentProps<'section'>) {
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

export function DataList(props: ComponentProps<'ul'>) {
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
