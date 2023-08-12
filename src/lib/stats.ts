import type { PartialInfoResponse } from '~/lib/info';
import {
  formatBytes,
  abbreviateNum,
  formatUptime,
  formatLastActivity,
  msTimeDiff,
  diffInSecondsToNow,
  type FormattedBytes,
  type AbbreviatedNumber,
} from '~/lib/utils';

/** Formatted server stats. */
export interface FormattedStats {
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

/** Format the server stats for display. */
export function formatStats(
  stats: PartialInfoResponse<'varz'>
): FormattedStats {
  const { current, previous } = stats;

  // Time delta between the current and previous request in milliseconds.
  // Using the server reported time instead of request time.
  const timeDeltaMs =
    current?.now && previous?.now ? msTimeDiff(current.now, previous.now) : 0;

  // Time delta in seconds.
  const timeDeltaSec = timeDeltaMs / 1000;

  const inMsgsDelta = (current?.in_msgs ?? 0) - (previous?.in_msgs ?? 0);

  const inMsgsRate = abbreviateNum(
    timeDeltaSec > 0 ? Math.max(inMsgsDelta, 0) / timeDeltaSec : 0
  );

  const outMsgsDelta = (current?.out_msgs ?? 0) - (previous?.out_msgs ?? 0);

  const outMsgsRate = abbreviateNum(
    timeDeltaSec > 0 ? Math.max(outMsgsDelta, 0) / timeDeltaSec : 0
  );

  const inBytesDelta = (current?.in_bytes ?? 0) - (previous?.in_bytes ?? 0);

  const inBytesRate = formatBytes(
    timeDeltaSec > 0 ? Math.max(inBytesDelta, 0) / timeDeltaSec : 0
  );

  const outBytesDelta = (current?.out_bytes ?? 0) - (previous?.out_bytes ?? 0);

  const outBytesRate = formatBytes(
    timeDeltaSec > 0 ? Math.max(outBytesDelta, 0) / timeDeltaSec : 0
  );

  return {
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
    timeDelta: timeDeltaMs,
    inMsgsRate,
    outMsgsRate,
    inBytesRate,
    outBytesRate,
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
        Pending: formatBytes(conn.pending_bytes).display,
        'Msgs. Sent': abbreviateNum(conn.in_msgs).display,
        'Msgs. Received': abbreviateNum(conn.out_msgs).display,
        'Data Sent': formatBytes(conn.in_bytes).display,
        'Data Received': formatBytes(conn.out_bytes).display,
      },
    })) ?? [];

  return {
    numConnections: current?.num_connections ?? 0,
    connections,
  };
}
