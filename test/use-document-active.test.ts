import { describe, expect, jest, test } from '@jest/globals';
import { act, renderHook } from '@testing-library/react-hooks';
import useDocumentActive from '../src/use-document-active';

jest.useFakeTimers();

describe('use document active test', () => {
  test('visibility change', async () => {
    jest.spyOn(document, 'hasFocus').mockReturnValueOnce(true);

    const { result } = renderHook(() => useDocumentActive());

    expect(result.current).toBe(true);

    jest
      .spyOn(document, 'visibilityState', 'get')
      .mockReturnValueOnce('hidden');

    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(result.current).toBe(false);

    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(result.current).toBe(true);
  });

  test('blur and focus', async () => {
    const { result } = renderHook(() => useDocumentActive());

    expect(result.current).toBe(false);

    act(() => {
      window.dispatchEvent(new Event('focus'));
    });

    expect(result.current).toBe(true);

    act(() => {
      window.dispatchEvent(new Event('blur'));
    });

    expect(result.current).toBe(false);
  });
});
