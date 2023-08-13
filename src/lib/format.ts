import type { PartialInfoResponse } from '~/lib/info';
import {
  formatBytes,
  abbreviateNum,
  calculateRates,
  formatUptime,
  formatLastActivity,
  diffInSecondsToNow,
  type FormattedBytes,
  type AbbreviatedNumber,
} from '~/lib/utils';

/** Formatted server information. */
export interface FormattedVarz {
  /** Server ID. */
  serverID: string;
  /** Server name. */
  serverName: string;
  /** Server version. */
  version: string;
  /** Server uptime. */
  uptime: string;
  /** Server CPU usage in percentage. */
  cpu: number;
  /** Server memory usage. */
  memory: FormattedBytes;
  /** Number of current connections. */
  conns: AbbreviatedNumber;
  /** Number of total connections. */
  totalConns: AbbreviatedNumber;
  /** Number of subscriptions. */
  subs: AbbreviatedNumber;
  /** Number of slow consumers. */
  slowCons: AbbreviatedNumber;
  /** Total messages received by the server. */
  inMsgs: AbbreviatedNumber;
  /** Total messages sent by the server. */
  outMsgs: AbbreviatedNumber;
  /** Total data size received by the server. */
  inBytes: FormattedBytes;
  /** Total data size sent by the server. */
  outBytes: FormattedBytes;
  /** Time delta between the current and previous request in milliseconds. */
  timeDelta: number;
  /** Rate of received messages per second. */
  inMsgsRate: AbbreviatedNumber;
  /** Rate of sent messages per second. */
  outMsgsRate: AbbreviatedNumber;
  /** Rate of data size received per second. */
  inBytesRate: FormattedBytes;
  /** Rate of data size sent per second. */
  outBytesRate: FormattedBytes;
}

/** Format the server information for display. */
export function formatVarz(varz: PartialInfoResponse<'varz'>): FormattedVarz {
  const { current, previous } = varz;

  const rates = calculateRates({
    now: current?.now,
    then: previous?.now,
    current,
    previous,
  });

  return {
    serverID: current?.server_id ?? '',
    serverName: current?.server_name ?? '',
    version: current?.version ?? '',
    uptime: formatUptime(current?.uptime ?? ''),
    cpu: current?.cpu ?? 0,
    memory: formatBytes(current?.mem ?? 0),
    conns: abbreviateNum(current?.connections ?? 0),
    totalConns: abbreviateNum(current?.total_connections ?? 0),
    subs: abbreviateNum(current?.subscriptions ?? 0),
    slowCons: abbreviateNum(current?.slow_consumers ?? 0),
    inMsgs: abbreviateNum(current?.in_msgs ?? 0),
    outMsgs: abbreviateNum(current?.out_msgs ?? 0),
    inBytes: formatBytes(current?.in_bytes ?? 0),
    outBytes: formatBytes(current?.out_bytes ?? 0),
    ...rates,
  };
}

/** Formatted connections information. */
interface FormattedConnz extends PartialInfoResponse<'connz'> {
  /** Number of client connections. */
  numConnections: number;
  /** List of connections to the server. */
  connections: ConnectionInfo[];
}

/** Single client connection information. */
export interface ConnectionInfo {
  cid: number;
  /** Host and port of the client. */
  host: string;
  /** Client name. */
  name?: string | undefined;
  /** Client language. */
  lang?: string | undefined;
  /** Client version. */
  version?: string | undefined;
  /** Client information. */
  info?: Record<string, string | number>;
  /** Number of seconds since the client's last activity. */
  lastActive: number;
}

/** Format the connections data for display. */
export function formatConnz(
  connz: PartialInfoResponse<'connz'>
): FormattedConnz {
  const { current } = connz;

  const connections: ConnectionInfo[] =
    current?.connections.map((conn) => ({
      cid: conn.cid,
      host: `${conn.ip}:${conn.port}`,
      name: conn.name,
      lang: conn.lang,
      version: conn.version,
      lastActive: diffInSecondsToNow(conn.last_activity),
      info: {
        Uptime: formatUptime(conn.uptime),
        'Last activity': formatLastActivity(conn.last_activity),
        Subs: conn.subscriptions,
        Pending: formatBytes(conn.pending_bytes).str,
        'Msgs. Sent': abbreviateNum(conn.in_msgs).str,
        'Msgs. Received': abbreviateNum(conn.out_msgs).str,
        'Data Sent': formatBytes(conn.in_bytes).str,
        'Data Received': formatBytes(conn.out_bytes).str,
      },
    })) ?? [];

  return {
    numConnections: current?.num_connections ?? 0,
    connections,
  };
}
