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

/** Public stats for the sublist. */
export interface SublistStats {
  num_subscriptions: number;
  num_cache: number;
  num_inserts: number;
  num_removes: number;
  num_matches: number;
  cache_hit_rate: number;
  max_fanout: number;
  avg_fanout: number;
}

/** jwt.ClaimsData. */
export interface JWTClaimsData {
  /** Audience */
  aud?: string;
  /** Expires */
  exp?: number;
  /** ID */
  jti?: string;
  /** IssuedAt */
  iat?: number;
  /** Issuer */
  iss?: string;
  /** Name */
  name?: string;
  /** NotBefore */
  nbf?: number;
  /** Subject */
  sub?: string;
}

/** jwt.GenericFields. */
export interface JWTGenericFields {
  tags?: string[];
  type?: string;
  version?: number;
}

/** JetStream configuration for this server. */
export interface JetStreamConfig {
  max_memory: number;
  max_storage: number;
  store_dir?: string;
  domain?: string;
  compress_ok?: boolean;
}

/** Statistics about JetStream for this server. */
export interface JetStreamStats {
  memory: number;
  storage: number;
  reserved_memory: number;
  reserved_storage: number;
  accounts: number;
  ha_assets: number;
  api: JetStreamAPIStats;
}

interface JetStreamAPIStats {
  total: number;
  errors: number;
  inflight?: number;
}

/** Information about the meta group. */
export interface MetaClusterInfo {
  name?: string;
  leader?: string;
  peer?: string;
  replicas?: PeerInfo[];
  cluster_size: number;
}

/** Information about the underlying set of servers that make up the stream or consumer. */
export interface ClusterInfo {
  name?: string;
  leader?: string;
  replicas?: PeerInfo[];
}

/** Information about all the peers in the cluster that are supporting the stream or consumer. */
interface PeerInfo {
  name: string;
  current: boolean;
  offline?: boolean;
  /** time.Duration */
  active: number;
  lag?: number;
  peer: string;
  cluster: string;
}
