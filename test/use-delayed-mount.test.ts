import { describe, expect, jest, test } from '@jest/globals';
import { act, renderHook } from '@testing-library/react-hooks';
import { useDelayedMount } from '../src';

jest.useFakeTimers();

describe('use delayed mount test', () => {
  test('hide then show then hide', async () => {
    const { result, rerender } = renderHook(
      ({ show }) => useDelayedMount(show, 300),
      { initialProps: { show: false } },
    );

    expect(result.current).toEqual([false, false]);

    act(() => jest.advanceTimersByTime(305));

    expect(result.current).toEqual([false, false]);

    rerender({ show: true });

    expect(result.current).toEqual([true, false]);

    act(() => jest.advanceTimersByTime(5));

    expect(result.current).toEqual([true, false]);

    act(() => jest.advanceTimersByTime(10));

    expect(result.current).toEqual([true, true]);

    rerender({ show: false });

    expect(result.current).toEqual([true, false]);

    act(() => jest.advanceTimersByTime(295));

    expect(result.current).toEqual([true, false]);

    act(() => jest.advanceTimersByTime(10));

    expect(result.current).toEqual([false, false]);
  });
});
