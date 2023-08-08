/** NATS server information type. */
export type InfoType =
  | 'varz' // General information.
  | 'connz' // Connection information.
  | 'routez' // Route information.
  | 'gatewayz' // Gateway information.
  | 'leafz' // Leaf node information.
  | 'subsz' // Subscription routing information.
  | 'accountz' // Account information.
  | 'accstatz' // Account statistics.
  | 'jsz' // JetStream information.
  | 'healthz'; // Server health.

/** NATS server information type options. */
export type InfoOptions = {
  varz: undefined; // No options.
  connz: ConnzOptions;
  routez: RoutezOptions;
  gatewayz: GatewayzOptions;
  leafz: LeafzOptions;
  subsz: SubszOptions;
  accountz: AccountzOptions;
  accstatz: AccstatzOptions;
  jsz: JszOptions;
  healthz: HealthzOptions;
};

/**
 * Type to be extended by the information endpoints options interfaces.
 *
 * Used for compatibility with `URLSearchParams`.
 */
type SearchParams = Record<string, any>;

/** Boolean argument that accepts 0 and 1 as values. */
type BoolWithNum = boolean | 0 | 1;

/** Boolean argument that also accepts a string value of 'detail'. */
type BoolWithDetail = BoolWithNum | 'detail';

/** Connection state. */
type ConnState = 'open' | 'closed' | 'any';

/** Connection information (connz) options. */
interface ConnzOptions extends SearchParams {
  /** Sorts the results (Default is connection ID). */
  sort?: ConnzSortOpt;
  /** Include username (Default is false). */
  auth?: BoolWithNum;
  /**
   * Include subscriptions (Default is false).
   *
   * When set to detail a list with more detailed subscription information will be returned.
   */
  subs?: BoolWithDetail;
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
type ConnzSortOpt =
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
  | 'rtt'; // By the round trip time

/** Route information (routez) options. */
interface RoutezOptions extends SearchParams {
  /**
   * Include subscriptions (Default is false).
   *
   * When set to detail a list with more detailed subscription information will be returned.
   */
  subs?: BoolWithDetail;
}

/** Gateway information (gatewayz) options. */
interface GatewayzOptions extends SearchParams {
  /** Include account information (Default is false). */
  accs?: BoolWithNum;
  /** Return only remote gateways with this name. */
  gw_name?: string;
  /** Limit the list of accounts to this account name. */
  acc_name?: string;
}

/** Leaf node information (leafz) options. */
interface LeafzOptions extends SearchParams {
  /** Include internal subscriptions (Default is false). */
  subs?: BoolWithNum;
}

/** Subscription routing information (subsz) options. */
interface SubszOptions extends SearchParams {
  /** Include subscriptions (Default is false). */
  subs?: BoolWithNum;
  /** Pagination offset (Default is 0). */
  offset?: number;
  /** Number of results to return (integer > 0) (Default is 1024). */
  limit?: number;
  /** Test whether a subsciption exists. */
  test?: string;
}

/** Account information (accountz) options. */
interface AccountzOptions extends SearchParams {
  /**
   * Include metrics for the specified account (Default is empty).
   *
   * When not set, a list of all accounts is included.
   */
  acc?: string;
}

/** Account statistics (accstatz) options. */
interface AccstatzOptions extends SearchParams {
  /** If true, include accounts that do not have any current connections (Default is false). */
  unused?: BoolWithNum;
}

/** JetStream information (jsz) options. */
interface JszOptions extends SearchParams {
  /** Include metrics for the specified account (Default is unset).*/
  acc?: string;
  /** Include account specific JetStream information (Default is false). */
  accounts?: BoolWithNum;
  /** Include streams. When set, implies accounts=true (Default is false). */
  streams?: BoolWithNum;
  /** Include consumer. When set, implies streams=true (Default is false). */
  consumers?: BoolWithNum;
  /** When stream or consumer are requested, include their respective configuration (Default is false). */
  config?: BoolWithNum;
  /** Only the leader responds (Default is false). */
  'leader-only'?: BoolWithNum;
  /** Pagination offset (Default is 0). */
  offset?: number;
  /** Number of results to return (Default is 1024). */
  limit?: number;
  /** Include raft groups information (Default is false). */
  raft?: BoolWithNum;
}

/** Health endpoint (healthz) options. */
interface HealthzOptions extends SearchParams {
  /** Returns an error if JetStream is disabled. */
  'js-enabled-only'?: BoolWithNum; // js-enabled is deprecated.
  /** Skip health check of accounts, streams, and consumers. */
  'js-server-only'?: BoolWithNum;
}
