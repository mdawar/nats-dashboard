interface FormattedBytes {
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

interface AbbreviatedNumber {
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
