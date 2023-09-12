import type { PartialInfoResponse } from '~/lib/info';
import type {
  Varz,
  Connz,
  ConnInfo,
  SubDetail,
  Jsz,
  StreamDetail,
  StreamConfig,
  RetentionPolicy,
  DiscardPolicy,
  StorageType,
} from '~/types';
import {
  formatBytes,
  abbreviateNum,
  calculateRates,
  formatDuration,
  formatRTT,
  formatDate,
  formatDistance,
  diffInSecondsToNow,
  durationFromNs,
  type FormattedBytes,
  type AbbreviatedNumber,
  type Duration,
} from '~/lib/utils';

/** Formatted server information.
 *
 * Includes the original server data returned by the server
 * plus an `info` property that holds the formatted server information.
 */
export interface FormattedVarz extends Partial<Varz> {
  info: FormattedServerInfo;
}

/** Formatted server information. */
export interface FormattedServerInfo {
  /** Server uptime. */
  uptime: string;
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
  /** Is JetStream enabled. */
  jsEnabled: boolean;
  /** Are WebSocket connections enabled. */
  wsEnabled: boolean;
  /** Is leaf node enabled. */
  leafEnabled: boolean;
  /** Is MQTT enabled. */
  mqttEnabled: boolean;
  /** Maximum server connections. */
  maxConns: AbbreviatedNumber;
  /** Maximum payload size. */
  maxPayload: FormattedBytes;
  /** Maximum pending data size. */
  maxPending: FormattedBytes;
  /** Maximum control line size. */
  maxControlLine: FormattedBytes;
  /** Ping interval. */
  pingInterval: Duration;
  /** Write deadline. */
  writeDeadline: Duration;
}

/** Format the server information for display. */
export function formatVarz(varz: PartialInfoResponse<'varz'>): FormattedVarz {
  const { current, previous } = varz;

  const rates = calculateRates({
    start: previous?.now,
    end: current?.now,
    current,
    previous,
  });

  return {
    ...current,
    info: {
      uptime: formatDuration(current?.uptime ?? ''),
      memory: formatBytes(current?.mem ?? 0),
      conns: abbreviateNum(current?.connections ?? 0),
      totalConns: abbreviateNum(current?.total_connections ?? 0),
      subs: abbreviateNum(current?.subscriptions ?? 0),
      slowCons: abbreviateNum(current?.slow_consumers ?? 0),
      inMsgs: abbreviateNum(current?.in_msgs ?? 0),
      outMsgs: abbreviateNum(current?.out_msgs ?? 0),
      inBytes: formatBytes(current?.in_bytes ?? 0),
      outBytes: formatBytes(current?.out_bytes ?? 0),
      jsEnabled: Object.keys(current?.jetstream ?? {}).length !== 0,
      wsEnabled: Object.keys(current?.websocket ?? {}).length !== 0,
      leafEnabled: Object.keys(current?.leaf ?? {}).length !== 0,
      mqttEnabled: Object.keys(current?.mqtt ?? {}).length !== 0,
      maxConns: abbreviateNum(current?.max_connections ?? 0),
      maxPayload: formatBytes(current?.max_payload ?? 0),
      maxPending: formatBytes(current?.max_pending ?? 0),
      maxControlLine: formatBytes(current?.max_control_line ?? 0),
      pingInterval: durationFromNs(current?.ping_interval ?? 0),
      writeDeadline: durationFromNs(current?.write_deadline ?? 0),
      ...rates,
    },
  };
}

/**
 * Formatted connections information.
 *
 * Includes the original connections information with a formatted connections array.
 */
interface FormattedConnz extends Partial<Connz> {
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
  /** The connection state is open. */
  isOpen: boolean;
  /** A connection is considered active if it had any activity in the last 60 seconds. */
  isActive: boolean;
  /** Formatted uptime string of the client connection. */
  uptime: string;
  /** Formatted RTT string. */
  rtt: string;
  /** Human readable start time. */
  start: string;
  /** Human readable stop time. */
  stop: string | undefined;
  /** Number of seconds since the client's last activity. */
  lastActive: number;
  /** Human readable last activity of the client. */
  lastActivity: string;
  /** Total pending/queued bytes. */
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
  /** Sorted subscriptions list. */
  subscriptionsList: string[] | undefined;
  /** Sorted subscriptions list details. */
  subscriptionsListDetails: FormattedSubDetail[] | undefined;
}

