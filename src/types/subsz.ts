import type { SearchParams, BoolOrNumber } from './common';

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
export interface Subsz {} // TODO
