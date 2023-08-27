import {
  differenceInMilliseconds,
  differenceInSeconds,
  formatDistanceToNowStrict,
} from 'date-fns';

export interface FormattedBytes {
  /** Original number of bytes. */
  bytes: number;
  /** Formatted number of bytes. */
  value: string;
  /** Unit of the formatted number of bytes. */
  unit: string;
  /** String representation of the formatted bytes. */
  str: string;
}

/** Format bytes to a human readable number with a unit. */
export function formatBytes(bytes: number): FormattedBytes {
  const units = 'KMGTPE';
  const factor = 1024;

  if (bytes < factor) {
    const value = bytes.toFixed(2).replace(/\.0+$/, '');
    const unit = 'B';
    const str = `${value} ${unit}`;

    return { bytes, value, unit, str };
  }

  let div = factor;
  let exp = 0;

  while (bytes / div >= factor) {
    div *= factor;
    exp++;
  }

  const value = (bytes / div).toFixed(2).replace(/\.0+$/, '');
  const unit = `${units[exp]}iB`;
  const str = [value, unit].join(' ');

  return { bytes, value, unit, str };
}

export interface AbbreviatedNumber {
  /** Original number. */
  num: number;
  /** Abbreviated number. */
  value: string;
  /** Unit of the abbreviated number. */
  unit: string | undefined;
  /** String representation of the abbreviated number. */
  str: string;
}

/**
 * Abbreviate a large number.
 *
 * The `unit` will be an empty string for non abbreviated numbers.
 */
export function abbreviateNum(num: number): AbbreviatedNumber {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixNum = 0;

  while (num >= 1000) {
    num /= 1000;
    suffixNum++;
  }

  const value = num.toFixed(2).replace(/\.0+$/, '');
  const unit = suffixes[suffixNum];
  const str = [value, unit].join(' ');

  return { num, value, unit, str };
}

/**
 * Format a duration string.
 *
 * For example `1d12h30m12s` becomes `1d 12h 30m 12s`.
 * Fractions are also supported, `10m1.2s` becomes `10m 1.2s`.
 */
export function formatDuration(duration: string): string {
  const parts = duration.match(/[\d.]+(\D+)?/g);
  return parts ? parts.join(' ') : '';
}

/**
 * Round a duration string.
 *
 * For example `7.075186ms` becomes `7.08ms`.
 */
export function roundDuration(duration: string) {
  if (!duration.includes('.')) return duration;

  let value = parseFloat(duration).toFixed(2);

  if (value.endsWith('.00')) {
    value = value.slice(0, -3);
  }

  const match = duration.match(/[^\d.]+/g);

  if (!match) {
    return value;
  }

  return `${value}${match[0]}`;
}

/**
 * Format RTT duration.
 *
 * Adds spaces for multi units duration and rounds their numbers.
 * For example `1s2.12345ms` becomes `1s 2.12ms`.
 */
export function formatRTT(rtt: string): string {
  const formatted = [];
  const parts = formatDuration(rtt).split(' ');

  for (const p of parts) {
    formatted.push(roundDuration(p));
  }

  return formatted.join(' ');
}

/** Get the time difference in milliseconds between a start and an end date-time strings. */
export function msTimeDiff(start: string, end: string): number {
  return new Date(end).getTime() - new Date(start).getTime();
}

/** Add query parameters to a URL object (Preserves the existing query params). */
export function addQueryParams(url: URL, params: Record<string, string>): URL {
  const newParams = new URLSearchParams([
    ...Array.from(url.searchParams.entries()),
    ...Object.entries(params),
  ]).toString();

  return new URL(`${url.origin}${url.pathname}?${newParams}`);
}

/** Return the difference in seconds from the date until now. */
export function diffInSecondsToNow(date: string): number {
  return differenceInSeconds(new Date(), new Date(date), {
    roundingMethod: 'round',
  });
}

/** Rates of in/out messages and bytes per second. */
interface Rates {
  /** Time delta in milliseconds. */
  timeDelta: number;
  /** In messages rate per second. */
  inMsgsRate: AbbreviatedNumber;
  /** Out messages rate per second. */
  outMsgsRate: AbbreviatedNumber;
  /** In data rate per second. */
  inBytesRate: FormattedBytes;
  /** Out data rate per second. */
  outBytesRate: FormattedBytes;
}

/** Numbers of in/out messages and bytes to use for the rate calculations. */
interface MessagesData {
  in_msgs: number | undefined;
  out_msgs: number | undefined;
  in_bytes: number | undefined;
  out_bytes: number | undefined;
}

interface CalculateRatesParams {
  /** Start timestamp. */
  start: string | undefined;
  /** End timestamp. */
  end: string | undefined;
  /** Current in/out messages and bytes data. */
  current: MessagesData | undefined;
  /** Previous in/out messages and bytes data. */
  previous: MessagesData | undefined;
}

/** Calculate the rate of messages and bytes per second between 2 timestamps. */
export function calculateRates({
  start,
  end,
  current,
  previous,
}: CalculateRatesParams): Rates {
  // If any of the params is undefined, return zero values.
  if (!end || !start || !current || !previous) {
    const zeroMsgRate = abbreviateNum(0);
    const zeroDataRate = formatBytes(0);

    return {
      timeDelta: 0,
      inMsgsRate: zeroMsgRate,
      outMsgsRate: zeroMsgRate,
      inBytesRate: zeroDataRate,
      outBytesRate: zeroDataRate,
    };
  }

  // Time delta between the current and previous request in milliseconds.
  const timeDelta = msTimeDiff(start, end);
  // Time delta in seconds.
  const timeDeltaSec = timeDelta / 1000;

  const inMsgsDelta = (current?.in_msgs ?? 0) - (previous?.in_msgs ?? 0);

  const inMsgsRate = abbreviateNum(
    timeDeltaSec > 0 ? Math.max(inMsgsDelta, 0) / timeDeltaSec : 0
  );

  const outMsgsDelta = (current?.out_msgs ?? 0) - (previous?.out_msgs ?? 0);

  const outMsgsRate = abbreviateNum(
    timeDeltaSec > 0 ? Math.max(outMsgsDelta, 0) / timeDeltaSec : 0
  );

  const inBytesDelta = (current?.in_bytes ?? 0) - (previous?.in_bytes ?? 0);

  const inBytesRate = formatBytes(
    timeDeltaSec > 0 ? Math.max(inBytesDelta, 0) / timeDeltaSec : 0
  );

  const outBytesDelta = (current?.out_bytes ?? 0) - (previous?.out_bytes ?? 0);

  const outBytesRate = formatBytes(
    timeDeltaSec > 0 ? Math.max(outBytesDelta, 0) / timeDeltaSec : 0
  );

  return {
    timeDelta,
    inMsgsRate,
    outMsgsRate,
    inBytesRate,
    outBytesRate,
  };
}

/** Create a formatted distance string from a date-time string. */
export function formatDistance(datetime: string): string {
  const date = new Date(datetime);

  // For < 1s display "now" instead of "0 seconds ago".
  if (differenceInMilliseconds(new Date(), date) < 1000) {
    return 'now';
  }

  return formatDistanceToNowStrict(date, {
    addSuffix: true,
  });
}
