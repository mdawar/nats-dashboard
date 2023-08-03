import { jsonp } from '~/lib/jsonp';

export interface ServerStats {
  // Fetch response time in milliseconds.
  responseTime: number;
  // General server information.
  varz: any;
  // Previous request's data.
  lastVarz?: any;
}

// TODO: temporary
const cache = new Map<string, any>();

/** Fetch NATS server stats. */
export async function fetchStats(url: string): Promise<ServerStats> {
  const start = performance.now();
  const varz = await jsonp(`${url}/varz`);
  const end = performance.now();

  const stats = {
    responseTime: end - start,
    varz,
    lastVarz: cache.get(url) ?? {},
  };

  cache.set(url, varz);

  return stats;
}
