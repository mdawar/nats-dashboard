import { createMemo, Show, For, type ParentProps } from 'solid-js';

import { useVarz } from '~/lib/queries';
import { formatBytes, abbreviateNum, durationFromMs } from '~/lib/utils';

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
          <Card title="Server">
            <InfoList
              info={{
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
          </Card>

          <Show when={leafEnabled()}>
            <Card title="Leaf Node">
              <InfoList
                info={{
                  Host: varz.data?.leaf?.host,
                  Port: varz.data?.leaf?.port,
                  'Auth. Timeout': `${varz.data?.leaf?.auth_timeout}s`,
                  'TLS Required': varz.data?.leaf?.tls_required ? 'Yes' : 'No',
                  'TLS Timeout': `${varz.data?.leaf?.tls_timeout}s`,
                }}
              />
            </Card>
          </Show>
        </div>

        <Show when={jsEnabled()}>
          <div class="flex flex-col gap-8">
            <Card title="JetStream Stats">
              <InfoList
                info={{
                  Memory: formatBytes(varz.data?.jetstream?.stats?.memory ?? 0)
                    .str,
                  'Reserved Memory': formatBytes(
                    varz.data?.jetstream?.stats?.reserved_memory ?? 0
                  ).str,
                  Storage: formatBytes(
                    varz.data?.jetstream?.stats?.storage ?? 0
                  ).str,
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
            </Card>

            <Card title="JetStream Config">
              <InfoList
                info={{
                  'Max Memory': formatBytes(
                    varz.data?.jetstream?.config?.max_memory ?? 0
                  ).str,
                  'Max Storage': formatBytes(
                    varz.data?.jetstream?.config?.max_storage ?? 0
                  ).str,
                  'Store Directory': varz.data?.jetstream?.config?.store_dir,
                  'Compression Allowed': varz.data?.jetstream?.config
                    ?.compress_ok
                    ? 'Yes'
                    : 'No',
                }}
              />
            </Card>
          </div>
        </Show>

        <Show when={wsEnabled() || mqttEnabled()}>
          <div class="flex flex-col gap-8">
            <Show when={wsEnabled()}>
              <Card title="WebSocket">
                <InfoList
                  info={{
                    Host: varz.data?.websocket?.host,
                    Port: varz.data?.websocket?.port,
                    'No Auth. User': varz.data?.websocket?.no_auth_user,
                    'Handshake Timeout': durationFromMs(
                      (varz.data?.websocket?.handshake_timeout ?? 0) / 1_000_000
                    ),
                    Compression: varz.data?.websocket?.compression
                      ? 'Yes'
                      : 'No',
                  }}
                />
              </Card>
            </Show>

            <Show when={mqttEnabled()}>
              <Card title="MQTT">
                <InfoList
                  info={{
                    Host: varz.data?.mqtt?.host,
                    Port: varz.data?.mqtt?.port,
                    'No Auth. User': varz.data?.mqtt?.no_auth_user,
                    'TLS Timeout': `${varz.data?.mqtt?.tls_timeout}s`,
                    'ACK Wait': durationFromMs(
                      (varz.data?.mqtt?.ack_wait ?? 0) / 1_000_000
                    ),
                    'Max ACK Pending': formatBytes(
                      varz.data?.mqtt?.max_ack_pending ?? 0
                    ).str,
                  }}
                />
              </Card>
            </Show>
          </div>
        </Show>

        <div class="flex flex-col gap-8">
          <Card title="Monitoring Server">
            <InfoList
              info={{
                Host: varz.data?.http_host,
                'HTTP Port': varz.data?.http_port,
                'HTTPS Port': varz.data?.https_port,
                'Base Path': varz.data?.http_base_path || '/',
              }}
            />
          </Card>
          <Card title="HTTP Request Stats">
            <InfoList info={formatReqStats(varz.data?.http_req_stats) ?? {}} />
          </Card>
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

interface CardProps extends ParentProps {
  title: string;
}

function Card(props: CardProps) {
  return (
    <div class="divide-y divide-gray-800/10 dark:divide-white/10 overflow-hidden bg-gray-50 dark:bg-gray-700/10 border border-gray-800/10 dark:border-white/10 shadow-sm">
      <h4 class="px-4 py-5 sm:px-6 dark:text-white text-sm font-semibold">
        {props.title}
      </h4>
      <div>{props.children}</div>
    </div>
  );
}

interface InfoListProps {
  info: Record<string, number | string | undefined>;
}

function InfoList(props: InfoListProps) {
  const info = createMemo(() => Object.entries(props.info));

  return (
    <dl class="divide-y divide-gray-200 dark:divide-white/10">
      <For each={info()}>
        {([key, value]) => (
          <div class="flex justify-between p-4 py-3 sm:px-6 text-sm font-medium">
            <dt class="text-gray-500 dark:text-gray-400 truncate">{key}</dt>
            <dd class="text-gray-900 dark:text-white truncate">{value}</dd>
          </div>
        )}
      </For>
    </dl>
  );
}
