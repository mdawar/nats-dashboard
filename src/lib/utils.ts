import {
  formatDistanceToNowStrict,
  differenceInSeconds,
  differenceInMilliseconds,
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

/** Abbreviate a large number.
 *
 * Non abbreviated numbers will have the unit as an empty string.
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

/** Format a last activity date to a human readable string. */
export function formatLastActivity(lastActivity: string) {
  const activity = new Date(lastActivity);

  // For < 1s display "now" instead of "0 seconds ago".
  if (differenceInMilliseconds(new Date(), activity) < 1000) {
    return 'now';
  }

  return formatDistanceToNowStrict(activity, {
    addSuffix: true,
  });
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
  /** Current data timestamp. */
  now: string | undefined;
  /** Previous data timestamp. */
  then: string | undefined;
  /** Current in/out messages and bytes data. */
  current: MessagesData | undefined;
  /** Previous in/out messages and bytes data. */
  previous: MessagesData | undefined;
}

/** Calculate the rate of messages and bytes per second between 2 timestamps. */
export function calculateRates({
  now,
  then,
  current,
  previous,
}: CalculateRatesParams): Rates {
  // If any of the params is undefined, return zero values.
  if (!now || !then || !current || !previous) {
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
  const timeDelta = now && then ? msTimeDiff(now, then) : 0;
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
