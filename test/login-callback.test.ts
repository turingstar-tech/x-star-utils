import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import loginCallback from '../src/login-callback';

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
// 模拟 window.location.search
const mockLocation = {
  search: '?code=test_code&state=abcdefgh/some_path',
  origin: 'https://example.com',
};
Object.defineProperty(global, 'location', {
  value: mockLocation,
  writable: true,
});
describe('loginCallback function', () => {
  let loginMock: any;
  let setTokenMock: any;
  let navigateMock: any;

  beforeEach(() => {
    loginMock = jest
      .fn<() => Promise<string>>()
      .mockResolvedValue('mock_token');
    setTokenMock = jest.fn();
    navigateMock = jest.fn();
  });

  test('should navigate to /403 if state does not match', async () => {
    window.sessionStorage.setItem('local-state', 'wrong_state');

    await loginCallback({
      login: loginMock,
      setToken: setTokenMock,
      navigate: navigateMock,
    });

    expect(navigateMock).toHaveBeenCalledWith('/403');
    expect(loginMock).not.toHaveBeenCalled();
    expect(setTokenMock).not.toHaveBeenCalled();
  });

  test('should login, set token, and navigate if state matches', async () => {
    const originalState = 'abcdefgh/some_path';
    window.sessionStorage.setItem('local-state', originalState);

    await loginCallback({
      login: loginMock,
      setToken: setTokenMock,
      navigate: navigateMock,
    });

    expect(loginMock).toHaveBeenCalledWith({
      code: 'test_code',
      redirect_uri: `${location.origin}/login/callback`,
    });

    expect(setTokenMock).toHaveBeenCalledWith('mock_token');
    expect(navigateMock).toHaveBeenCalledWith('/some_path');
  });
  test('should navigate to /403 if state and code empty', async () => {
    const mockLocation = {
      search: '',
    };
    Object.defineProperty(global, 'location', {
      value: mockLocation,
      writable: true,
    });
    window.sessionStorage.setItem('local-state', 'wrong_state');

    await loginCallback({
      login: loginMock,
      setToken: setTokenMock,
      navigate: navigateMock,
    });

    expect(navigateMock).toHaveBeenCalledWith('/403');
    expect(loginMock).not.toHaveBeenCalled();
    expect(setTokenMock).not.toHaveBeenCalled();
  });
});
