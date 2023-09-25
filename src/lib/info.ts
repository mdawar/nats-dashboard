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

interface FetchInfoOptions<T extends Endpoint> {
  /** NATS monitoring server URL. */
  url: string;
  /** Endpoint to fetch. */
  endpoint: T;
  /** Endpoint arguments. */
  args?: EndpointOptions[T] | undefined;
  /** Use JSONP requests to fetch the data. */
  jsonp?: boolean;
  /** Abort signal. */
  signal?: AbortSignal;
}

/** Fetch monitoring information for a NATS server by type. */
export async function fetchInfo<T extends Endpoint>({
  url: baseURL,
  endpoint,
  args,
  jsonp = false,
  signal,
}: FetchInfoOptions<T>): Promise<PartialInfoResponse<T>> {
  const url = new URL(endpoint, baseURL);

  if (args) {
    const params = new URLSearchParams(args);
    url.search = params.toString();
  }

  const start = performance.now();
  const current = await fetchData<EndpointResponse[T]>(url.href, {
    jsonp,
    signal,
  });
  const end = performance.now();

  const response = {
    rtt: end - start,
    current,
    previous: cache.get(url.href) as EndpointResponse[T],
  };

  cache.set(url.href, current);

  return response;
}

interface FetchDataOptions {
  jsonp?: boolean;
  signal?: AbortSignal | undefined | null;
}

/** Fetch the server data using either JSONP requests or the Fetch API. */
async function fetchData<T>(
  url: string,
  { jsonp: useJSONP = false, signal = null }: FetchDataOptions
): Promise<T> {
  // Required for NATS servers prior to v2.9.22.
  if (useJSONP) {
    return jsonp(url, { signal });
  }

  const response = await fetch(url, { signal });
  return response.json();
}
