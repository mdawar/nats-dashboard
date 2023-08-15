// sum.test.js
import { describe, test, expect } from 'vitest';
import { formatDuration, roundDuration, formatRTT } from './utils';

interface TestCase {
  name?: string;
  input: string;
  want: string;
}

describe('formatDuration', () => {
  test('integer without a unit', () => {
    expect(formatDuration('10')).toBe('10');
  });

  describe('single unit strings', () => {
    const cases: TestCase[] = [
      { input: '12ns', want: '12ns' },
      { input: '123µs', want: '123µs' },
      { input: '230us', want: '230us' },
      { input: '652ms', want: '652ms' },
      { input: '30s', want: '30s' },
      { input: '12m', want: '12m' },
      { input: '4h', want: '4h' },
    ];

    for (const { input, want } of cases) {
      test(`${input} -> ${want}`, () => {
        expect(formatDuration(input)).toBe(want);
      });
    }
  });

  describe('single unit strings with fractions', () => {
    const cases: TestCase[] = [
      { input: '12.2ns', want: '12.2ns' },
      { input: '123.50µs', want: '123.50µs' },
      { input: '230.12us', want: '230.12us' },
      { input: '652.923ms', want: '652.923ms' },
      { input: '30.12s', want: '30.12s' },
      { input: '12.654m', want: '12.654m' },
      { input: '4.52h', want: '4.52h' },
    ];

    for (const { input, want } of cases) {
      test(`${input} -> ${want}`, () => {
        expect(formatDuration(input)).toBe(want);
      });
    }
  });

  describe('multiple unit strings', () => {
    const cases: TestCase[] = [
      { input: '15m35s', want: '15m 35s' },
      { input: '12h30m52s', want: '12h 30m 52s' },
      { input: '3d12h30m52s', want: '3d 12h 30m 52s' },
      { input: '3d12h30m52s600ms', want: '3d 12h 30m 52s 600ms' },
      { input: '5d18h40m30s100ms10µs', want: '5d 18h 40m 30s 100ms 10µs' },
    ];

    for (const { input, want } of cases) {
      test(`${input} -> ${want}`, () => {
        expect(formatDuration(input)).toBe(want);
      });
    }
  });

  describe('multiple unit strings with fractions', () => {
    const cases: TestCase[] = [
      { input: '15m35.21s', want: '15m 35.21s' },
      { input: '12h30m52.5s', want: '12h 30m 52.5s' },
      { input: '3d12h30m30.90s', want: '3d 12h 30m 30.90s' },
      { input: '3d12h30m52s600.123ms', want: '3d 12h 30m 52s 600.123ms' },
      {
        input: '5d18h40m30s100ms10.12µs',
        want: '5d 18h 40m 30s 100ms 10.12µs',
      },
    ];

    for (const { input, want } of cases) {
      test(`${input} -> ${want}`, () => {
        expect(formatDuration(input)).toBe(want);
      });
    }
  });
});

describe('roundDuration', () => {
  describe('input without fractions', () => {
    const cases: TestCase[] = [
      { name: 'empty string', input: '', want: '' },
      { name: 'blank space', input: ' ', want: ' ' },
      { name: 'letters', input: 'abc', want: 'abc' },
      { name: 'number', input: '12', want: '12' },
      { name: 'int duration', input: '24m', want: '24m' },
    ];

    for (const { name, input, want } of cases) {
      test(name!, () => {
        expect(roundDuration(input)).toBe(want);
      });
    }
  });

  describe('duration with fractions', () => {
    const cases: TestCase[] = [
      { input: '1.32h', want: '1.32h' },
      { input: '5.124s', want: '5.12s' },
      { input: '1.5789ms', want: '1.58ms' },
      { input: '3.95532s', want: '3.96s' },
      { input: '30.462357s', want: '30.46s' },
      { input: '12.8412370m', want: '12.84m' },
      { input: '7.80727655ns', want: '7.81ns' },
      { input: '57.005276559s', want: '57.01s' },
      { input: '12.00m', want: '12m' }, // .00 removed
      { input: '1.0002563s', want: '1s' }, // .00 removed
    ];

    for (const { input, want } of cases) {
      test(`${input} -> ${want}`, () => {
        expect(roundDuration(input)).toBe(want);
      });
    }
  });
});

describe('formatRTT', () => {
  describe('rtt without fractions', () => {
    const cases: TestCase[] = [
      { input: '674µs', want: '674µs' },
      { input: '1h32m', want: '1h 32m' },
      { input: '1h12s50ms', want: '1h 12s 50ms' },
    ];

    for (const { input, want } of cases) {
      test(`${input} -> ${want}`, () => {
        expect(formatRTT(input)).toBe(want);
      });
    }
  });

  describe('rtt with fractions', () => {
    const cases: TestCase[] = [
      { input: '7.075186ms', want: '7.08ms' },
      { input: '1s50.124ms', want: '1s 50.12ms' },
      { input: '1m57.800276559s', want: '1m 57.80s' },
      { input: '3.95532s', want: '3.96s' },
      { input: '1.00s', want: '1s' },
      { input: '7.002454754ms', want: '7ms' },
      { input: '2s10.0045412ms', want: '2s 10ms' },
    ];

    for (const { input, want } of cases) {
      test(`${input} -> ${want}`, () => {
        expect(formatRTT(input)).toBe(want);
      });
    }
  });
});
