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
   * 时区
   */
  timeZone?: string;

  /**
   * 语言
   */
  lang?: 'zh' | 'en';

  /**
   * 中文环境下年月日分隔符
   */
  separator?: string;

  /**
   * 是否显示到秒
   */
  showSecond?: boolean;
}

/**
 * 根据语言环境格式化时间
 *
 * @param date 时间
 * @param options 格式化选项
 * @returns 时间 JSX
 */
const formatDate = (
  date?:
    | dayjs.ConfigType
    | [dayjs.ConfigType]
    | [dayjs.ConfigType, dayjs.ConfigType],
  {
    timeZone = dayjs.tz.guess(),
    lang = 'zh',
    separator,
    showSecond = false,
  }: FormatDateOptions = {},
) => {
  const dateRange = (Array.isArray(date) ? date : [date]).map((date) =>
    dayjs(date).tz(timeZone),
  );

  const isInUS = () =>
    [
      'America/Los_Angeles',
      'America/Denver',
      'America/Chicago',
      'America/New_York',
    ].includes(timeZone);

  const formatTimeZone = () => {
    const utcOffset = dateRange[0].utcOffset() / 60;
    if (lang !== 'zh' && isInUS()) {
      return isDST(dateRange[0], timeZone)
        ? daylightTimeZoneMap[utcOffset]
        : standardTimeZoneMap[utcOffset];
    } else {
      return `UTC${utcOffset >= 0 ? '+' : ''}${utcOffset}`;
    }
  };

  const formatDateTemplate = {
    zh: separator ? `YYYY${separator}MM${separator}DD` : 'YYYY年MM月DD日',
    en: 'MMM DD, YYYY,',
  }[lang];

  const formatTimeTemplate = {
    zh: `HH:mm${showSecond ? ':ss' : ''}`,
    en: `hh:mm${showSecond ? ':ss' : ''} A`,
  }[lang];

  const formatDateTime = () => {
    if (dateRange.length === 1) {
      // 只有一个时间，不存在时间范围
      const baseDate = dateRange[0].format(formatDateTemplate);
      const baseTime = dateRange[0].format(formatTimeTemplate);
      return `${baseDate} ${baseTime}`;
    } else {
      const [before, after] = dateRange[0].isBefore(dateRange[1])
        ? [dateRange[0], dateRange[1]]
        : [dateRange[1], dateRange[0]];
      const startDate = before.format(formatDateTemplate);
      const startTime = before.format(formatTimeTemplate);
      const endDate = after.format(formatDateTemplate);
      const endTime = after.format(formatTimeTemplate);
      return startDate === endDate
        ? `${startDate} ${startTime} - ${endTime}`
        : `${startDate} ${startTime} - ${endDate} ${endTime}`;
    }
  };

  return (
    <>
      <span>{formatDateTime()}</span>
      <sup style={{ fontSize: 10 }}>{formatTimeZone()}</sup>
    </>
  );
};

export default formatDate;
