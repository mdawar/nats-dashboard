import { jsonp } from '~/lib/jsonp';

export interface ServerStats {
  // Fetch response time in milliseconds.
  responseTime: number;
  // General server information.
  varz: any;
}

/** Fetch NATS server stats. */
export async function fetchStats(url: string): Promise<ServerStats> {
  const start = performance.now();
  const varz = await jsonp(`${url}/varz`);
  const end = performance.now();

  const responseTime = end - start;

  return {
    responseTime,
    varz,
  };
}