/** Formatted verbose subscription information. */
export interface FormattedSubDetail extends Omit<SubDetail, 'msgs'> {
  /** Number of messages. */
  msgs: AbbreviatedNumber;
}

/** Map of client connections by CID. */
type ConnectionsMap = Record<number, ConnInfo>;

// Connection activity window in seconds.
const activityWindow = 60;

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
        start: previous?.now,
        end: current?.now,
        current: conn,
        previous: prevConns[conn.cid],
      });

      // The connection is open if we don't have a stop time.
      const isOpen = !conn.stop;

      const lastActive = diffInSecondsToNow(conn.last_activity);

      // In the case of a closed connection, idle is always "0s".
      const lastActivity = isOpen
        ? conn.idle === '0s'
          ? 'now'
          : formatDuration(conn.idle)
        : formatDistance(conn.last_activity);

      // Sorted subscriptions list.
      // The subscriptions order changes on each request.
      const subscriptionsList = conn.subscriptions_list?.slice().sort();

      // Subscriptions list details sorted by SID.
      // The subscriptions order changes on each request.
      const subscriptionsListDetails = conn.subscriptions_list_detail
        ?.slice()
        .sort((a, b) => Number(a.sid) - Number(b.sid)) // Sort by SID.
        .map((sub) => ({
          ...sub,
          msgs: abbreviateNum(sub.msgs),
        }));

      return {
        ...conn,
        info: {
          isOpen,
          isActive: lastActive <= activityWindow,
          uptime: formatDuration(conn.uptime),
          rtt: formatRTT(conn.rtt ?? ''),
          start: formatDistance(conn.start),
          stop: conn.stop ? formatDistance(conn.stop) : undefined,
          lastActive,
          lastActivity: lastActivity,
          pending: formatBytes(conn.pending_bytes),
          inMsgs: abbreviateNum(conn.in_msgs),
          outMsgs: abbreviateNum(conn.out_msgs),
          inBytes: formatBytes(conn.in_bytes),
          outBytes: formatBytes(conn.out_bytes),
          ...rates,
          subscriptionsList,
          subscriptionsListDetails,
        },
      };
    }) ?? [];

  return {
    ...current,
    connections,
  };
}

/** Formatted JetStream information. */
export interface FormattedJsz extends Partial<Jsz> {
  info: {
    memory: FormattedBytes;
    storage: FormattedBytes;
    messages: AbbreviatedNumber;
    reservedMemory: FormattedBytes;
    reservedStorage: FormattedBytes;
    bytes: FormattedBytes;
    api: {
      total: AbbreviatedNumber;
      errors: AbbreviatedNumber;
    };
    config: {
      maxMemory: FormattedBytes;
      maxStorage: FormattedBytes;
    };
  };
}

/** Format the JetStream data for display. */
export function formatJsz(jsz: PartialInfoResponse<'jsz'>): FormattedJsz {
  const { current } = jsz;
  return {
    ...current,
    info: {
      memory: formatBytes(current?.memory ?? 0),
      storage: formatBytes(current?.storage ?? 0),
      messages: abbreviateNum(current?.messages ?? 0),
      reservedMemory: formatBytes(current?.reserved_memory ?? 0),
      reservedStorage: formatBytes(current?.reserved_storage ?? 0),
      bytes: formatBytes(current?.bytes ?? 0),
      api: {
        total: abbreviateNum(current?.api.total ?? 0),
        errors: abbreviateNum(current?.api.errors ?? 0),
      },
      config: {
        maxMemory: formatBytes(current?.config?.max_memory ?? 0),
        maxStorage: formatBytes(current?.config?.max_storage ?? 0),
      },
    },
  };
}

/** Formatted stream details. */
export interface FormattedStreamDetail extends StreamDetail {
  info: StreamInfo;
}

