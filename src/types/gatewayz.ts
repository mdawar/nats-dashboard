import type { SearchParams, BoolOrNumber } from './common';

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
export interface Gatewayz {} // TODO
