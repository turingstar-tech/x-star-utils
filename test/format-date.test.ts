import { describe, expect, test } from '@jest/globals';
import { render } from '@testing-library/react';
import formatDate from '../src/format-date';

describe('formatDate', () => {
  const mockDate = '2023-08-15T12:00:00Z';

  test('should render single date with time', () => {
    const { container, rerender } = render(
      formatDate(mockDate, {
        lang: 'en',
        showDayOfWeek: true,
        showSecond: true,
      }),
    );
    expect(container.textContent).toBe('Tue, Aug 15, 2023, 08:00:00 PMUTC+8');

    rerender(
      formatDate(mockDate, {
        lang: 'en',
        showDayOfWeek: true,
        showSecond: true,
        showDate: false,
      }),
    );
    expect(container.textContent).toBe('Tue, 08:00:00 PMUTC+8');

    rerender(
      formatDate([mockDate, '2023-08-15T14:00:00Z'], {
        lang: 'en',
        showDayOfWeek: true,
        showSecond: true,
        showDate: false,
      }),
    );
    expect(container.textContent).toBe('Tue, 08:00:00 PM - 10:00:00 PMUTC+8');

    rerender(
      formatDate([mockDate, '2023-08-18T14:00:00Z'], {
        lang: 'en',
        showDayOfWeek: true,
        showSecond: true,
        showDate: false,
      }),
    );
    expect(container.textContent).toBe(
      'Tue, 08:00:00 PM - Fri, 10:00:00 PMUTC+8',
    );
  });

  test('should render without date', () => {
    const { container, rerender } = render(
      formatDate(mockDate, { lang: 'en', showDate: false }),
    );
    expect(container.textContent).toBe('08:00 PMUTC+8');

    rerender(
      formatDate([mockDate, '2023-08-15T14:00:00Z'], {
        lang: 'en',
        durationIndicator: '~',
        showDate: false,
      }),
    );
    expect(container.textContent).toBe('08:00 PM ~ 10:00 PMUTC+8');

    rerender(
      formatDate([mockDate, '2023-08-16T14:00:00Z'], {
        lang: 'zh',
        showDate: false,
      }),
    );
    expect(container.textContent).toBe('20:00 - 22:00 (+1 天)UTC+8');

    rerender(
      formatDate([mockDate, '2023-08-16T14:00:00Z'], {
        lang: 'en',
        showDate: false,
      }),
    );
    expect(container.textContent).toBe('08:00 PM - 10:00 PM (+1 day)UTC+8');

    rerender(
      formatDate([mockDate, '2023-08-17T14:00:00Z'], {
        lang: 'en',
        durationIndicator: '~',
        showDate: false,
      }),
    );
    expect(container.textContent).toBe('08:00 PM ~ 10:00 PM (+2 days)UTC+8');
  });

  test('should handle date range on the same day', () => {
    const { container } = render(
      formatDate([mockDate, '2023-08-15T15:30:00Z'], {
        lang: 'en',
        durationIndicator: '~',
      }),
    );
    expect(container.textContent).toBe(
      'Aug 15, 2023, 08:00 PM ~ 11:30 PMUTC+8',
    );
  });

  test('should handle date range on different days', () => {
    const { container } = render(
      formatDate([mockDate, '2023-08-16T11:00:00Z'], {
        lang: 'en',
        durationIndicator: '~',
      }),
    );
    expect(container.textContent).toBe(
      'Aug 15, 2023, 08:00 PM ~ Aug 16, 2023, 07:00 PMUTC+8',
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
      formatDate(mockDate, {
        timeZone: 'America/New_York',
        separator: '/',
        showDayOfWeek: true,
        showSecond: true,
      }),
    );
    expect(container.textContent).toBe('2023/08/15 周二 08:00:00EDT');
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

    rerender(
      formatDate(['2024-09-29T00:00:00.000Z', '2024-12-15T02:00:00.000Z'], {
        lang: 'zh',
        showDate: false,
        showDayOfWeek: true,
        timeZone: 'America/Los_Angeles',
      }),
    );
    expect(container.textContent).toBe('周六 17:00 - 19:00PDT');
  });
});
