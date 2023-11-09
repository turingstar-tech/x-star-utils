import { describe, expect, test } from '@jest/globals';
import { toChineseNum } from '../src';

describe('to chinese num test', () => {
  test('success test', () => {
    expect(toChineseNum(0)).toBe('零');
    expect(toChineseNum(1)).toBe('一');
    expect(toChineseNum(9)).toBe('九');
    expect(toChineseNum(10)).toBe('十');
    expect(toChineseNum(11)).toBe('十一');
    expect(toChineseNum(20)).toBe('二十');
    expect(toChineseNum(21)).toBe('二十一');
    expect(toChineseNum(99)).toBe('九十九');
    expect(toChineseNum(100)).toBe('一百');
    expect(toChineseNum(1002)).toBe('一千零二');
    expect(toChineseNum(10000)).toBe('一万');
    //字符串
    expect(toChineseNum('1020')).toBe('一千零二十');
    //错误
    expect(() => toChineseNum(10000000)).toThrowError(
      '只支持十万以下的数字转换',
    );
  });
});
