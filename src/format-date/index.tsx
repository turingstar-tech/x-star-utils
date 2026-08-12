import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import isDST from '../is-dst';

dayjs.extend(utc);
dayjs.extend(timezone);

enum StandardTimeZone {
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

enum DaylightTimeZone {
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

/**
 * 特殊时区规则：不参与夏令时/冬令时切换，固定使用指定缩写
 */
const SPECIAL_TIME_ZONE_RULES: Record<string, string> = {
  'America/Phoenix': 'MST', // 亚利桑那大部分地区无夏令时
};

/**
 * 美国本土使用 PST/PDT、MST/MDT、CST/CDT、EST/EDT 缩写的 IANA 时区
 * （不含 Alaska / Hawaii，其缩写不在上述映射中；特殊规则时区见 SPECIAL_TIME_ZONE_RULES）
 */
const US_TIME_ZONES = [
  // Pacific
  'America/Los_Angeles',
  // Mountain
  'America/Denver',
  'America/Boise',
  // Central
  'America/Chicago',
  'America/Indiana/Knox',
  'America/Indiana/Tell_City',
  'America/Menominee',
  'America/North_Dakota/Beulah',
  'America/North_Dakota/Center',
  'America/North_Dakota/New_Salem',
  // Eastern
  'America/New_York',
  'America/Detroit',
  'America/Indiana/Indianapolis',
  'America/Indiana/Marengo',
  'America/Indiana/Petersburg',
  'America/Indiana/Vevay',
  'America/Indiana/Vincennes',
  'America/Indiana/Winamac',
  'America/Kentucky/Louisville',
  'America/Kentucky/Monticello',
];

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
   * 中文环境下日期格式分隔符
   */
  separator?: string;

  /**
   * 时间范围指示符
   */
  durationIndicator?: string;

  /**
   * 是否显示日期
   */
  showDate?: boolean;

  /**
   * 是否显示星期几
   */
  showDayOfWeek?: boolean;

  /**
   * 是否替换星期几为 `工作日`
   */
  isWeekDay?: boolean;

  /**
   * 是否显示秒
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
    durationIndicator = '-',
    showDate = true,
    showDayOfWeek = false,
    showSecond = false,
    isWeekDay = false,
  }: FormatDateOptions = {},
) => {
  const dateRange = (Array.isArray(date) ? date : [date]).map((date) =>
    dayjs(date)
      .tz(timeZone)
      .locale(lang === 'zh' ? 'zh-cn' : 'en'),
  );

  const isInUS = () => US_TIME_ZONES.includes(timeZone);

  const formatTimeZone = (baseDate: dayjs.Dayjs) => {
    const specialTz = SPECIAL_TIME_ZONE_RULES[timeZone];
    if (specialTz) {
      return specialTz;
    }

    const utcOffset = baseDate.utcOffset() / 60;
    if (isInUS()) {
      return isDST(baseDate, timeZone)
        ? daylightTimeZoneMap[utcOffset]
        : standardTimeZoneMap[utcOffset];
    } else {
      return `UTC${utcOffset >= 0 ? '+' : ''}${utcOffset}`;
    }
  };

  const renderTimeZoneSup = (tz: string) => (
    <sup style={{ fontSize: 10 }}>{tz}</sup>
  );

  const formatDateTemplate = {
    zh: isWeekDay
      ? '[ 工作日]'
      : showDate
      ? `${separator ? `YYYY${separator}MM${separator}DD` : 'YYYY年MM月DD日'}${
          showDayOfWeek ? ' ddd' : ''
        }`
      : 'ddd',
    en: isWeekDay
      ? '[Weekday, ]'
      : showDate
      ? `${showDayOfWeek ? 'ddd, ' : ''}MMM DD, YYYY,`
      : 'ddd,',
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
      const content =
        showDate || showDayOfWeek ? `${baseDate} ${baseTime}` : baseTime;
      return (
        <>
          <span>{content}</span>
          {renderTimeZoneSup(formatTimeZone(dateRange[0]))}
        </>
      );
    } else {
      const [before, after] = dateRange[0].isBefore(dateRange[1])
        ? [dateRange[0], dateRange[1]]
        : [dateRange[1], dateRange[0]];
      const startDate = before.format(formatDateTemplate);
      const startTime = before.format(formatTimeTemplate);
      const endDate = after.format(formatDateTemplate);
      const endTime = after.format(formatTimeTemplate);
      const startTz = formatTimeZone(before);
      const endTz = formatTimeZone(after);
      const crossTimeZone = startTz !== endTz;

      if (startDate === endDate) {
        // 在同一天
        const prefix = showDate || showDayOfWeek ? `${startDate} ` : '';
        if (crossTimeZone) {
          return (
            <>
              <span>
                {prefix}
                {startTime}
              </span>
              {renderTimeZoneSup(startTz)}
              <span>
                {' '}
                {durationIndicator} {endTime}
              </span>
              {renderTimeZoneSup(endTz)}
            </>
          );
        }
        return (
          <>
            <span>
              {prefix}
              {startTime} {durationIndicator} {endTime}
            </span>
            {renderTimeZoneSup(startTz)}
          </>
        );
      } else {
        // 不在同一天
        const daysDiff = after
          .startOf('day')
          .diff(before.startOf('day'), 'day');
        if (showDate || showDayOfWeek) {
          if (crossTimeZone) {
            return (
              <>
                <span>
                  {startDate} {startTime}
                </span>
                {renderTimeZoneSup(startTz)}
                <span>
                  {' '}
                  {durationIndicator} {endDate} {endTime}
                </span>
                {renderTimeZoneSup(endTz)}
              </>
            );
          }
          return (
            <>
              <span>
                {startDate} {startTime} {durationIndicator} {endDate} {endTime}
              </span>
              {renderTimeZoneSup(startTz)}
            </>
          );
        }
        if (crossTimeZone) {
          return (
            <>
              <span>{startTime}</span>
              {renderTimeZoneSup(startTz)}
              <span>
                {' '}
                {durationIndicator} {endTime} (+{daysDiff}{' '}
                {lang === 'zh' ? '天' : daysDiff > 1 ? 'days' : 'day'})
              </span>
              {renderTimeZoneSup(endTz)}
            </>
          );
        }
        return (
          <>
            <span>
              {startTime} {durationIndicator} {endTime} (+{daysDiff}{' '}
              {lang === 'zh' ? '天' : daysDiff > 1 ? 'days' : 'day'})
            </span>
            {renderTimeZoneSup(startTz)}
          </>
        );
      }
    }
  };

  return formatDateTime();
};

export default formatDate;
