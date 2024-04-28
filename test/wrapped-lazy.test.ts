import { describe, expect, jest, test } from '@jest/globals';
import { act, render, renderHook } from '@testing-library/react';
import React, { useRef } from 'react';
import wrappedLazy from '../src/wrapped-lazy';

jest.useFakeTimers();

describe('wrapped lazy test', () => {
  test('success test', async () => {
    const Component = wrappedLazy(() =>
      Promise.resolve({
        default: React.forwardRef<HTMLDivElement, { text: string }>(
          ({ text }, ref) => React.createElement('div', { ref }, text),
        ),
      }),
    );
    const {
      result: { current: ref },
    } = renderHook(() => useRef<HTMLDivElement>(null));
    const { container } = render(
      React.createElement(Component, { ref, text: '123' }),
    );
    expect(ref.current).toBe(null);
    expect(container.textContent).toBe('Loading...');
    await act(jest.runOnlyPendingTimersAsync);
    expect(ref.current).not.toBe(null);
    expect(container.textContent).toBe('123');
  });
});
