import { Show } from 'solid-js';

import type { VarzQuery } from '~/lib/queries';
import {
  formatBytes,
  abbreviateNum,
  durationFromNs,
  abbreviateObjectValues,
} from '~/lib/utils';
import DataCard from '~/components/DataCard';

interface Props {
  varz: VarzQuery;
}

export default function InfoCards(props: Props) {
  return (
    <div class="px-4 py-8 sm:px-6 lg:px-8 tabular-nums slashed-zero">
      <div class="space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 xl:grid-cols-4 gap-8">
        <div class="flex flex-col gap-8">
          <DataCard
            title="Server"
            data={{
              Host: props.varz.data?.host,
              Port: props.varz.data?.port,
              'Protocol Version': props.varz.data?.proto,
              Version: props.varz.data?.version,
              JetStream: props.varz.data?.info.jsEnabled
                ? 'Enabled'
                : 'Disabled',
              Cores: props.varz.data?.cores,
              GOMAXPROCS: props.varz.data?.gomaxprocs,
              'Auth. Required': props.varz.data?.auth_required ? 'Yes' : 'No',
              'Go Version': props.varz.data?.go,
              'Git Commit': props.varz.data?.git_commit,
              'System Account': props.varz.data?.system_account,
            }}
          />

          <Show when={props.varz.data?.info.leafEnabled}>
            <DataCard
              title="Leaf Node"
              data={{
                Host: props.varz.data?.leaf?.host,
                Port: props.varz.data?.leaf?.port,
                'Auth. Timeout': `${props.varz.data?.leaf?.auth_timeout}s`,
                'TLS Required': props.varz.data?.leaf?.tls_required
                  ? 'Yes'
                  : 'No',
                'TLS Timeout': `${props.varz.data?.leaf?.tls_timeout}s`,
              }}
            />
          </Show>
        </div>

        <Show when={props.varz.data?.info.jsEnabled}>
          <div class="flex flex-col gap-8">
            <DataCard
              title="JetStream Stats"
              data={{
                Memory: formatBytes(
                  props.varz.data?.jetstream?.stats?.memory ?? 0
                ).str,
                'Reserved Memory': formatBytes(
                  props.varz.data?.jetstream?.stats?.reserved_memory ?? 0
                ).str,
                Storage: formatBytes(
                  props.varz.data?.jetstream?.stats?.storage ?? 0
                ).str,
                'Reserved Storage': formatBytes(
                  props.varz.data?.jetstream?.stats?.reserved_storage ?? 0
                ).str,
                Accounts: props.varz.data?.jetstream?.stats?.accounts,
                'HA Assets': props.varz.data?.jetstream?.stats?.ha_assets,
                'API Total': abbreviateNum(
                  props.varz.data?.jetstream?.stats?.api.total ?? 0
                ).str,
                'API Errors': abbreviateNum(
                  props.varz.data?.jetstream?.stats?.api.errors ?? 0
                ).str,
              }}
            />

            <DataCard
              title="JetStream Config"
              data={{
                'Max Memory': formatBytes(
                  props.varz.data?.jetstream?.config?.max_memory ?? 0
                ).str,
                'Max Storage': formatBytes(
                  props.varz.data?.jetstream?.config?.max_storage ?? 0
                ).str,
                'Store Directory':
                  props.varz.data?.jetstream?.config?.store_dir,
                'Sync Always':
                  props.varz.data?.jetstream?.config?.sync_always !== undefined
                    ? props.varz.data?.jetstream?.config?.sync_always
                      ? 'Yes'
                      : 'No'
                    : undefined,
                'Sync Interval': props.varz.data?.jetstream?.config
                  ?.sync_interval
                  ? durationFromNs(
                      props.varz.data?.jetstream?.config?.sync_interval
                    ).str
                  : undefined,
                'Compression Allowed': props.varz.data?.jetstream?.config
                  ?.compress_ok
                  ? 'Yes'
                  : 'No',
              }}
            />
          </div>
        </Show>

        <Show
          when={
            props.varz.data?.slow_consumer_stats ||
            props.varz.data?.info.wsEnabled ||
            props.varz.data?.info.mqttEnabled
          }
        >
          <div class="flex flex-col gap-8">
            <Show when={props.varz.data?.slow_consumer_stats}>
              <DataCard
                title="Slow Consumer Stats"
                data={{
                  Clients: props.varz.data?.slow_consumer_stats?.clients,
                  Routes: props.varz.data?.slow_consumer_stats?.routes,
                  Gateways: props.varz.data?.slow_consumer_stats?.gateways,
                  Leafs: props.varz.data?.slow_consumer_stats?.leafs,
                }}
              />
            </Show>

            <Show when={props.varz.data?.info.wsEnabled}>
              <DataCard
                title="WebSocket"
                data={{
                  Host: props.varz.data?.websocket?.host,
                  Port: props.varz.data?.websocket?.port,
                  TLS:
                    props.varz.data?.websocket?.no_tls !== undefined
                      ? props.varz.data?.websocket?.no_tls
                        ? 'Disabled'
                        : 'Enabled'
                      : undefined,
                  'No Auth. User': props.varz.data?.websocket?.no_auth_user,
                  'Handshake Timeout':
                    props.varz.data?.websocket?.handshake_timeout !== undefined
                      ? durationFromNs(
                          props.varz.data?.websocket?.handshake_timeout ?? 0
                        ).str
                      : undefined,
                  Compression:
                    props.varz.data?.websocket?.compression !== undefined
                      ? props.varz.data?.websocket?.compression
                        ? 'Enabled'
                        : 'Disabled'
                      : undefined,
                }}
              />
            </Show>

            <Show when={props.varz.data?.info.mqttEnabled}>
              <DataCard
                title="MQTT"
                data={{
                  Host: props.varz.data?.mqtt?.host,
                  Port: props.varz.data?.mqtt?.port,
                  'No Auth. User': props.varz.data?.mqtt?.no_auth_user,
                  'TLS Timeout': `${props.varz.data?.mqtt?.tls_timeout}s`,
                  'ACK Wait': durationFromNs(
                    props.varz.data?.mqtt?.ack_wait ?? 0
                  ).str,
                  'Max ACK Pending': formatBytes(
                    props.varz.data?.mqtt?.max_ack_pending ?? 0
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
              Host: props.varz.data?.http_host,
              'HTTP Port': props.varz.data?.http_port,
              'HTTPS Port': props.varz.data?.https_port,
              'Base Path': props.varz.data?.http_base_path || '/',
            }}
          />
          <DataCard
            title="HTTP Request Stats"
            data={abbreviateObjectValues(props.varz.data?.http_req_stats) ?? {}}
          />
        </div>
      </div>
    </div>
  );
}
