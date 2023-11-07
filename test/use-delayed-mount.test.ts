import { describe, expect, test } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { useDelayedMount } from '../src';

describe('use delayed mount test', () => {
  test('hide then show then hide', async () => {
    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ show }) => useDelayedMount(show, 300),
      {
        initialProps: { show: false },
      },
    );

    expect(result.current).toEqual([false, false]);

    rerender({ show: true });

    expect(result.current).toEqual([true, false]);

    await waitForNextUpdate({ timeout: 15 });

    expect(result.current).toEqual([true, true]);

    rerender({ show: false });

    expect(result.current).toEqual([true, false]);

    try {
      await waitForNextUpdate({ timeout: 295 });
      throw new Error();
    } catch {}

    expect(result.current).toEqual([true, false]);

    await waitForNextUpdate({ timeout: 10 });

    expect(result.current).toEqual([false, false]);
  });

  test('show then hide then show', async () => {
    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ show }) => useDelayedMount(show, 300),
      {
        initialProps: { show: true },
      },
    );

    expect(result.current).toEqual([true, true]);

    rerender({ show: false });

    expect(result.current).toEqual([true, false]);

    try {
      await waitForNextUpdate({ timeout: 295 });
      throw new Error();
    } catch {}

    expect(result.current).toEqual([true, false]);

    await waitForNextUpdate({ timeout: 10 });

    expect(result.current).toEqual([false, false]);

    rerender({ show: true });

    expect(result.current).toEqual([true, false]);

    await waitForNextUpdate({ timeout: 15 });

    expect(result.current).toEqual([true, true]);
  });
});
