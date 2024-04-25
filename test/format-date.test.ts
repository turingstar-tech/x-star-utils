import { describe, expect, jest, test } from '@jest/globals';
import { render } from '@testing-library/react';
import { formatDateProps } from 'x-star-utils/format-date';
import { formatDate } from '../src';

jest.mock('dayjs', () => {
  const originalDayjs = jest.requireActual<typeof import('dayjs')>('dayjs');
  const mockDayjs = jest.fn((input?: string) => {
    return originalDayjs(input);
  }) as jest.MockedFunction<any>;
  mockDayjs.extend = jest.fn();
  mockDayjs.utc = jest.fn(() => mockDayjs());
  return mockDayjs;
});

describe('formatDate', () => {
  const mockDate = '2023-08-15T12:00:00Z';

  // beforeEach(() => {
  //   dayjs.mockImplementation((input) => {
  //     if (input) {
  //       return dayjs.utc(input);
  //     }
  //     return dayjs.utc(mockDate);
  //   });
  //   isDST.mockReturnValue(false);
  // });

  test('should render single date with time', () => {
    const props: formatDateProps = {
      dateRange: [mockDate],
      lang: 'en',
    };

    const { container } = render(formatDate(props));
    expect(container.textContent).toContain('Aug 15, 2023, 08:00 PMUTC+8');
  });

  test('should handle date range on the same day', () => {
    const props: formatDateProps = {
      dateRange: [mockDate, '2023-08-15T15:30:00Z'],
      lang: 'en',
    };

    const { container } = render(formatDate(props));
    expect(container.textContent).toContain(
      'Aug 15, 2023, 08:00 PM - 11:30 PMUTC+8',
    );
  });

  test('should handle date range on different days', () => {
    const props: formatDateProps = {
      dateRange: [mockDate, '2023-08-16T11:00:00Z'],
      lang: 'en',
    };

    const { container } = render(formatDate(props));
    expect(container.textContent).toContain(
      'Aug 15, 2023, 08:00 PM - Aug 16, 2023, 07:00 PMUTC+8',
    );
  });

  test('should handle reverse date range on different days', () => {
    const props: formatDateProps = {
      dateRange: ['2023-08-16T11:00:00Z', mockDate],
      lang: 'en',
    };

    const { container } = render(formatDate(props));
    expect(container.textContent).toContain(
      'Aug 15, 2023, 08:00 PM - Aug 16, 2023, 07:00 PMUTC+8',
    );
  });

  test('should show Chinese formatting and UTC offset', () => {
    const props: formatDateProps = {
      dateRange: [mockDate],
      lang: 'zh',
      separatorCH: '/',
    };

    const { container } = render(formatDate(props));
    expect(container.textContent).toContain('2023/08/15 20:00UTC+8');
  });
});
