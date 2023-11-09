import { describe, expect, test } from '@jest/globals';
import { randomString } from '../src';

describe('random string test', () => {
  test('success test', () => {
    expect(randomString(8)).toHaveLength(8);
    expect(randomString(8)).toMatch(/^([A-Za-z0-9+/=])+$/);
  });
});
