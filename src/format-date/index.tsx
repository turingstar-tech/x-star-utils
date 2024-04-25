// lang: 'zh' | 'en'
// date: '2020-01-01'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import isDST from 'x-star-utils/is-DST';
dayjs.extend(utc);

export interface formatDateProps {
  dateRange: [string | number, string | number] | [string | number];
  lang: 'zh' | 'en';
  separatorCH?: string;
}

export enum StandardTimeZone {
  HawaiiStandardTime = -10, // North America  Pacific
  MountainStandardTime = -7, // North America
  PacificStandardTime = -8, // North America
  CentralStandardTime = -6, // North America  Central America
  EasternStandardTime = -5, // North America  Caribbean  Central America
  ChinaStandardTime = 8, // 	Asia
}

export enum DaylightTimeZone {
  HawaiiDaylightTime = -9, // North America  Pacific
  PacificDaylightTime = -7, // North America
  MountainDaylightTime = -6, // North America
  CentralDaylightTime = -5, // North America  Central America
  EasternDaylightTime = -4, // North America  Caribbean  Central America
  ChinaStandardTime = 8, // 	Asia
}

const formatDate: React.FC<formatDateProps> = ({
  dateRange,
  lang,
  separatorCH,
}) => {
  const isInUS = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const USCity = ['Los_Angeles', 'Denver', 'New_York', 'Chicago'];
    if (USCity.some((v) => timezone.indexOf(v) !== -1)) {
      return true;
    }
    return false;
  };

  const utcOffset = dayjs(dateRange[0]).utcOffset() / 60;
  const convertTimeZone = () => {
    if (isDST(dateRange[0])) {
      switch (utcOffset) {
        case DaylightTimeZone.HawaiiDaylightTime:
          return 'HDT';
        case DaylightTimeZone.PacificDaylightTime:
          return 'PDT';
        case DaylightTimeZone.MountainDaylightTime:
          return 'MDT';
        case DaylightTimeZone.CentralDaylightTime:
          return 'CDT';
        case DaylightTimeZone.EasternDaylightTime:
          return 'EDT';
        case DaylightTimeZone.ChinaStandardTime:
          return 'CST';
        default:
          return `GMT${utcOffset >= 0 ? `+${utcOffset}` : utcOffset}`;
      }
    } else {
      switch (utcOffset) {
        case StandardTimeZone.HawaiiStandardTime:
          return 'HST';
        case StandardTimeZone.PacificStandardTime:
          return 'PST';
        case StandardTimeZone.MountainStandardTime:
          return 'MST';
        case StandardTimeZone.CentralStandardTime:
          return 'CST';
        case StandardTimeZone.EasternStandardTime:
          return 'EST';
        case DaylightTimeZone.ChinaStandardTime:
          return 'CST';
        default:
          return `GMT${utcOffset >= 0 ? `+${utcOffset}` : utcOffset}`;
      }
    }
  };

  const formatTimeZone = () => {
    if (lang === 'zh') {
      return `UTC${utcOffset > 0 ? '+' + utcOffset : utcOffset}`;
    } else {
      if (isInUS()) {
        return convertTimeZone();
      } else {
        return `UTC${utcOffset > 0 ? '+' + utcOffset : utcOffset}`;
      }
    }
  };

  const formatBaseStringMap = {
    zh: separatorCH ? `YYYY${separatorCH}MM${separatorCH}DD` : 'YYYY年MM月DD日',
    en: 'MMM DD, YYYY,',
  };

  const formatTimeStringMap = {
    zh: 'HH:mm',
    en: 'hh:mm A',
  };

  const formatBaseString = formatBaseStringMap[lang];
  const formatTimeString = formatTimeStringMap[lang];

  let result = '';
  if (dateRange.length === 1) {
    // 只有一个时间,不存在时间范围
    const baseDate = dayjs(dateRange[0]).format(formatBaseString);
    const time = dayjs(dateRange[0]).format(formatTimeString);
    result = `${baseDate} ${time}`;
  } else {
    let before = dayjs();
    let after = dayjs();
    if (dayjs(dateRange[0]).isBefore(dayjs(dateRange[1]))) {
      // 传入时间段，调整顺序
      before = dayjs(dateRange[0]);
      after = dayjs(dateRange[1]);
    } else {
      before = dayjs(dateRange[1]);
      after = dayjs(dateRange[0]);
    }
    if (before.isSame(after, 'day')) {
      // 同一天则年月日不重复显示
      // 处在同一天
      const baseDate = before.format(formatBaseString);
      const startTime = before.format(formatTimeString);
      const endTime = after.format(formatTimeString);
      result = `${baseDate} ${startTime} - ${endTime}`;
    } else {
      // 不在同一天
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
      <sup style={{ fontSize: 10 }}>{formatTimeZone()}</sup>
    </>
  );
};

export default formatDate;
