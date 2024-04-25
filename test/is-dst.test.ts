import { describe, expect, jest, test } from '@jest/globals';
import isDST from '../src/is-dst';

const offset = {
  current: 0,
  jan: 0,
  jul: 0,
};

jest.mock('dayjs', () => () => ({
  utcOffset: () => offset.current,
  startOf: () => ({ utcOffset: () => offset.jan }),
  month: () => ({ date: () => ({ utcOffset: () => offset.jul }) }),
}));

describe('isDST function for Eastern Time Zone', () => {
  test('checks if a date during Eastern Daylight Time (EDT) is DST in Northern Hemisphere', () => {
    offset.current = 0;
    offset.jan = 1;
    offset.jul = 0;
    const date = '2023-07-01'; // 夏令时日期
    expect(isDST(date)).toBe(true);
  });

  test('checks if a date during Eastern Daylight Time (EDT) is DST in Southern Hemisphere', () => {
    offset.current = 0;
    offset.jan = 0;
    offset.jul = 1;
    const date = '2023-07-01'; // 夏令时日期
    expect(isDST(date)).toBe(true);
  });

  test('checks if a date outside Eastern Daylight Time (EDT) is not DST', () => {
    offset.current = 1;
    offset.jan = 1;
    offset.jul = 0;
    const date = '2023-12-01'; // 非夏令时日期
    expect(isDST(date)).toBe(false);
  });
});
