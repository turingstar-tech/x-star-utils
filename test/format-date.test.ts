import { describe, expect, jest, test } from '@jest/globals';
import { render } from '@testing-library/react';
import dayjs from 'dayjs';
import type { formatDateProps } from '../src/format-date';
import formatDate from '../src/format-date';

describe('formatDate', () => {
  const mockDate = '2023-08-15T12:00:00Z';

  test('should render single date with time', () => {
    const props: formatDateProps = {
      date: mockDate,
      lang: 'en',
    };

    const { container } = render(formatDate(props));
    expect(container.textContent).toContain('Aug 15, 2023, 12:00 PMUTC+8');
  });

  test('should handle date range on the same day', () => {
    const props: formatDateProps = {
      date: [mockDate, '2023-08-15T15:30:00Z'],
      lang: 'en',
    };

    const { container } = render(formatDate(props));
    expect(container.textContent).toContain(
      'Aug 15, 2023, 12:00 PM - 03:30 PMUTC+8',
    );
  });

  test('should handle date range on different days', () => {
    const props: formatDateProps = {
      date: [mockDate, '2023-08-16T11:00:00Z'],
      lang: 'en',
    };

    const { container } = render(formatDate(props));
    expect(container.textContent).toContain(
      'Aug 15, 2023, 12:00 PM - Aug 16, 2023, 11:00 AMUTC+8',
    );
  });

  test('should handle reverse date range on different days', () => {
    const props: formatDateProps = {
      date: ['2023-08-16T11:00:00Z', mockDate],
      lang: 'en',
    };

    const { container } = render(formatDate(props));
    expect(container.textContent).toContain(
      'Aug 15, 2023, 12:00 PM - Aug 16, 2023, 11:00 AMUTC+8',
    );
  });

  test('should show Chinese formatting and UTC offset', () => {
    const props: formatDateProps = {
      date: mockDate,
      lang: 'zh',
      separator: '/',
    };

    dayjs.tz.setDefault('America/New_York');

    const { container } = render(formatDate(props));
    expect(container.textContent).toContain('2023/08/15 12:00UTC-4');
  });

  test('should render daylight time zone in New York', () => {
    jest
      .spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions')
      .mockReturnValue({ timeZone: 'New_York' } as any);

    dayjs.tz.setDefault('America/New_York');

    const { container, rerender } = render(
      formatDate({ date: '2023-08-15T12:00:00Z', lang: 'en' }),
    );
    expect(container.textContent).toContain('Aug 15, 2023, 12:00 PMEDT');

    rerender(formatDate({ date: '2023-02-15T12:00:00Z', lang: 'en' }));
    expect(container.textContent).toContain('Feb 15, 2023, 12:00 PMEST');

    // 浏览器时区在美国，但实际时区不在
    dayjs.tz.setDefault('US/Hawaii');

    rerender(formatDate({ date: '2023-08-15T12:00:00Z', lang: 'en' }));
    expect(container.textContent).toContain('Aug 15, 2023, 12:00 PMUTC-10');

    dayjs.tz.setDefault('Australia/Sydney');

    rerender(formatDate({ date: '2023-02-15T12:00:00Z', lang: 'en' }));
    expect(container.textContent).toContain('Feb 15, 2023, 12:00 PMUTC+11');
  });
});
