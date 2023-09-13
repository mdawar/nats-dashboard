import type {
  SearchParams,
  BoolOrNumber,
  JetStreamStats,
  JetStreamConfig,
  MetaClusterInfo,
  ClusterInfo,
} from './common';

/** JetStream information (jsz) options. */
export interface JszOptions extends SearchParams {
  /** Include metrics for the specified account (Default is unset).*/
  acc?: string;
  /** Include account specific JetStream information (Default is false). */
  accounts?: BoolOrNumber;
  /** Include streams. When set, implies accounts=true (Default is false). */
  streams?: BoolOrNumber;
  /** Include consumer. When set, implies streams=true (Default is false). */
  consumers?: BoolOrNumber;
  /** When stream or consumer are requested, include their respective configuration (Default is false). */
  config?: BoolOrNumber;
  /** Only the leader responds (Default is false). */
  'leader-only'?: BoolOrNumber;
  /** Pagination offset (Default is 0). */
  offset?: number;
  /** Number of results to return (Default is 1024). */
  limit?: number;
  /** Include raft groups information (Default is false). */
  raft?: BoolOrNumber;
}

/** NATS server JetStream detailed information. */
export interface Jsz extends JetStreamStats {
  server_id: string;
  /** time.Time */
  now: string;
  disabled?: boolean;
  config?: JetStreamConfig;
  streams: number;
  consumers: number;
  messages: number;
  bytes: number;
  meta_cluster?: MetaClusterInfo;
  /** Aggregate raft info. */
  account_details?: AccountDetail[];
}

export interface AccountDetail extends JetStreamStats {
  name: string;
  id: string;
  stream_detail?: StreamDetail[];
}

/** Information about the stream state and its consumers. */
export interface StreamDetail {
  name: string;
  /** time.Time */
  created: string;
  cluster?: ClusterInfo;
  config?: StreamConfig;
  state?: StreamState;
  consumer_detail?: ConsumerInfo[];
  mirror?: StreamSourceInfo;
  sources?: StreamSourceInfo[];
  stream_raft_group?: string;
  consumer_raft_groups?: RaftGroupDetail[];
}

export type RetentionPolicy = 'limits' | 'interest' | 'workqueue';

export type DiscardPolicy = 'old' | 'new';

export type StorageType = 'memory' | 'file' | 'any';

export type DeliverPolicy =
  | 'all'
  | 'last'
  | 'new'
  | 'by_start_sequence'
  | 'by_start_time'
  | 'last_per_subject'
  | 'undefined';

export type AckPolicy = 'none' | 'all' | 'explicit';

export type ReplayPolicy = 'instant' | 'original';

export interface StreamConfig {
  name: string;
  description?: string;
  subjects?: string[];
  retention: RetentionPolicy;
  max_consumers: number;
  max_msgs: number;
  max_bytes: number;
  /** time.Duration */
  max_age: number;
  max_msgs_per_subject: number;
  max_msg_size?: number;
  discard: DiscardPolicy;
  storage: StorageType;
  num_replicas: number;
  no_ack?: boolean;
  template_owner?: string;
  /** time.Duration */
  duplicate_window?: number;
  placement?: Placement;
  mirror?: StreamSource;
  sources?: StreamSource[];
  /** Allow republish of the message after being sequenced and stored. */
  republish?: RePublish;
  /** Allow higher performance, direct access to get individual messages. E.g. KeyValue. */
  allow_direct: boolean;
  /** Allow higher performance and unified direct access for mirrors as well. */
  mirror_direct: boolean;
  /** Allow KV like semantics to also discard new on a per subject basis. */
  discard_new_per_subject?: boolean;
  /** Sealed will seal a stream so no messages can get out or in. */
  sealed: boolean;
  /** DenyDelete will restrict the ability to delete messages. */
  deny_delete: boolean;
  /** DenyPurge will restrict the ability to purge messages. */
  deny_purge: boolean;
  /** AllowRollup allows messages to be placed into the system and purge all older messages using a special msg header. */
  allow_rollup_hdrs: boolean;
}

/** Used to guide placement of streams and meta controllers in clustered JetStream. */
interface Placement {
  cluster?: string;
  tags?: string[];
}

/** StreamSource dictates how streams can source from other streams. */
interface StreamSource {
  name: string;
  opt_start_seq?: number;
  /** time.Time */
  opt_start_time?: string;
  filter_subject?: string;
  external?: ExternalStream;
}

interface ExternalStream {
  api: string;
  deliver: string;
}

/** RePublish is for republishing messages once committed to a stream. */
interface RePublish {
  src?: string;
  dest: string;
  headers_only?: boolean;
}

/** StreamState is information about the given stream. */
interface StreamState {
  messages: number;
  bytes: number;
  first_seq: number;
  /** time.Time */
  first_ts: string;
  last_seq: number;
  /** time.Time */
  last_ts: string;
  num_subjects?: number;
  subjects?: Record<string, number>;
  num_deleted?: number;
  deleted?: number[];
  lost?: LostStreamData;
  consumer_count: number;
}

/** LostStreamData indicates msgs that have been lost. */
interface LostStreamData {
  msgs: number[];
  bytes: number;
}

export interface ConsumerInfo {
  stream_name: string;
  name: string;
  /** time.Time */
  created: string;
  config?: ConsumerConfig;
  delivered: SequenceInfo;
  ack_floor: SequenceInfo;
  num_ack_pending: number;
  num_redelivered: number;
  num_waiting: number;
  num_pending: number;
  cluster?: ClusterInfo;
  push_bound?: boolean;
}

interface ConsumerConfig {
  /** Durable is deprecated. All consumers should have names, picked by clients. */
  durable_name?: string;
  name?: string;
  description?: string;
  deliver_policy: DeliverPolicy;
  opt_start_seq?: number;
  /** time.Time */
  opt_start_time?: string;
  ack_policy: AckPolicy;
  /** time.Duration */
  ack_wait?: number;
  max_deliver?: number;
  /** []time.Duration */
  backoff?: number[];
  filter_subject?: string;
  replay_policy: ReplayPolicy;
  /** Bits per sec. */
  rate_limit_bps?: number;
  sample_freq?: string;
  max_waiting?: number;
  max_ack_pending?: number;
  /** time.Duration */
  idle_heartbeat?: number;
  flow_control?: boolean;
  headers_only?: boolean;

  /** Pull based option. */
  max_batch?: number;
  /** Pull based option (time.Duration). */
  max_expires?: number;
  /** Pull based option. */
  max_bytes?: number;

  /** Push based consumers. */
  deliver_subject?: string;
  /** Push based consumers. */
  deliver_group?: string;

  /** Ephemeral inactivity threshold (time.Duration). */
  inactive_threshold?: number;

  /** Generally inherited by parent stream and other markers, now can be configured directly. */
  num_replicas: number;
  /** Force memory storage. */
  mem_storage?: boolean;
  /** Don't add to general clients. */
  direct?: boolean;
}

/** SequenceInfo has both the consumer and the stream sequence and last activity. */
interface SequenceInfo {
  consumer_seq: number;
  stream_seq: number;
  /** time.Time */
  last_active?: string;
}

/** StreamSourceInfo shows information about an upstream stream source. */
interface StreamSourceInfo {
  name: string;
  external?: ExternalStream;
  lag: number;
  /** time.Duration */
  active: number;
  error?: ApiError;
}

/** ApiError is included in all responses if there was an error. */
interface ApiError {
  code: number;
  err_code?: number;
  description?: string;
}

/** RaftGroupDetail shows information details about the Raft group. */
interface RaftGroupDetail {
  name: string;
  raft_group?: string;
}
