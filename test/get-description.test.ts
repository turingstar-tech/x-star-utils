import { describe, expect, test } from '@jest/globals';
import { getDescription } from '../src';

describe('get description test', () => {
  test('chinese', () => {
    const result = getDescription('zh', '模式');
    expect(result).toBe('模式：');
  });

  test('english', () => {
    const result = getDescription('en', 'mode');
    expect(result).toBe('mode: ');
  });
});
