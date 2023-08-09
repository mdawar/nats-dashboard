/**
 * Type to be extended by the information endpoint options interfaces.
 *
 * Used for compatibility with `URLSearchParams`.
 */
export type SearchParams = Record<string, any>;

/** Boolean argument that accepts 0 and 1 as values. */
export type BoolOrNumber = boolean | 0 | 1;

/** Subscriptions options (Boolean that also accepts a string value of 'detail'). */
export type SubsOption = BoolOrNumber | 'detail';

/** Connection state. */
export type ConnState = 'open' | 'closed' | 'any';

/** Verbose subscription information. */
export interface SubDetail {
  account?: string;
  subject: string;
  qgroup?: string;
  sid: string;
  msgs: number;
  max?: number;
  cid: number;
}

/** Detailed connection information. */
export interface ConnInfo {
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
