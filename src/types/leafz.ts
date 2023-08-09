import type { SearchParams, BoolOrNumber } from './common';

/** Leaf node information (leafz) options. */
export interface LeafzOptions extends SearchParams {
  /** Include internal subscriptions (Default is false). */
  subs?: BoolOrNumber;
}

/** NATS server leaf node detailed information. */
export interface Leafz {
  server_id: string;
  /** time.Time */
  now: string;
  leafnodes: number;
  leafs: LeafInfo[];
}

/** Detailed remote leaf node connection information. */
interface LeafInfo {
  name: string;
  is_spoke: boolean;
  account: string;
  ip: string;
  port: number;
  rtt?: string;
  in_msgs: number;
  out_msgs: number;
  in_bytes: number;
  out_bytes: number;
  subscriptions: number;
  subscriptions_list?: string[];
}
