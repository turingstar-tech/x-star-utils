import dayjs from 'dayjs';

//判断是否为夏令时
const isDST = (
  base?: string | number | dayjs.Dayjs | Date | null | undefined,
) => {
  const date = dayjs(base);
  const Jan1 = dayjs().startOf('year'); // 找出两个时间保证它们不管在南北半球都是不同的令时
  const Jul1 = dayjs().month(6).date(1);

  return (
    // 北半球夏令时
    (Jan1.utcOffset() > Jul1.utcOffset() &&
      date.utcOffset() !== Jan1.utcOffset()) ||
    // 南半球夏令时
    (Jan1.utcOffset() < Jul1.utcOffset() &&
      date.utcOffset() !== Jul1.utcOffset())
  );
};

export default isDST;
