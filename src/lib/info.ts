import type {
  Endpoint,
  EndpointOptions,
  EndpointResponse,
  MonitoringResponse,
} from '~/types';
import { jsonp } from '~/lib/jsonp';

/** NATS server information response. */
export interface InfoResponse<T extends Endpoint> {
  /** Fetch request round trip time in milliseconds. */
  rtt: number;
  /** API Response. */
  current: EndpointResponse[T];
  /** Previous API response. */
  previous: EndpointResponse[T] | undefined;
}

export type PartialInfoResponse<T extends Endpoint> = Partial<InfoResponse<T>>;

// TODO: temporary
const cache = new Map<string, MonitoringResponse>();

/** Fetch monitoring information for a NATS server by type. */
export async function fetchInfo<T extends Endpoint>(
  baseURL: string,
  endpoint: T,
  args?: EndpointOptions[T]
): Promise<PartialInfoResponse<T>> {
  const url = new URL(endpoint, baseURL);

  if (args) {
    const params = new URLSearchParams(args);
    url.search = params.toString();
  }

  const start = performance.now();
  const current = await jsonp<EndpointResponse[T]>(url.href);
  const end = performance.now();

  const response = {
    rtt: end - start,
    current,
    previous: cache.get(url.href) as EndpointResponse[T],
  };

  cache.set(url.href, current);

  return response;
}
