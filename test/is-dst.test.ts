import { describe, expect, test } from '@jest/globals';
import dayjs from 'dayjs';
import isDST from '../src/is-dst';

describe('is dst test', () => {
  test('checks if a date is DST in New York', () => {
    dayjs.tz.setDefault('America/New_York');
    expect(isDST('2023-07-01')).toBe(true); // 夏令时日期
    expect(isDST('2023-12-01')).toBe(false); // 非夏令时日期
  });

  test('checks if a date is DST in Sydney', () => {
    dayjs.tz.setDefault('Australia/Sydney');
    expect(isDST('2023-07-01')).toBe(false); // 非夏令时日期
    expect(isDST('2023-12-01')).toBe(true); // 夏令时日期
  });

  test('checks if a date is DST in Shanghai', () => {
    dayjs.tz.setDefault('Asia/Shanghai');
    expect(isDST('2023-07-01')).toBe(false); // 非夏令时日期
    expect(isDST('2023-12-01')).toBe(false); // 非夏令时日期
  });
});
