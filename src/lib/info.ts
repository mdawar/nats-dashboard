import type {
  Endpoint,
  EndpointOptions,
  EndpointResponse,
  MonitoringResponse,
} from '~/types';
import { jsonp } from '~/lib/jsonp';

/** NATS server information response. */
interface InfoResponse<T extends Endpoint> {
  /** Fetch request round trip time in milliseconds. */
  rtt: number;
  /** API Response. */
  data: EndpointResponse[T];
  /** Previous API response. */
  previous: EndpointResponse[T] | undefined;
}

// TODO: temporary
const cache = new Map<string, MonitoringResponse>();

/** Fetch monitoring information for a NATS server by type. */
export async function fetchInfo<T extends Endpoint>(
  baseURL: string,
  endpoint: T,
  args?: EndpointOptions[T]
): Promise<InfoResponse<T>> {
  const url = new URL(endpoint, baseURL);

  if (args) {
    const params = new URLSearchParams(args);
    url.search = params.toString();
  }

  const start = performance.now();
  const data = await jsonp<EndpointResponse[T]>(url.href);
  const end = performance.now();

  const response = {
    rtt: end - start,
    data,
    previous: cache.get(url.href) as EndpointResponse[T],
  };

  cache.set(url.href, data);

  return response;
}
