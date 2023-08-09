import type { JWTClaimsData, JWTGenericFields } from './common';

/** NATS server general information. */
export interface Varz {
  server_id: string;
  server_name: string;
  version: string;
  proto: number;
  git_commit: string;
  go: string;
  host: string;
  port: number;
  auth_required: boolean;
  tls_required?: boolean;
  tls_verify?: boolean;
  ip?: string;
  connect_urls?: string[];
  ws_connect_urls?: string[];
  max_connections: number;
  max_subscriptions?: number;
  /** time.Duration */
  ping_interval: number;
  ping_max: number;
  http_host: string;
  http_port: number;
  http_base_path: string;
  https_port: number;
  auth_timeout: number;
  max_control_line: number;
  max_payload: number;
  max_pending: number;
  cluster?: ClusterOptsVarz;
  gateway?: GatewayOptsVarz;
  leaf?: LeafNodeOptsVarz;
  mqtt?: MQTTOptsVarz;
  websocket?: WebsocketOptsVarz;
  jetstream?: JetStreamVarz;
  tls_timeout: number;
  /** time.Duration */
  write_deadline: number;
  /** time.Time */
  start: string;
  /** time.Time */
  now: string;
  uptime: string;
  mem: number;
  cores: number;
  gomaxprocs: number;
  cpu: number;
  connections: number;
  total_connections: number;
  routes: number;
  remotes: number;
  leafnodes: number;
  in_msgs: number;
  out_msgs: number;
  in_bytes: number;
  out_bytes: number;
  slow_consumers: number;
  subscriptions: number;
  http_req_stats: Record<string, number>;
  /** time.Time */
  config_load_time: string;
  tags?: string[]; // jwt.TagList
  trusted_operators_jwt?: string[];
  trusted_operators_claim?: OperatorClaims[];
  system_account?: string;
  pinned_account_fails?: string;
}

/** Monitoring cluster information. */
interface ClusterOptsVarz {
  name?: string;
  addr?: string;
  cluster_port?: number;
  auth_timeout?: number;
  urls?: string[];
  tls_timeout?: number;
  tls_required?: boolean;
  tls_verify?: boolean;
}

/** Monitoring gateway information. */
interface GatewayOptsVarz {
  name?: string;
  host?: string;
  port?: number;
  auth_timeout?: number;
  tls_timeout?: number;
  tls_required?: boolean;
  tls_verify?: boolean;
  advertise?: string;
  connect_retries?: number;
  gateways?: RemoteGatewayOptsVarz[];
  reject_unknown?: boolean;
}

/** Monitoring remote gateway information. */
interface RemoteGatewayOptsVarz {
  name: string;
  tls_timeout?: number;
  urls?: string[];
}

/** Monitoring leaf node information. */
interface LeafNodeOptsVarz {
  host?: string;
  port?: number;
  auth_timeout?: number;
  tls_timeout?: number;
  tls_required?: boolean;
  tls_verify?: boolean;
  remotes?: RemoteLeafOptsVarz[];
}

/** Monitoring remote leaf node information. */
interface RemoteLeafOptsVarz {
  local_account?: string;
  tls_timeout?: number;
  urls?: string[];
  deny?: DenyRules;
}

/** Lists of subjects not allowed to be imported/exported. */
interface DenyRules {
  exports?: string[];
  imports?: string[];
}

/** Monitoring MQTT information. */
interface MQTTOptsVarz {
  host?: string;
  port?: number;
  no_auth_user?: string;
  auth_timeout?: number;
  tls_map?: boolean;
  tls_timeout?: number;
  tls_pinned_certs?: string[];
  js_domain?: string;
  /** time.Duration */
  ack_wait?: number;
  max_ack_pending?: number;
}

/** Monitoring websocket information. */
interface WebsocketOptsVarz {
  host?: string;
  port?: number;
  advertise?: string;
  no_auth_user?: string;
  jwt_cookie?: string;
  /** time.Duration */
  handshake_timeout?: number;
  auth_timeout?: number;
  no_tls?: boolean;
  tls_map?: boolean;
  tls_pinned_certs?: string[];
  same_origin?: boolean;
  allowed_origins?: string[];
  compression?: boolean;
}

/** Basic runtime information about jetstream. */
interface JetStreamVarz {
  config?: JetStreamConfig;
  stats?: JetStreamStats;
  meta?: MetaClusterInfo;
}

/** JetStream configuration for this server. */
interface JetStreamConfig {
  max_memory: number;
  max_storage: number;
  store_dir?: string;
  domain?: string;
  compress_ok?: boolean;
}

/** Statistics about JetStream for this server. */
interface JetStreamStats {
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
interface MetaClusterInfo {
  name?: string;
  leader?: string;
  peer?: string;
  replicas?: PeerInfo[];
  cluster_size: number;
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

/** The data for an operator JWT. */
interface OperatorClaims extends JWTClaimsData {
  nats?: Operator;
}

interface Operator extends JWTGenericFields {
  signing_keys?: string[];
  account_server_url?: string;
  operator_service_urls?: string[];
  system_account?: string;
  assert_server_version?: string;
  strict_signing_key_usage?: boolean;
}
