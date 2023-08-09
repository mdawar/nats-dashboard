import type { SearchParams, BoolOrNumber } from './common';

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

/** NATS server JetStream information. */
export interface Jsz {} // TODO
