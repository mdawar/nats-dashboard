export interface FormattedBytes {
  str: string;
  unit: string;
}

/** Format bytes to a human readable number with a unit. */
export function formatBytes(bytes: number): FormattedBytes {
  const units = 'KMGTPE';
  const factor = 1024;

  if (bytes < factor) {
    return {
      str: bytes.toFixed(2).replace(/\.0+$/, ''),
      unit: 'B',
    };
  }

  let div = factor;
  let exp = 0;

  while (bytes / div >= factor) {
    div *= factor;
    exp++;
  }

  return {
    str: (bytes / div).toFixed(2).replace(/\.0+$/, ''),
    unit: `${units[exp]}iB`,
  };
}

export interface AbbreviatedNumber {
  str: string;
  unit: string | undefined;
}

/** Abbreviate a large number.
 *
 * Non abbreviated numbers will have the unit as an empty string.
 */
export function abbreviateNum(n: number): AbbreviatedNumber {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixNum = 0;

  while (n >= 1000) {
    n /= 1000;
    suffixNum++;
  }

  return {
    str: n.toFixed(2).replace(/\.0+$/, ''),
    unit: suffixes[suffixNum],
  };
}

/** Format the server uptime string (adds spaces after the letters). */
export function formatUptime(uptime: string): string {
  const parts = uptime.match(/\d+\D+/g);
  return parts ? parts.join(' ') : '';
}

/** Get the time difference in milliseconds from 2 ISO 8601 date-time strings. */
export function msTimeDiff(d1: string, d2: string): number {
  return new Date(d1).getTime() - new Date(d2).getTime();
}

/** Add query parameters to a URL object (Preserves the existing query params). */
export function addQueryParams(url: URL, params: Record<string, string>): URL {
  const newParams = new URLSearchParams([
    ...Array.from(url.searchParams.entries()),
    ...Object.entries(params),
  ]).toString();

  return new URL(`${url.origin}${url.pathname}?${newParams}`);
}
