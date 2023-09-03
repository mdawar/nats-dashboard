import { Show } from 'solid-js';

import { useVarz } from '~/lib/queries';
import { formatBytes, abbreviateNum, durationFromNs } from '~/lib/utils';
import DataCard from '~/components/DataCard';

export default function InfoCards() {
  const varz = useVarz();

  const jsEnabled = () => !!Object.keys(varz.data?.jetstream ?? {}).length;
  const wsEnabled = () => !!Object.keys(varz.data?.websocket ?? {}).length;
  const leafEnabled = () => !!Object.keys(varz.data?.leaf ?? {}).length;
  const mqttEnabled = () => !!Object.keys(varz.data?.mqtt ?? {}).length;

  return (
    <div class="px-4 py-8 sm:px-6 lg:px-8 tabular-nums slashed-zero">
      <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-8">
        <div class="flex flex-col gap-8">
          <DataCard
            title="Server"
            data={{
              Host: varz.data?.host,
              Port: varz.data?.port,
              'Protocol Version': varz.data?.proto,
              Version: varz.data?.version,
              JetStream: jsEnabled() ? 'Enabled' : 'Disabled',
              Cores: varz.data?.cores,
              GOMAXPROCS: varz.data?.gomaxprocs,
              'Auth. Required': varz.data?.auth_required ? 'Yes' : 'No',
              'Go Version': varz.data?.go,
              'Git Commit': varz.data?.git_commit,
              'System Account': varz.data?.system_account,
            }}
          />

          <Show when={leafEnabled()}>
            <DataCard
              title="Leaf Node"
              data={{
                Host: varz.data?.leaf?.host,
                Port: varz.data?.leaf?.port,
                'Auth. Timeout': `${varz.data?.leaf?.auth_timeout}s`,
                'TLS Required': varz.data?.leaf?.tls_required ? 'Yes' : 'No',
                'TLS Timeout': `${varz.data?.leaf?.tls_timeout}s`,
              }}
            />
          </Show>
        </div>

        <Show when={jsEnabled()}>
          <div class="flex flex-col gap-8">
            <DataCard
              title="JetStream Stats"
              data={{
                Memory: formatBytes(varz.data?.jetstream?.stats?.memory ?? 0)
                  .str,
                'Reserved Memory': formatBytes(
                  varz.data?.jetstream?.stats?.reserved_memory ?? 0
                ).str,
                Storage: formatBytes(varz.data?.jetstream?.stats?.storage ?? 0)
                  .str,
                'Reserved Storage': formatBytes(
                  varz.data?.jetstream?.stats?.reserved_storage ?? 0
                ).str,
                Accounts: varz.data?.jetstream?.stats?.accounts,
                'HA Assets': varz.data?.jetstream?.stats?.ha_assets,
                'API Total': abbreviateNum(
                  varz.data?.jetstream?.stats?.api.total ?? 0
                ).str,
                'API Errors': abbreviateNum(
                  varz.data?.jetstream?.stats?.api.errors ?? 0
                ).str,
              }}
            />

            <DataCard
              title="JetStream Config"
              data={{
                'Max Memory': formatBytes(
                  varz.data?.jetstream?.config?.max_memory ?? 0
                ).str,
                'Max Storage': formatBytes(
                  varz.data?.jetstream?.config?.max_storage ?? 0
                ).str,
                'Store Directory': varz.data?.jetstream?.config?.store_dir,
                'Compression Allowed': varz.data?.jetstream?.config?.compress_ok
                  ? 'Yes'
                  : 'No',
              }}
            />
          </div>
        </Show>

        <Show when={wsEnabled() || mqttEnabled()}>
          <div class="flex flex-col gap-8">
            <Show when={wsEnabled()}>
              <DataCard
                title="WebSocket"
                data={{
                  Host: varz.data?.websocket?.host,
                  Port: varz.data?.websocket?.port,
                  'No Auth. User': varz.data?.websocket?.no_auth_user,
                  'Handshake Timeout': durationFromNs(
                    varz.data?.websocket?.handshake_timeout ?? 0
                  ),
                  Compression: varz.data?.websocket?.compression ? 'Yes' : 'No',
                }}
              />
            </Show>

            <Show when={mqttEnabled()}>
              <DataCard
                title="MQTT"
                data={{
                  Host: varz.data?.mqtt?.host,
                  Port: varz.data?.mqtt?.port,
                  'No Auth. User': varz.data?.mqtt?.no_auth_user,
                  'TLS Timeout': `${varz.data?.mqtt?.tls_timeout}s`,
                  'ACK Wait': durationFromNs(varz.data?.mqtt?.ack_wait ?? 0),
                  'Max ACK Pending': formatBytes(
                    varz.data?.mqtt?.max_ack_pending ?? 0
                  ).str,
                }}
              />
            </Show>
          </div>
        </Show>

        <div class="flex flex-col gap-8">
          <DataCard
            title="Monitoring Server"
            data={{
              Host: varz.data?.http_host,
              'HTTP Port': varz.data?.http_port,
              'HTTPS Port': varz.data?.https_port,
              'Base Path': varz.data?.http_base_path || '/',
            }}
          />
          <DataCard
            title="HTTP Request Stats"
            data={formatReqStats(varz.data?.http_req_stats) ?? {}}
          />
        </div>
      </div>
    </div>
  );
}

function formatReqStats(
  stats: Record<string, number> | undefined
): Record<string, string> | undefined {
  if (!stats) return stats;

  const fmt: Record<string, string> = {};

  for (const [key, value] of Object.entries(stats)) {
    fmt[key] = abbreviateNum(value).str;
  }

  return fmt;
}
