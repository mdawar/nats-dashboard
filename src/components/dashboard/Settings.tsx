import { Show, type ParentProps } from 'solid-js';

export function SettingsBody(props: ParentProps) {
  return (
    <div class="mt-4 sm:mt-6 border-t border-gray-100 dark:border-white/10">
      <div class="divide-y divide-gray-100 dark:divide-white/10" {...props} />
    </div>
  );
}

interface HeaderProps {
  title: string;
  description?: string;
}

export function SettingsHeader(props: HeaderProps) {
  return (
    <div class="px-4 sm:px-0">
      <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
        {props.title}
      </h3>
      <Show when={props.description}>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
          {props.description}
        </p>
      </Show>
    </div>
  );
}

interface SectionProps extends ParentProps {
  title: string;
}

export function SettingSection(props: SectionProps) {
  return (
    <div class="px-4 py-4 sm:py-6 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <div class="text-sm font-medium text-gray-900 dark:text-white">
        {props.title}
      </div>
      <div class="mt-2 text-sm text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
        {props.children}
      </div>
    </div>
  );
}
