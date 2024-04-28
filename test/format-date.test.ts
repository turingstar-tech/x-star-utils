import { describe, expect, test } from '@jest/globals';
import { render } from '@testing-library/react';
import formatDate from '../src/format-date';

describe('formatDate', () => {
  const mockDate = '2023-08-15T12:00:00Z';

  test('should render single date with time', () => {
    const { container } = render(
      formatDate(mockDate, { lang: 'en', showSecond: true }),
    );
    expect(container.textContent).toBe('Aug 15, 2023, 08:00:00 PMUTC+8');
  });

  test('should handle date range on the same day', () => {
    const { container } = render(
      formatDate([mockDate, '2023-08-15T15:30:00Z'], { lang: 'en' }),
    );
    expect(container.textContent).toBe(
      'Aug 15, 2023, 08:00 PM - 11:30 PMUTC+8',
    );
  });

  test('should handle date range on different days', () => {
    const { container } = render(
      formatDate([mockDate, '2023-08-16T11:00:00Z'], { lang: 'en' }),
    );
    expect(container.textContent).toBe(
      'Aug 15, 2023, 08:00 PM - Aug 16, 2023, 07:00 PMUTC+8',
    );
  });

  test('should handle reverse date range on different days', () => {
    const { container } = render(
      formatDate(['2023-08-16T11:00:00Z', mockDate]),
    );
    expect(container.textContent).toBe(
      '2023年08月15日 20:00 - 2023年08月16日 19:00UTC+8',
    );
  });

  test('should show Chinese formatting and UTC offset', () => {
    const { container } = render(
      formatDate(mockDate, { timeZone: 'America/New_York', separator: '/' }),
    );
    expect(container.textContent).toBe('2023/08/15 08:00UTC-4');
  });

  test('should render daylight time zone in New York', () => {
    const { container, rerender } = render(
      formatDate('2023-08-15T12:00:00Z', {
        timeZone: 'America/New_York',
        lang: 'en',
      }),
    );
    expect(container.textContent).toBe('Aug 15, 2023, 08:00 AMEDT');

    rerender(
      formatDate('2023-02-15T12:00:00Z', {
        timeZone: 'America/New_York',
        lang: 'en',
      }),
    );
    expect(container.textContent).toBe('Feb 15, 2023, 07:00 AMEST');
  });
});
