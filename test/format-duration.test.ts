import { describe, expect, test } from '@jest/globals';
import formatDuration from '../src/format-duration';

describe('format duration test', () => {
  test('success test', () => {
    // 测试正常的持续时间
    expect(formatDuration(3661)).toBe('01:01:01');
    expect(formatDuration(7200)).toBe('02:00:00');
    expect(formatDuration(180)).toBe('00:03:00');

    // 测试边界条件
    expect(formatDuration(0)).toBe('00:00:00');
    expect(formatDuration(59)).toBe('00:00:59');
    expect(formatDuration(60)).toBe('00:01:00');
    expect(formatDuration(3599)).toBe('00:59:59');
    expect(formatDuration(3600)).toBe('01:00:00');
  });
});
