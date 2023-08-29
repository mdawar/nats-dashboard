import type { ParentProps } from 'solid-js';

import { useSettings } from '~/components/context/settings';
import Select from '~/components/Select';
import Toggle from '~/components/Toggle';
import {
  sortOptions,
  limitOptions,
  stateOptions,
  subsOptions,
} from '~/components/dashboard/options';

export default function ConnectionSettings() {
  const [settings, actions] = useSettings();

  return (
    <div>
      <div class="px-4 sm:px-0">
        <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
          Connection Settings
        </h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
          Select how to fetch and display connections.
        </p>
      </div>
      <div class="mt-4 sm:mt-6 border-t border-gray-100 dark:border-white/10">
        <div class="divide-y divide-gray-100 dark:divide-white/10">
          <SettingSection title="Sort by">
            <Select
              options={sortOptions(settings.connz.state)}
              value={settings.connz.sort}
              onChange={actions.setConnzSort}
            />
          </SettingSection>

          <SettingSection title="Limit">
            <Select
              options={limitOptions}
              value={settings.connz.limit}
              onChange={actions.setConnzLimit}
            />
          </SettingSection>

          <SettingSection title="State">
            <Select
              options={stateOptions}
              value={settings.connz.state}
              onChange={actions.setConnzState}
            />
          </SettingSection>

          <SettingSection title="Subscriptions">
            <Select
              options={subsOptions}
              value={settings.connz.subs}
              onChange={actions.setConnzSubs}
            />
          </SettingSection>

          <SettingSection title="Authentication">
            <Toggle
              checked={settings.connz.auth}
              onChange={actions.setConnzAuth}
            />
          </SettingSection>
        </div>
      </div>
    </div>
  );
}

interface SectionProps extends ParentProps {
  title: string;
}

function SettingSection(props: SectionProps) {
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
