import type { SearchParams, SubsOption, SubDetail } from './common';

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
export interface Routez {
  server_id: string;
  server_name: string;
  /** time.Time */
  now: string;
  import?: SubjectPermission;
  export?: SubjectPermission;
  num_routes: number;
  routes: RouteInfo[];
}

/** Individual allow and deny object for publish and subscribe authorizations. */
interface SubjectPermission {
  allow: string[];
  deny: string[];
}

/** Detailed route information. */
interface RouteInfo {
  rid: number;
  remote_id: string;
  remote_name: string;
  did_solicit: boolean;
  is_configured: boolean;
  ip: string;
  port: number;
  /** time.Time */
  start: string;
  /** time.Time */
  last_activity: string;
  rtt?: string;
  uptime: string;
  idle: string;
  import?: SubjectPermission;
  export?: SubjectPermission;
  pending_size: number;
  in_msgs: number;
  out_msgs: number;
  in_bytes: number;
  out_bytes: number;
  subscriptions: number;
  subscriptions_list?: string[];
  subscriptions_list_detail?: SubDetail[];
}
