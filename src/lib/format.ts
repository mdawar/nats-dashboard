import type { PartialInfoResponse } from '~/lib/info';
import type { ConnInfo } from '~/types/common';
import {
  formatBytes,
  abbreviateNum,
  calculateRates,
  formatDuration,
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
    uptime: formatDuration(current?.uptime ?? ''),
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
interface FormattedConnz {
  /** Number of client connections. */
  numConnections: number;
  /** List of connections to the server. */
  connections: ClientConnection[];
}

/**
 * Information about the client connection.
 *
 * Includes the original connection data returned by the server
 * plus an `info` property that holds formatted connection data.
 */
export interface ClientConnection extends ConnInfo {
  info: ConnectionInfo;
}

/** Formatted connection information. */
interface ConnectionInfo {
  /** Formatted uptime string of the client connection. */
  uptime: string;
  /** Number of seconds since the client's last activity. */
  lastActive: number;
  /** Human readable last activity of the client. */
  lastActivity: string;
  /** Pending bytes. */
  pending: FormattedBytes;
  /** Total messages sent by the client. */
  inMsgs: AbbreviatedNumber;
  /** Total messages received by the client. */
  outMsgs: AbbreviatedNumber;
  /** Total data size sent by the client. */
  inBytes: FormattedBytes;
  /** Total data size received by the client. */
  outBytes: FormattedBytes;
  /** Time delta in milliseconds between the current and previous data. */
  timeDelta: number;
  /** Rate of sent messages per second. */
  inMsgsRate: AbbreviatedNumber;
  /** Rate of received messages per second. */
  outMsgsRate: AbbreviatedNumber;
  /** Rate of data size sent per second. */
  inBytesRate: FormattedBytes;
  /** Rate of data size received per second. */
  outBytesRate: FormattedBytes;
}

/** Map of client connections by CID. */
type ConnectionsMap = Record<number, ConnInfo>;

/** Format the connections data for display. */
export function formatConnz(
  connz: PartialInfoResponse<'connz'>
): FormattedConnz {
  const { current, previous } = connz;

  /** Map of the previous connections by CID. */
  const prevConns: ConnectionsMap =
    previous?.connections.reduce((acc, c) => {
      acc[c.cid] = c;
      return acc;
    }, {} as ConnectionsMap) ?? {};

  const connections: ClientConnection[] =
    current?.connections.map((conn) => {
      // Returns zero rates if any of the params is undefined.
      const rates = calculateRates({
        now: current?.now,
        then: previous?.now,
        current: conn,
        previous: prevConns[conn.cid],
      });

      return {
        ...conn,
        info: {
          uptime: formatDuration(conn.uptime),
          lastActive: diffInSecondsToNow(conn.last_activity),
          lastActivity: formatLastActivity(conn.last_activity),
          pending: formatBytes(conn.pending_bytes),
          inMsgs: abbreviateNum(conn.in_msgs),
          outMsgs: abbreviateNum(conn.out_msgs),
          inBytes: formatBytes(conn.in_bytes),
          outBytes: formatBytes(conn.out_bytes),
          ...rates,
        },
      };
    }) ?? [];

  return {
    numConnections: current?.num_connections ?? 0,
    connections,
  };
}
