import type { SearchParams, BoolOrNumber } from './common';

/** Account statistics (accstatz) options. */
export interface AccstatzOptions extends SearchParams {
  /** If true, include accounts that do not have any current connections (Default is false). */
  unused?: BoolOrNumber;
}

/** NATS server account statistics. */
export interface Accstatz {} // TODO
