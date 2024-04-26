import { describe, expect, test } from '@jest/globals';
import isDST from '../src/is-dst';

describe('is dst test', () => {
  test('checks if a date is DST in New York', () => {
    expect(isDST('2023-07-01', 'America/New_York')).toBe(true); // 夏令时日期
    expect(isDST('2023-12-01', 'America/New_York')).toBe(false); // 非夏令时日期
  });

  test('checks if a date is DST in Sydney', () => {
    expect(isDST('2023-07-01', 'Australia/Sydney')).toBe(false); // 非夏令时日期
    expect(isDST('2023-12-01', 'Australia/Sydney')).toBe(true); // 夏令时日期
  });

  test('checks if a date is DST in Shanghai', () => {
    expect(isDST('2023-07-01', 'Asia/Shanghai')).toBe(false); // 非夏令时日期
    expect(isDST('2023-12-01', 'Asia/Shanghai')).toBe(false); // 非夏令时日期
  });
});
