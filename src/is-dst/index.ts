import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 判断时间是否为夏令时
 *
 * @param date 时间，默认为当前时间
 * @param timeZone 时区，默认为 `dayjs.tz.guess()`
 * @returns 是否为夏令时
 */
const isDST = (date?: dayjs.ConfigType, timeZone = dayjs.tz.guess()) => {
  const baseDate = dayjs(date).tz(timeZone);

  // 找出两个时间保证它们不管在南北半球都是不同的令时
  const Jan1 = dayjs().tz(timeZone).startOf('year');
  const Jul1 = dayjs().tz(timeZone).month(6).startOf('month');

  return (
    // 北半球夏令时
    baseDate.utcOffset() > Jan1.utcOffset() ||
    // 南半球夏令时
    baseDate.utcOffset() > Jul1.utcOffset()
  );
};

export default isDST;
