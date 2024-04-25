import type { ConfigType } from 'dayjs';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 判断时间是否为夏令时
 *
 * @param base 时间
 * @returns 是否为夏令时
 */
const isDST = (base?: ConfigType) => {
  const date = dayjs.tz(base);

  // 找出两个时间保证它们不管在南北半球都是不同的令时
  const Jan1 = dayjs.tz().startOf('year');
  const Jul1 = dayjs.tz().month(6).startOf('month');

  return (
    // 北半球夏令时
    date.utcOffset() > Jan1.utcOffset() ||
    // 南半球夏令时
    date.utcOffset() > Jul1.utcOffset()
  );
};

export default isDST;
