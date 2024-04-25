import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import isDST from '../is-dst';

dayjs.extend(utc);
dayjs.extend(timezone);

export enum StandardTimeZone {
  PacificStandardTime = -8, // North America
  MountainStandardTime = -7, // North America
  CentralStandardTime = -6, // North America  Central America
  EasternStandardTime = -5, // North America  Caribbean  Central America
  ChinaStandardTime = 8, // 	Asia
}

const standardTimeZoneMap: Record<number, string> = {
  [StandardTimeZone.PacificStandardTime]: 'PST',
  [StandardTimeZone.MountainStandardTime]: 'MST',
  [StandardTimeZone.CentralStandardTime]: 'CST',
  [StandardTimeZone.EasternStandardTime]: 'EST',
  [StandardTimeZone.ChinaStandardTime]: 'CST', // Note: 'CST' is used both for Central Standard Time and China Standard Time, which might be ambiguous in some contexts
};

export enum DaylightTimeZone {
  PacificDaylightTime = -7, // North America
  MountainDaylightTime = -6, // North America
  CentralDaylightTime = -5, // North America  Central America
  EasternDaylightTime = -4, // North America  Caribbean  Central America
}

const daylightTimeZoneMap: Record<number, string> = {
  [DaylightTimeZone.PacificDaylightTime]: 'PDT',
  [DaylightTimeZone.MountainDaylightTime]: 'MDT',
  [DaylightTimeZone.CentralDaylightTime]: 'CDT',
  [DaylightTimeZone.EasternDaylightTime]: 'EDT',
  [StandardTimeZone.ChinaStandardTime]: 'CST',
};

export interface formatDateProps {
  date:
    | string
    | number
    | [string | number]
    | [string | number, string | number];
  lang: 'zh' | 'en';
  separator?: string;
}

const formatDate = ({ date, lang, separator }: formatDateProps) => {
  const dateRange = Array.isArray(date) ? date : [date];
  const utcOffset = dayjs.tz(dateRange[0]).utcOffset() / 60;

  const formatBaseString = {
    zh: separator ? `YYYY${separator}MM${separator}DD` : 'YYYY年MM月DD日',
    en: 'MMM DD, YYYY,',
  }[lang];

  const formatTimeString = {
    zh: 'HH:mm',
    en: 'hh:mm A',
  }[lang];

  const isInUS = () => {
    const USCity = ['Los_Angeles', 'Denver', 'New_York', 'Chicago'];
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return USCity.some((city) => timeZone.endsWith(city));
  };

  const formatTimeZone = () => {
    if (lang === 'en' && isInUS()) {
      const timeZoneMap = isDST(dateRange[0])
        ? daylightTimeZoneMap
        : standardTimeZoneMap;
      return (
        timeZoneMap[utcOffset] ?? `UTC${utcOffset >= 0 ? '+' : ''}${utcOffset}`
      );
    } else {
      return `UTC${utcOffset >= 0 ? '+' : ''}${utcOffset}`;
    }
  };

  let result = '';
  if (dateRange.length === 1) {
    // 只有一个时间,不存在时间范围
    const baseDate = dayjs.tz(dateRange[0]).format(formatBaseString);
    const time = dayjs.tz(dateRange[0]).format(formatTimeString);
    result = `${baseDate} ${time}`;
  } else {
    let before = dayjs.tz();
    let after = dayjs.tz();
    if (dayjs.tz(dateRange[0]).isBefore(dayjs.tz(dateRange[1]))) {
      // 传入时间段，调整顺序
      before = dayjs.tz(dateRange[0]);
      after = dayjs.tz(dateRange[1]);
    } else {
      before = dayjs.tz(dateRange[1]);
      after = dayjs.tz(dateRange[0]);
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
