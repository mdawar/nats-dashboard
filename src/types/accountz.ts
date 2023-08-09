import type {
  SearchParams,
  SublistStats,
  JWTClaimsData,
  JWTGenericFields,
} from './common';

/** Account information (accountz) options. */
export interface AccountzOptions extends SearchParams {
  /**
   * Include metrics for the specified account (Default is empty).
   *
   * When not set, a list of all accounts is included.
   */
  acc?: string;
}

/** NATS server account information. */
export interface Accountz {
  server_id: string;
  /** time.Time */
  now: string;
  system_account?: string;
  accounts?: string[];
  account_detail?: AccountInfo;
}

interface AccountInfo {
  account_name: string;
  /** time.Time */
  update_time?: string;
  is_system?: boolean;
  expired: boolean;
  complete: boolean;
  jetstream_enabled: boolean;
  leafnode_connections: number;
  client_connections: number;
  subscriptions: number;
  mappings?: ExtMap;
  exports?: ExtExport[];
  imports?: ExtExport[];
  jwt?: string;
  issuer_key?: string;
  name_tag?: string;
  tags?: string[]; // jwt.TagList
  decoded_jwt?: JWTAccountClaims;
  validation_result_jwt?: ExtVrIssues[];
  /** map[string]time.Time */
  revoked_user?: Record<string, string>;
  sublist_stats?: SublistStats;
  responses?: Record<string, ExtImport>;
}

type ExtMap = Record<string, MapDest[]>;

/** MapDest is for mapping published subjects for clients. */
interface MapDest {
  subject: string;
  weight: number;
  cluster?: string;
}

interface ExtExport extends JWTExport {
  approved_accounts?: string;
  /** map[string]time.Time */
  revoked_activations?: Record<string, string>;
}

/**
 * jwt.Export.
 *
 * Represents a single export.
 */
interface JWTExport extends JWTInfo {
  name?: string;
  subject?: string;
  type?: number;
  token_req?: boolean;
  revocations?: Record<string, number>;
  response_type?: string;
  /** time.Duration */
  response_threshold?: number;
  service_latency?: JWTServiceLatency;
  account_token_position?: number;
  advertise?: boolean;
}

/** jwt.Info. */
interface JWTInfo {
  description?: string;
  info_url?: string;
}

/** jwt.ServiceLatency */
interface JWTServiceLatency {
  sampling: number;
  results: string;
}

/**
 * jwt.AccountClaims.
 *
 * Defines the body of an account JWT.
 */
interface JWTAccountClaims extends JWTClaimsData {
  nats?: JWTAccount;
}

/** jwt.Account. */
interface JWTAccount extends JWTInfo, JWTGenericFields {
  imports?: JWTImport[];
  exports?: JWTExport[];
  limits?: JWTOperatorLimits;
  /** jwt.SigningKeys. */
  signing_keys?: Record<string, string>;
  /** jwt.RevocationList. */
  revocations?: Record<string, number>;
  default_permissions?: JWTPermissions;
  mappings?: JWTMapping;
  authorization?: JWTExternalAuthorization;
}

/** jwt.Import. */
interface JWTImport {
  name?: string;
  subject?: string;
  account?: string;
  token?: string;
  /** Deprecated: use local_subject instead. */
  to?: string;
  local_subject?: string;
  type?: number;
  share?: boolean;
}

/**
 * jwt.JWTOperatorLimits.
 *
 * Used to limit access by an account.
 */
interface JWTOperatorLimits
  extends JWTNatsLimits,
    JWTAccountLimits,
    JWTJetStreamLimits {
  tiered_limits?: JWTJetStreamTieredLimits;
}

/** jwt.JetStreamTieredLimits. */
type JWTJetStreamTieredLimits = Record<string, JWTJetStreamLimits>;

