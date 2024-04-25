import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

// 判断是否为夏令时
const isDST = (
  base?: string | number | Date | dayjs.Dayjs | null | undefined,
) => {
  const date = dayjs.tz(base);
  const Jan1 = dayjs.tz().startOf('year'); // 找出两个时间保证它们不管在南北半球都是不同的令时
  const Jul1 = dayjs.tz().month(6).startOf('month');

  return (
    // 北半球夏令时
    date.utcOffset() > Jan1.utcOffset() ||
    // 南半球夏令时
    date.utcOffset() > Jul1.utcOffset()
  );
};

export default isDST;
