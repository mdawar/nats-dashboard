import { useSettings } from '~/components/context/settings';
import {
  SettingsHeader,
  SettingsBody,
  SettingSection,
} from '~/components/dashboard/Settings';
import Select from '~/components/Select';
import Toggle from '~/components/Toggle';

import {
  sortOptions,
  limitOptions,
  stateOptions,
  subsOptions,
} from './options';

export default function ConnectionSettings() {
  const [settings, actions] = useSettings();

  return (
    <div>
      <SettingsHeader
        title="Connection Settings"
        description="Select how to fetch and display connections"
      />
      <SettingsBody>
        <SettingSection title="Sort by">
          <Select
            options={sortOptions(settings.connz.query.state)}
            value={settings.connz.query.sort}
            onChange={actions.setConnzSort}
          />
        </SettingSection>

        <SettingSection title="Limit">
          <Select
            options={limitOptions}
            value={settings.connz.query.limit}
            onChange={actions.setConnzLimit}
          />
        </SettingSection>

        <SettingSection title="State">
          <Select
            options={stateOptions}
            value={settings.connz.query.state}
            onChange={actions.setConnzState}
          />
        </SettingSection>

        <SettingSection title="Subscriptions">
          <Select
            options={subsOptions}
            value={settings.connz.query.subs}
            onChange={actions.setConnzSubs}
          />
        </SettingSection>

        <SettingSection title="Authentication">
          <Toggle
            checked={settings.connz.query.auth}
            onChange={actions.setConnzAuth}
          />
        </SettingSection>
      </SettingsBody>
    </div>
  );
}
