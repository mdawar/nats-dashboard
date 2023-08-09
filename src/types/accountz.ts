import type { SearchParams } from './common';

/** Account information (accountz) options. */
export interface AccountzOptions extends SearchParams {
  /**
   * Include metrics for the specified account (Default is empty).
   *
   * When not set, a list of all accounts is included.
   */
  acc?: string;
}

/** NATS server account information. */
export interface Accountz {} // TODO
