import type {
  SearchParams,
  BoolOrNumber,
  SubsOption,
  ConnState,
  SubDetail,
} from './common';

/** Connection information (connz) options. */
export interface ConnzOptions extends SearchParams {
  /** Sorts the results (Default is connection ID). */
  sort?: ConnzSortOpt;
  /** Include username (Default is false). */
  auth?: BoolOrNumber;
  /**
   * Include subscriptions (Default is false).
   *
   * When set to detail a list with more detailed subscription information will be returned.
   */
  subs?: SubsOption;
  /** Pagination offset (integer > 0) (Default is 0). */
  offset?: number;
  /** Number of results to return (integer > 0) (Default is 1024). */
  limit?: number;
  /** Return a connection by it's ID. */
  cid?: number;
  /**
   * Return connections of particular state (Default is open).
   *
   * The server will default to holding the last 10,000 closed connections.
   */
  state?: ConnState;
  /** Filter the connection with this MQTT client ID. */
  mqtt_client?: string;
}

/** Connection information (connz) sorting options. */
export type ConnzSortOpt =
  | 'cid' // Connection ID
  | 'start' // Connection start time, same as CID
  | 'subs' // Number of subscriptions
  | 'pending' // Amount of data in bytes waiting to be sent to client
  | 'msgs_to' // Number of messages sent
  | 'msgs_from' // Number of messages received
  | 'bytes_to' // Number of bytes sent
  | 'bytes_from' // Number of bytes received
  | 'last' // Last activity
  | 'idle' // Amount of inactivity
  | 'uptime' // Lifetime of the connection
  | 'stop' // Stop time for a closed connection
  | 'reason' // Reason for a closed connection
  | 'rtt'; // Round trip time

/**
 * NATS server connections information.
 *
 * Provides detailed information on current client connections.
 */
export interface Connz {
  server_id: string;
  /** time.Time */
  now: string;
  num_connections: number;
  total: number;
  offset: number;
  limit: number;
  connections: ConnInfo[];
}

/** Detailed connection information. */
interface ConnInfo {
  cid: number;
  kind?: string;
  type?: string;
  ip: string;
  port: number;
  /** time.Time */
  start: string;
  /** time.Time */
  last_activity: string;
  /** time.Time */
  stop?: string;
  reason?: string;
  rtt?: string;
  uptime: string;
  idle: string;
  pending_bytes: number;
  in_msgs: number;
  out_msgs: number;
  in_bytes: number;
  out_bytes: number;
  subscriptions: number;
  name?: string;
  lang?: string;
  version?: string;
  tls_version?: string;
  tls_cipher_suite?: string;
  tls_peer_certs?: TLSPeerCert[];
  authorized_user?: string;
  account?: string;
  subscriptions_list?: string[];
  subscriptions_list_detail?: SubDetail[];
  jwt?: string;
  issuer_key?: string;
  name_tag?: string;
  tags?: string[]; // jwt.TagList
  /** MQTT client ID. */
  mqtt_client?: string;
}

/** Basic information about a TLS peer certificate. */
interface TLSPeerCert {
  subject?: string;
  spki_sha256?: string;
  cert_sha256?: string;
}