/** jwt.JetStreamLimits. */
interface JWTJetStreamLimits {
  /** Max number of bytes stored in memory across all streams. (0 means disabled). */
  mem_storage?: number;
  /** Max number of bytes stored on disk across all streams. (0 means disabled). */
  disk_storage?: number;
  /** Max number of streams. */
  streams?: number;
  /** Max number of consumers. */
  consumer?: number;
  /** Max ack pending of a stream. */
  max_ack_pending?: number;
  /** Max bytes a memory backed stream can have. (0 means disabled/unlimited). */
  mem_max_stream_bytes?: number;
  /** Max bytes a disk backed stream can have. (0 means disabled/unlimited). */
  disk_max_stream_bytes?: number;
  /** Max bytes required by all streams. */
  max_bytes_required?: boolean;
}

/** jwt.NatsLimits. */
interface JWTNatsLimits {
  /** Max number of subscriptions. */
  subs?: number;
  /** Max number of bytes. */
  data?: number;
  /** Max message payload. */
  payload?: number;
}

/** jwt.AccountLimits. */
interface JWTAccountLimits {
  /** Max number of imports. */
  imports?: number;
  /** Max number of exports. */
  exports?: number;
  /** Are wildcards allowed in exports. */
  wildcards?: boolean;
  /** User JWT can't be bearer token. */
  disallow_bearer?: boolean;
  /** Max number of active connections. */
  conn?: number;
  /** Max number of active leaf node connections. */
  leaf?: number;
}

/** Permissions are used to restrict subject access, either on a user or for everyone on a server by default. */
interface JWTPermissions {
  pub?: JWTPermission;
  sub?: JWTPermission;
  resp?: JWTResponsePermission;
}

/**
 * jwt.Permission.
 *
 * Defines allow/deny subjects.
 */
interface JWTPermission {
  allow?: string[];
  deny?: string[];
}

/**
 * jwt.ResponsePermission.
 *
 * can be used to allow responses to any reply subject that is received on a valid subscription.
 */
interface JWTResponsePermission {
  max: number;
  /** time.Duration */
  ttl: number;
}

/** jwt.Mapping. */
type JWTMapping = Record<string, JWTWeightedMapping[]>;

/**
 * jwt.WeightedMapping.
 *
 * Mapping for publishes
 */
interface JWTWeightedMapping {
  subject: string;
  weight?: number;
  cluster?: string;
}

/**
 * jwt.ExternalAuthorization.
 *
 * Enable external authorization for account users.
 */
interface JWTExternalAuthorization {
  auth_users: string[];
  allowed_accounts?: string[];
  xkey?: string;
}

interface ExtVrIssues {
  description: string;
  blocking: boolean;
  time_check: boolean;
}

interface ExtImport extends JWTImport {
  invalid: boolean;
  share: boolean;
  tracking: boolean;
  tracking_header?: Record<string, string[]>;
  latency?: JWTServiceLatency;
  m1?: ServiceLatency;
}

interface ServiceLatency extends TypedEvent {
  status: number;
  description?: string;
  requestor?: ClientInfo;
  responder?: ClientInfo;
  /** Only contains header(s) triggering the measurement. */
  header?: Record<string, string[]>;
  /** time.Time */
  start: string;
  /** time.Duration */
  service: number;
  /** time.Duration */
  system: number;
  /** time.Duration */
  total: number;
}

/**
 * TypedEvent is a event or advisory sent by the server that has nats type hints
 * typically used for events that might be consumed by 3rd party event systems.
 */
interface TypedEvent {
  type: string;
  id: string;
  /** time.Time */
  timestamp: string;
}

/** Detailed information about the client forming a connection. */
interface ClientInfo {
  /** time.Time */
  start?: string;
  host?: string;
  id?: number;
  acc: string;
  svc?: string;
  user?: string;
  name?: string;
  lang?: string;
  ver?: string;
  /** time.Duration */
  rtt?: number;
  server?: string;
  cluster?: string;
  alts?: string[];
  /** time.Time */
  stop?: string;
  jwt?: string;
  issuer_key?: string;
  name_tag?: string;
  tags?: string[]; // jwt.TagList
  kind?: string;
  client_type?: string;
  /** MQTT client ID. */
  client_id?: string;
}
