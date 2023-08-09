import type { SearchParams, BoolOrNumber, SubDetail } from './common';

/** Subscription routing information (subsz) options. */
export interface SubszOptions extends SearchParams {
  /** Include subscriptions (Default is false). */
  subs?: BoolOrNumber;
  /** Pagination offset (Default is 0). */
  offset?: number;
  /** Number of results to return (integer > 0) (Default is 1024). */
  limit?: number;
  /** Test whether a subsciption exists. */
  test?: string;
}

/** NATS server subscription routing information. */
export interface Subsz extends SublistStats {
  server_id: string;
  /** time.Time */
  now: string;
  total: number;
  offset: number;
  limit: number;
  subscriptions_list?: SubDetail[];
}

/** Public stats for the sublist. */
interface SublistStats {
  num_subscriptions: number;
  num_cache: number;
  num_inserts: number;
  num_removes: number;
  num_matches: number;
  cache_hit_rate: number;
  max_fanout: number;
  avg_fanout: number;
}
