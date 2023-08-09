import type { SearchParams, BoolOrNumber, ConnInfo } from './common';

/** Gateway information (gatewayz) options. */
export interface GatewayzOptions extends SearchParams {
  /** Include account information (Default is false). */
  accs?: BoolOrNumber;
  /** Return only remote gateways with this name. */
  gw_name?: string;
  /** Limit the list of accounts to this account name. */
  acc_name?: string;
}

/** NATS server gateway information. */
export interface Gatewayz {
  server_id: string;
  /** time.Time */
  now: string;
  name?: string;
  host?: string;
  port?: number;
  outbound_gateways: Record<string, RemoteGatewayz>;
  inbound_gateways: Record<string, RemoteGatewayz[]>;
}

/** Information about an outbound connection to a gateway. */
interface RemoteGatewayz {
  configured: boolean;
  connection?: ConnInfo;
  accounts?: AccountGatewayz[];
}

/** Interest mode for this account. */
interface AccountGatewayz {
  name: string;
  interest_mode: string;
  no_interest_count?: number;
  interest_only_threshold?: number;
  num_subs?: number;
  num_queue_subs?: number;
}
