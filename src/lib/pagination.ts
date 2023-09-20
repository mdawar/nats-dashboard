/**
 * Paginate an array.
 *
 * Returns a new array of the items to display for the specified page number and size.
 */
export function paginate<T>(arr: T[], pageSize: number, page: number): T[] {
  return arr.slice((page - 1) * pageSize, page * pageSize);
}

export interface PaginationRangeParams {
  /** Total number of pages. */
  total: number;
  /** Current page number. */
  current: number;
  /** Range size. */
  size: number;
}

/**
 * Generate a pagination range with a specific size.
 */
export function paginationRange({
  total,
  current,
  size,
}: PaginationRangeParams): string[] {
  if (total <= size) {
    return Array.from({ length: total }, (_, i) => String(i + 1));
  }

  // Special cases.
  switch (size) {
    case 2:
      return ['1', String(total)];
    case 1:
      return [String(current)];
    case 0:
      return [];
  }

  const numbers: (string | number)[] = [];
  const distance = Math.floor(size / 2);

  // Range of numbers to generate.
  let from = Math.max(current - distance, 1);
  let to = Math.min(current + distance, total);

  // If the numbers to generate after the current number are
  // higher than the total number of pages, then subtract
  // the difference from the starting number to generate more numbers.
  if (current + distance > total) {
    const diff = current + distance - total;
    from -= diff;
  }

  // If the numbers to generate before the current number are
  // lower than 1 (first page), then add the difference to the
  // ending number to generate more numbers.
  if (current - distance < 1) {
    const diff = 1 - (current - distance);
    to += diff;
  }

  // Generate the range of numbers with the specified size.
  for (let i = from; i <= to && numbers.length < size; i++) {
    numbers.push(i);
  }

  // First and last pages.
  numbers[0] = 1;
  numbers[numbers.length - 1] = total;

  // Second page if not the current page.
  if (numbers[1] !== 2 && numbers[1] !== current) {
    numbers[1] = '...';
  }

  const beforeLast = numbers.length - 2;

  // The page before the last if not the current page.
  if (numbers[beforeLast] !== total - 1 && numbers[beforeLast] !== current) {
    numbers[beforeLast] = '...';
  }

  return numbers.map(String);
}
