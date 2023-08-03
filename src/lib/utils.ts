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
      str: bytes.toFixed(2),
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
    str: (bytes / div).toFixed(2),
    unit: `${units[exp]}iB`,
  };
}
