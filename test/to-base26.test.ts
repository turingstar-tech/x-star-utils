import { describe, expect, test } from '@jest/globals';
import toBase26 from '../src/to-base26';

describe('to base26 test', () => {
  test('success test', () => {
    expect(toBase26(0)).toBe('A');
    expect(toBase26(1)).toBe('B');
    expect(toBase26(25)).toBe('Z');
    expect(toBase26(26)).toBe('BA');
    expect(toBase26(27)).toBe('BB');
  });
});
