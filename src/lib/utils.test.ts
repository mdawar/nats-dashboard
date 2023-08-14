// sum.test.js
import { describe, test, expect } from 'vitest';
import { formatDuration } from './utils';

interface TestCase {
  input: string;
  want: string;
}

describe('formatDuration', () => {
  test('integer without a unit', () => {
    expect(formatDuration('10')).toBe('10');
  });

  describe('single unit strings', () => {
    const cases: Record<string, TestCase> = {
      'nanosecond ns': { input: '12ns', want: '12ns' },
      'microsecond µs': { input: '123µs', want: '123µs' },
      'microsecond us': { input: '230us', want: '230us' },
      'millisecond ms': { input: '652ms', want: '652ms' },
      'second s': { input: '30s', want: '30s' },
      'minute m': { input: '12m', want: '12m' },
      'hour h': { input: '4h', want: '4h' },
    };

    for (const [name, { input, want }] of Object.entries(cases)) {
      test(name, () => {
        expect(formatDuration(input)).toBe(want);
      });
    }
  });

  describe('single unit strings with fractions', () => {
    const cases: Record<string, TestCase> = {
      'nanosecond ns': { input: '12.2ns', want: '12.2ns' },
      'microsecond µs': { input: '123.50µs', want: '123.50µs' },
      'microsecond us': { input: '230.12us', want: '230.12us' },
      'millisecond ms': { input: '652.923ms', want: '652.923ms' },
      'second s': { input: '30.12s', want: '30.12s' },
      'minute m': { input: '12.654m', want: '12.654m' },
      'hour h': { input: '4.52h', want: '4.52h' },
    };

    for (const [name, { input, want }] of Object.entries(cases)) {
      test(name, () => {
        expect(formatDuration(input)).toBe(want);
      });
    }
  });

  describe('multiple unit strings', () => {
    const cases: Record<string, TestCase> = {
      '2 units': { input: '15m35s', want: '15m 35s' },
      '3 units': { input: '12h30m52s', want: '12h 30m 52s' },
      '4 units': { input: '3d12h30m52s', want: '3d 12h 30m 52s' },
      '5 units': { input: '3d12h30m52s600ms', want: '3d 12h 30m 52s 600ms' },
      '6 units': {
        input: '5d18h40m30s100ms10µs',
        want: '5d 18h 40m 30s 100ms 10µs',
      },
    };

    for (const [name, { input, want }] of Object.entries(cases)) {
      test(name, () => {
        expect(formatDuration(input)).toBe(want);
      });
    }
  });

  describe('multiple unit strings with fractions', () => {
    const cases: Record<string, TestCase> = {
      '2 units': { input: '15m35.21s', want: '15m 35.21s' },
      '3 units': { input: '12h30m52.5s', want: '12h 30m 52.5s' },
      '4 units': { input: '3d12h30m30.90s', want: '3d 12h 30m 30.90s' },
      '5 units': {
        input: '3d12h30m52s600.123ms',
        want: '3d 12h 30m 52s 600.123ms',
      },
      '6 units': {
        input: '5d18h40m30s100ms10.12µs',
        want: '5d 18h 40m 30s 100ms 10.12µs',
      },
    };

    for (const [name, { input, want }] of Object.entries(cases)) {
      test(name, () => {
        expect(formatDuration(input)).toBe(want);
      });
    }
  });
});
