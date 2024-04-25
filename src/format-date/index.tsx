import type { ConfigType } from 'dayjs';
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
}

const standardTimeZoneMap: Record<number, string> = {
  [StandardTimeZone.PacificStandardTime]: 'PST',
  [StandardTimeZone.MountainStandardTime]: 'MST',
  [StandardTimeZone.CentralStandardTime]: 'CST',
  [StandardTimeZone.EasternStandardTime]: 'EST',
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
};

export interface FormatDateOptions {
  /**
   * 语言
   */
  lang?: 'zh' | 'en';

  /**
   * 中文环境下年月日分隔符
   */
  separator?: string;
}

/**
 * 根据语言环境格式化时间
 *
 * @param date 时间
 * @param options 格式化选项
 * @returns 时间 JSX
 */
const formatDate = (
  date: ConfigType | ConfigType[],
  { lang = 'zh', separator }: FormatDateOptions = {},
) => {
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
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
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

  const formatTime = () => {
    if (dateRange.length === 1) {
      // 只有一个时间，不存在时间范围
      const first = dayjs.tz(dateRange[0]);
      const baseDate = first.format(formatBaseString);
      const time = first.format(formatTimeString);
      return `${baseDate} ${time}`;
    } else {
      const first = dayjs.tz(dateRange[0]);
      const second = dayjs.tz(dateRange[1]);
      const [before, after] = first.isBefore(second)
        ? [first, second]
        : [second, first];
      if (before.isSame(after, 'day')) {
        // 在同一天则年月日不重复显示
        const baseDate = before.format(formatBaseString);
        const startTime = before.format(formatTimeString);
        const endTime = after.format(formatTimeString);
        return `${baseDate} ${startTime} - ${endTime}`;
      } else {
        // 不在同一天
        const baseDateBefore = before.format(formatBaseString);
        const baseDateAfter = after.format(formatBaseString);
        const startTime = before.format(formatTimeString);
        const endTime = after.format(formatTimeString);
        return `${baseDateBefore} ${startTime} - ${baseDateAfter} ${endTime}`;
      }
    }
  };

  return (
    <>
      <span>{formatTime()}</span>
      <sup style={{ fontSize: 10 }}>{formatTimeZone()}</sup>
    </>
  );
};

export default formatDate;
