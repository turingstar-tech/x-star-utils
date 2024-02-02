import { describe, expect, jest, test } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { useResponsive } from '../src';

// 模拟 matchMedia 方法
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query === '(max-width: 575px)',
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }),
});

describe('useResponsive test', () => {
  // 测试 xs | sm | md | lg | xl | xxl | mb | iPad | pc
  test('success test for xs', () => {
    const { result } = renderHook(() => useResponsive('xs'));

    expect(result.current).toBe(true);
  });

  test('success test for sm', () => {
    const { result } = renderHook(() => useResponsive('sm'));

    expect(result.current).toBe(false);
  });

  test('success test for md', () => {
    const { result } = renderHook(() => useResponsive('md'));

    expect(result.current).toBe(false);
  });

  test('success test for lg', () => {
    const { result } = renderHook(() => useResponsive('lg'));

    expect(result.current).toBe(false);
  });

  test('success test for xl', () => {
    const { result } = renderHook(() => useResponsive('xl'));

    expect(result.current).toBe(false);
  });

  test('success test for xxl', () => {
    const { result } = renderHook(() => useResponsive('xxl'));

    expect(result.current).toBe(false);
  });

  test('success test for mb', () => {
    const { result } = renderHook(() => useResponsive('mb'));

    expect(result.current).toBe(true);
  });

  test('success test for iPad', () => {
    const { result } = renderHook(() => useResponsive('iPad'));

    expect(result.current).toBe(false);
  });

  test('success test for pc', () => {
    const { result } = renderHook(() => useResponsive('pc'));

    expect(result.current).toBe(false);
  });

  test('success test for 1000px', () => {
    const { result } = renderHook(() => useResponsive('(max-width: 1000px)'));

    expect(result.current).toBe(false);
  });

  test("success test for ''", () => {
    const { result } = renderHook(() => useResponsive(''));

    expect(result.current).toBe(false);
  });
});
