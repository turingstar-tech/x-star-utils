import { describe, expect, jest, test } from '@jest/globals';
import { isDST } from '../src';

// 使用jest.mock来模拟dayjs的行为
jest.mock('dayjs', () => {
  return () => ({
    utcOffset: () => 0,
    startOf: () => ({
      utcOffset: () => 0,
    }),
    month: () => ({
      date: () => ({
        utcOffset: () => 1,
      }),
    }),
  });
});

describe('isDST function', () => {
  test('checks if a date during Northern Hemisphere DST is DST', () => {
    const date = '2023-07-01'; // 北半球的夏令时日期
    expect(isDST(date)).toBe(true);
  });

  test('checks if a date outside Northern Hemisphere DST is not DST', () => {
    const date = '2023-01-01'; // 北半球的非夏令时日期
    expect(isDST(date)).toBe(false);
  });

  test('handles Southern Hemisphere DST dates', () => {
    const date = '2023-01-01'; // 南半球的夏令时日期
    expect(isDST(date)).toBe(true);
  });

  test('handles dates outside Southern Hemisphere DST', () => {
    const date = '2023-07-01'; // 南半球的非夏令时日期
    expect(isDST(date)).toBe(false);
  });
});
