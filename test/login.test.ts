import { describe, expect, jest, test } from '@jest/globals';
import login from '../src/login';

// 模拟 sessionStorage
const mockSessionStorage = (() => {
  let store: any = {};
  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, value: any) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();
Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });

describe('login function test', () => {
  test('should set sessionStorage and perform redirect', () => {
    const mockLocation = {
      replace: jest.fn(),
      origin: 'https://example.com',
    };
    Object.defineProperty(global, 'location', {
      value: mockLocation,
      writable: true,
    });
    const from = '/somepage';
    const clientId = 'yourAppID';
    const loginUrl = 'https://idapi.example.com';

    login({ from, clientId, loginUrl });

    // 测试 sessionStorage 中是否设置了 login-state
    expect(sessionStorage.getItem('login-state')).toMatch(/^.{8}\/somepage$/);

    // 测试生成的 URL 是否符合预期
    const expectedUrl = new URL('https://idapi.example.com');
    const expectedParams = expectedUrl.searchParams;
    expectedParams.append('response_type', 'code');
    expectedParams.append('client_id', 'yourAppID');
    expectedParams.append('redirect_uri', 'https://example.com/login/callback');
    expectedParams.append('state', sessionStorage.getItem('login-state') || '');
    // 测试执行重定向是否符合预期
    expect(location.replace).toHaveBeenCalledWith(expectedUrl);
  });
});
