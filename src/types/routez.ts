import type { SearchParams, SubsOption } from './common';

/** Route information (routez) options. */
export interface RoutezOptions extends SearchParams {
  /**
   * Include subscriptions (Default is false).
   *
   * When set to detail a list with more detailed subscription information will be returned.
   */
  subs?: SubsOption;
}

/** NATS server route information. */
export interface Routez {} // TODO
