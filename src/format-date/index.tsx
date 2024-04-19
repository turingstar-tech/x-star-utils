// lang: 'zh' | 'en'
// date: '2020-01-01'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React from 'react';
dayjs.extend(utc);

export interface formatDateProps {
  dateRange: [string | number, string | number] | [string | number];
  lang: 'zh' | 'en';
  separatorCH?: string;
}

// 1713485606000
// 1713518006000
const formatDate: React.FC<formatDateProps> = ({
  dateRange,
  lang,
  separatorCH,
}) => {
  const formatBaseStringMap = {
    zh: separatorCH ? `YYYY${separatorCH}MM${separatorCH}DD` : 'YYYY年MM月DD日',
    en: 'MMM DD, YYYY,',
  };

  const formatTimeStringMap = {
    zh: 'HH:mm',
    en: 'hh:mm A',
  };

  const utcOffset = dayjs(dateRange[0]).utcOffset() / 60;
  const formatBaseString = formatBaseStringMap[lang];
  const formatTimeString = formatTimeStringMap[lang];

  let result = '';
  if (dateRange.length === 1) {
    const baseDate = dayjs(dateRange[0]).format(formatBaseString);
    const time = dayjs(dateRange[0]).format(formatTimeString);
    result = `${baseDate} ${time}`;
  } else {
    let before = dayjs();
    let after = dayjs();
    if (dayjs(dateRange[0]).isBefore(dayjs(dateRange[1]))) {
      before = dayjs(dateRange[0]);
      after = dayjs(dateRange[1]);
    } else {
      before = dayjs(dateRange[1]);
      after = dayjs(dateRange[0]);
    }
    if (before.isSame(after, 'day')) {
      // 处在同一天
      const baseDate = before.format(formatBaseString);
      const startTime = before.format(formatTimeString);
      const endTime = after.format(formatTimeString);
      result = `${baseDate} ${startTime} - ${endTime}`;
    } else {
      const baseDateBefore = before.format(formatBaseString);
      const baseDateAfter = after.format(formatBaseString);
      const startTime = before.format(formatTimeString);
      const endTime = after.format(formatTimeString);
      result = `${baseDateBefore} ${startTime} - ${baseDateAfter} ${endTime}`;
    }
  }

  return (
    <>
      <span>{result}</span>
      <sup style={{ fontSize: 10 }}> UTC{utcOffset}</sup>
    </>
  );
};

export default formatDate;
