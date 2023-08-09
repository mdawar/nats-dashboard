import type { SearchParams, BoolOrNumber } from './common';

/** Leaf node information (leafz) options. */
export interface LeafzOptions extends SearchParams {
  /** Include internal subscriptions (Default is false). */
  subs?: BoolOrNumber;
}

/** NATS server leaf node information. */
export interface Leafz {} // TODO
