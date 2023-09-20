import type { SearchParams, BoolOrNumber } from './common';

/** Account statistics (accstatz) options. */
export interface AccountStatzOptions extends SearchParams {
  /** If true, include accounts that do not have any current connections (Default is false). */
  unused?: BoolOrNumber;
}

/** NATS server account statistics. */
export interface AccountStatz {
  server_id: string;
  /** time.Time */
  now: string;
  account_statz: AccountStat[];
}

/** Data common between AccountNumConns and AccountStatz. */
interface AccountStat {
  acc: string;
  conns: number;
  leafnodes: number;
  total_conns: number;
  num_subscriptions: number;
  sent: DataStats;
  received: DataStats;
  slow_consumers: number;
}

/**
 * DataStats reports how many msgs and bytes.
 * Applicable for both sent and received.
 */
interface DataStats {
  msgs: number;
  bytes: number;
}
