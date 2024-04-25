import { describe, expect, jest, test } from '@jest/globals';
import { isDST } from '../src';

// Mock整个dayjs库
jest.mock('dayjs', () => {
  const originalDayjs = jest.requireActual<typeof import('dayjs')>('dayjs'); // 获取原始实现，以便可以调用实际的方法，如果需要

  const mockDayjs = jest.fn((input?: string) => {
    console.log('input:', input);
    const date = originalDayjs(input);
    console.log('date:', date);
    return {
      // 模拟 startOf 方法
      startOf: jest.fn((unit) => {
        switch (unit) {
          case 'year':
            date.month(0).date(1).hour(0).minute(0).second(0);
            break;
          // 可以根据需要添加更多的 case
          default:
            break;
        }
        return date;
      }),
      // 模拟 month 和 date 方法
      month: jest.fn((monthIndex: number) => ({
        date: jest.fn((day: number) => {
          date.month(monthIndex).date(day);
          return {
            // 模拟 utcOffset 方法
            utcOffset: jest.fn(() => {
              const month = date.month() + 1;
              //console.log('month:', month, 'date:', date.date());
              if (
                (month > 3 && month < 11) ||
                (month === 3 && date.date() > 14) ||
                (month === 11 && date.date() < 7)
              ) {
                // 简单模拟夏令时: 3月第二个星期日到11月第一个星期日
                return -240; // DST UTC偏移量
              }
              return -300; // 非DST UTC偏移量
            }),
          };
        }),
      })),
      // 保证 utcOffset 在不传参的情况下也有值
      utcOffset: jest.fn(() => 0),
    };
  }) as jest.MockedFunction<any>;

  mockDayjs.extend = jest.fn();
  mockDayjs.utc = jest.fn(() => mockDayjs());
  return mockDayjs;
});

describe('isDST function for Eastern Time Zone', () => {
  test('checks if a date during Eastern Daylight Time (EDT) is DST', () => {
    const date = '2023-07-01'; // 夏令时日期
    expect(isDST(date)).toBe(true);
  });

  test('checks if a date outside Eastern Daylight Time (EDT) is not DST', () => {
    const date = '2023-12-01'; // 非夏令时日期
    expect(isDST(date)).toBe(false);
  });
});
