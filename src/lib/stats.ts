import type { Varz } from '~/lib/types';
import { jsonp } from '~/lib/jsonp';
import {
  formatBytes,
  abbreviateNum,
  msTimeDiff,
  type FormattedBytes,
  type AbbreviatedNumber,
} from '~/lib/utils';

export interface ServerStats {
  // Fetch response time in milliseconds.
  responseTime: number;
  // General server information.
  varz: Varz;
  // Previous request's data.
  lastVarz: Varz | undefined;
}

export type PartialServerStats = Partial<ServerStats>;

// TODO: temporary
const cache = new Map<string, Varz>();

/** Fetch NATS server stats. */
export async function fetchStats(url: string): Promise<PartialServerStats> {
  const start = performance.now();
  const varz = await jsonp<Varz>(`${url}/varz`);
  const end = performance.now();

  const stats = {
    responseTime: end - start,
    varz,
    lastVarz: cache.get(url),
  };

  cache.set(url, varz);

  return stats;
}

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
export function formatStats(stats: PartialServerStats): FormattedStats {
  const { varz, lastVarz } = stats;

  // Time delta between the current and previous request in milliseconds.
  // Using the server reported time instead of request time.
  const timeDeltaMs =
    varz?.now && lastVarz?.now ? msTimeDiff(varz.now, lastVarz.now) : 0;

  // Time delta in seconds.
  const timeDeltaSec = timeDeltaMs / 1000;

  const inMsgsDelta = (varz?.in_msgs ?? 0) - (lastVarz?.in_msgs ?? 0);

  const inMsgsRate = abbreviateNum(
    timeDeltaSec > 0 ? Math.max(inMsgsDelta, 0) / timeDeltaSec : 0
  );

  const outMsgsDelta = (varz?.out_msgs ?? 0) - (lastVarz?.out_msgs ?? 0);

  const outMsgsRate = abbreviateNum(
    timeDeltaSec > 0 ? Math.max(outMsgsDelta, 0) / timeDeltaSec : 0
  );

  const inBytesDelta = (varz?.in_bytes ?? 0) - (lastVarz?.in_bytes ?? 0);

  const inBytesRate = formatBytes(
    timeDeltaSec > 0 ? Math.max(inBytesDelta, 0) / timeDeltaSec : 0
  );

  const outBytesDelta = (varz?.out_bytes ?? 0) - (lastVarz?.out_bytes ?? 0);

  const outBytesRate = formatBytes(
    timeDeltaSec > 0 ? Math.max(outBytesDelta, 0) / timeDeltaSec : 0
  );

  return {
    cpu: varz?.cpu ?? 0,
    memory: formatBytes(varz?.mem ?? 0),
    conns: abbreviateNum(varz?.connections ?? 0),
    totalConns: abbreviateNum(varz?.total_connections ?? 0),
    subs: abbreviateNum(varz?.subscriptions ?? 0),
    slowCons: abbreviateNum(varz?.slow_consumers ?? 0),
    inMsgs: abbreviateNum(varz?.in_msgs ?? 0),
    outMsgs: abbreviateNum(varz?.out_msgs ?? 0),
    inBytes: formatBytes(varz?.in_bytes ?? 0),
    outBytes: formatBytes(varz?.out_bytes ?? 0),
    timeDelta: timeDeltaMs,
    inMsgsRate,
    outMsgsRate,
    inBytesRate,
    outBytesRate,
  };
}