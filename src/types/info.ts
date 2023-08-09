import type { Varz } from './varz';
import type { Connz, ConnzOptions } from './connz';
import type { Routez, RoutezOptions } from './routez';
import type { Gatewayz, GatewayzOptions } from './gatewayz';
import type { Leafz, LeafzOptions } from './leafz';
import type { Subsz, SubszOptions } from './subsz';
import type { Accountz, AccountzOptions } from './accountz';
import type { Accstatz, AccstatzOptions } from './accstatz';
import type { Jsz, JszOptions } from './jsz';
import type { Healthz, HealthzOptions } from './healthz';

/** NATS server monitoring endpoint. */
export type Endpoint =
  | 'varz' // General information.
  | 'connz' // Connection information.
  | 'routez' // Route information.
  | 'gatewayz' // Gateway information.
  | 'leafz' // Leaf node information.
  | 'subsz' // Subscription routing information.
  | 'accountz' // Account information.
  | 'accstatz' // Account statistics.
  | 'jsz' // JetStream information.
  | 'healthz'; // Server health.

/** NATS server monitoring endpoint options. */
export type EndpointOptions = {
  varz: undefined; // No options.
  connz: ConnzOptions;
  routez: RoutezOptions;
  gatewayz: GatewayzOptions;
  leafz: LeafzOptions;
  subsz: SubszOptions;
  accountz: AccountzOptions;
  accstatz: AccstatzOptions;
  jsz: JszOptions;
  healthz: HealthzOptions;
};

/** NATS server monitoring responses by endpoint. */
export type EndpointResponse = {
  varz: Varz;
  connz: Connz;
  routez: Routez;
  gatewayz: Gatewayz;
  leafz: Leafz;
  subsz: Subsz;
  accountz: Accountz;
  accstatz: Accstatz;
  jsz: Jsz;
  healthz: Healthz;
};

/** Union of all the monitoring endpoint responses. */
export type MonitoringResponse = EndpointResponse[Endpoint];
