import { useSettings } from '~/components/context/settings';
import {
  SettingsHeader,
  SettingsBody,
  SettingSection,
} from '~/components/dashboard/Settings';
import Select, { type Options } from '~/components/Select';
import Toggle from '~/components/Toggle';

const intervalOptions: Options<number> = [
  { value: 100, label: '100ms' },
  { value: 250, label: '250ms' },
  { value: 500, label: '500ms' },
  { value: 1000, label: '1s' },
  { value: 2000, label: '2s' },
  { value: 3000, label: '3s' },
  { value: 5000, label: '5s' },
  { value: 10000, label: '10s' },
  { value: 20000, label: '20s' },
  { value: 30000, label: '30s' },
];

export default function AppSettings() {
  const [settings, actions] = useSettings();

  return (
    <div>
      <SettingsHeader
        title="App Settings"
        description="Customize the data fetching settings."
      />
      <SettingsBody>
        <SettingSection title="Polling Interval">
          <Select
            options={intervalOptions}
            value={settings.interval}
            onChange={actions.setInterval}
          />
        </SettingSection>
        <SettingSection
          title="JSONP Requests"
          description={
            <>
              Required for NATS server prior to{' '}
              <span class="font-bold">v2.9.22</span>
            </>
          }
        >
          <Toggle checked={settings.jsonp} onChange={actions.setJSONP} />
        </SettingSection>
      </SettingsBody>
    </div>
  );
}
