import { describe, expect, test } from '@jest/globals';
import getDescription from '../src/get-description';

describe('get description test', () => {
  test('chinese', () => {
    const result = getDescription('zh', '模式');
    expect(result).toBe('模式：');
  });

  test('english', () => {
    const result = getDescription('en', 'mode');
    expect(result).toBe('mode: ');
  });

  test('undefined', () => {
    const result = getDescription('zh', undefined);
    expect(result).toBe('：');
  });
});
