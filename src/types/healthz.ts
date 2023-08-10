import type { SearchParams, BoolOrNumber } from './common';

/** Health endpoint (healthz) options. */
export interface HealthzOptions extends SearchParams {
  /** Returns an error if JetStream is disabled. */
  'js-enabled-only'?: BoolOrNumber; // js-enabled is deprecated.
  /** Skip health check of accounts, streams, and consumers. */
  'js-server-only'?: BoolOrNumber;
}

/** NATS server health. */
export type Healthz = StatusOK | StatusError | StatusUnavailable;

interface StatusOK {
  status: 'ok';
}

interface StatusError {
  status: 'error';
  error: string;
}

interface StatusUnavailable {
  status: 'unavailable';
  error: string;
}
