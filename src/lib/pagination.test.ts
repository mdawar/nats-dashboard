import { describe, test, expect } from 'vitest';
import { paginationRange, type PaginationRangeParams } from './pagination';

describe('paginationRange', () => {
  test.each<{ params: PaginationRangeParams; want: string[] }>([
    {
      params: { total: 1, current: 1, size: 1 },
      want: ['1'],
    },
    {
      params: { total: 1, current: 1, size: 2 },
      want: ['1'],
    },
    {
      params: { total: 1, current: 2, size: 2 },
      want: ['1'],
    },
    {
      params: { total: 1, current: 2, size: 0 },
      want: [],
    },
    {
      params: { total: 2, current: 1, size: 2 },
      want: ['1', '2'],
    },
    {
      params: { total: 7, current: 5, size: 10 },
      want: ['1', '2', '3', '4', '5', '6', '7'],
    },
    {
      params: { total: 5, current: 2, size: 7 },
      want: ['1', '2', '3', '4', '5'],
    },
    {
      params: { total: 20, current: 10, size: 7 },
      want: ['1', '...', '9', '10', '11', '...', '20'],
    },
    {
      params: { total: 20, current: 10, size: 6 },
      want: ['1', '...', '9', '10', '...', '20'],
    },
    {
      params: { total: 20, current: 10, size: 5 },
      want: ['1', '...', '10', '...', '20'],
    },
    {
      params: { total: 20, current: 18, size: 7 },
      want: ['1', '...', '16', '17', '18', '19', '20'],
    },
    {
      params: { total: 20, current: 5, size: 7 },
      want: ['1', '...', '4', '5', '6', '...', '20'],
    },
    {
      params: { total: 20, current: 4, size: 7 },
      want: ['1', '2', '3', '4', '5', '...', '20'],
    },
    {
      params: { total: 20, current: 3, size: 7 },
      want: ['1', '2', '3', '4', '5', '...', '20'],
    },
    {
      params: { total: 20, current: 2, size: 7 },
      want: ['1', '2', '3', '4', '5', '...', '20'],
    },
    {
      params: { total: 20, current: 1, size: 7 },
      want: ['1', '2', '3', '4', '5', '...', '20'],
    },
    {
      params: { total: 100, current: 1, size: 5 },
      want: ['1', '2', '3', '...', '100'],
    },
    {
      params: { total: 100, current: 99, size: 7 },
      want: ['1', '...', '96', '97', '98', '99', '100'],
    },
    {
      params: { total: 100, current: 98, size: 7 },
      want: ['1', '...', '96', '97', '98', '99', '100'],
    },
    {
      params: { total: 100, current: 97, size: 7 },
      want: ['1', '...', '96', '97', '98', '99', '100'],
    },
    {
      params: { total: 100, current: 96, size: 7 },
      want: ['1', '...', '95', '96', '97', '...', '100'],
    },
    {
      params: { total: 1000, current: 200, size: 7 },
      want: ['1', '...', '199', '200', '201', '...', '1000'],
    },
    {
      params: { total: 1000, current: 3, size: 7 },
      want: ['1', '2', '3', '4', '5', '...', '1000'],
    },
    {
      params: { total: 1000, current: 3, size: 6 },
      want: ['1', '2', '3', '4', '...', '1000'],
    },
    {
      params: { total: 1000, current: 3, size: 4 },
      want: ['1', '2', '3', '1000'],
    },
    {
      params: { total: 1000, current: 2, size: 4 },
      want: ['1', '2', '...', '1000'],
    },
    {
      params: { total: 1000, current: 10, size: 4 },
      want: ['1', '...', '10', '1000'],
    },
    {
      params: { total: 1000, current: 3, size: 3 },
      want: ['1', '3', '1000'],
    },
    {
      params: { total: 1000, current: 3, size: 2 },
      want: ['1', '1000'],
    },
    {
      params: { total: 1000, current: 10, size: 1 },
      want: ['10'],
    },
  ])('paginationRange($params) -> $want', ({ params, want }) => {
    expect(paginationRange(params)).toEqual(want);
  });
});