/** Formatted stream information. */
interface StreamInfo {
  /** Regular messages stream. */
  isRegular: boolean;
  /** KV store stream. */
  isKVStore: boolean;
  /** Object store stream. */
  isObjectStore: boolean;
  /** MQTT stream. */
  isMQTT: boolean;
  /** Stream label. */
  label: string;
  /** Stream creation time. */
  created: string;
  /** Stream state. */
  state: {
    consumerCount: number;
    numSubjects: AbbreviatedNumber;
    messages: AbbreviatedNumber;
    data: FormattedBytes;
    numDeleted: AbbreviatedNumber;
    firstSeq: number;
    lastSeq: number;
    firstTS: string;
    lastTS: string;
  };
}

/** Format a stream details object. */
export function formatStream(stream: StreamDetail): FormattedStreamDetail {
  const isKVStore = stream.name.startsWith('KV_');
  const isObjectStore = stream.name.startsWith('OBJ_');
  const isMQTT = stream.name.startsWith('$MQTT_');
  const isRegular = !isKVStore && !isObjectStore && !isMQTT;
  let label = 'Stream';

  if (!isRegular) {
    if (isKVStore) {
      label = 'KV Store';
    } else if (isObjectStore) {
      label = 'Object Store';
    } else if (isMQTT) {
      if (stream.name.startsWith('$MQTT_msgs')) {
        label = 'MQTT Messages';
      } else if (stream.name.startsWith('$MQTT_rmsgs')) {
        label = 'MQTT Retained Messages';
      } else if (stream.name.startsWith('$MQTT_sess')) {
        label = 'MQTT Sessions';
      }
    }
  }

  return {
    ...stream,
    info: {
      isRegular,
      isKVStore,
      isObjectStore,
      isMQTT,
      label,
      created: formatDate(stream.created),
      state: {
        consumerCount: stream.state?.consumer_count ?? 0,
        numSubjects: abbreviateNum(stream.state?.num_subjects ?? 0),
        messages: abbreviateNum(stream.state?.messages ?? 0),
        data: formatBytes(stream.state?.bytes ?? 0),
        numDeleted: abbreviateNum(stream.state?.num_deleted ?? 0),
        firstSeq: stream.state?.first_seq ?? 0,
        lastSeq: stream.state?.last_seq ?? 0,
        firstTS: formatDate(stream.state?.first_ts ?? ''),
        lastTS: formatDate(stream.state?.last_ts ?? ''),
      },
    },
  };
}

/** Formatted stream config information. */
export interface FormattedStreamConfig extends StreamConfig {
  info: StreamConfigInfo;
}

interface StreamConfigInfo {
  retention: string;
  discard: string;
  storage: string;
  maxConsumers: string;
  maxMsgs: string;
  maxBytes: string;
  maxAge: string;
  maxMsgsPerSubject: string;
  maxMsgSize: string | undefined;
  duplicateWindow: string | undefined;
}

const retentionPolicies: Record<RetentionPolicy, string> = {
  limits: 'Limits',
  interest: 'Interest',
  workqueue: 'WorkQueue',
};

const discardPolicies: Record<DiscardPolicy, string> = {
  old: 'Old',
  new: 'New',
};

const storageTypes: Record<StorageType, string> = {
  file: 'File',
  memory: 'Memory',
  any: 'Any',
};

/** Format a stream config object. */
export function formatStreamConfig(
  config: StreamConfig
): FormattedStreamConfig {
  return {
    ...config,
    info: {
      retention: retentionPolicies[config.retention],
      discard: discardPolicies[config.discard],
      storage: storageTypes[config.storage],
      maxConsumers:
        config.max_consumers === -1
          ? 'Unlimited'
          : String(config.max_consumers),
      maxMsgs:
        config.max_msgs === -1
          ? 'Unlimited'
          : abbreviateNum(config.max_msgs).str,
      maxBytes:
        config.max_bytes === -1
          ? 'Unlimited'
          : formatBytes(config.max_bytes).str,
      maxAge:
        config.max_age === 0 ? 'Unlimited' : durationFromNs(config.max_age).str,
      maxMsgsPerSubject:
        config.max_msgs_per_subject === -1
          ? 'Unlimited'
          : abbreviateNum(config.max_msgs_per_subject).str,
      maxMsgSize:
        config.max_msg_size === -1
          ? 'Unlimited'
          : config.max_msg_size !== undefined
          ? formatBytes(config.max_msg_size).str
          : undefined,
      duplicateWindow: config.duplicate_window
        ? durationFromNs(config.duplicate_window).str
        : undefined,
    },
  };
}
