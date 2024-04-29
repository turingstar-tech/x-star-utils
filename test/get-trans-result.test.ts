import { describe, expect, test } from '@jest/globals';
import getTransResult from '../src/get-trans-result';

describe('get trans result test', () => {
  test('success test', () => {
    //中文环境
    expect(getTransResult('zh', '测试', 'test')).toBe('测试');
    expect(getTransResult('zh', '', 'test')).toBe('test');
    expect(getTransResult('zh', '测试', '')).toBe('测试');
    expect(getTransResult('zh', undefined, undefined)).toBe('');
    //英文环境
    expect(getTransResult('en', '测试', 'test')).toBe('test');
    expect(getTransResult('en', '', 'test')).toBe('test');
    expect(getTransResult('en', '测试', '')).toBe('测试');
    expect(getTransResult('en', undefined, undefined)).toBe('');
  });
});
