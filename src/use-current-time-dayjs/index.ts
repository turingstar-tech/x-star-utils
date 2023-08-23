import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
dayjs.extend(utc);
/**
 * @description 计时函数，从startTime时间开始，每隔delay毫秒返回一次当前时间。
 * 如果当前时间 > 结束时间，返回结束时间，并终止计时
 * 没有结束时间：表示计时永不结束
 * @param {number} delay:延迟时间
 * @param {number} startTime:计时开始的时间 时间戳 （秒）
 * @param {number} endTime?:计时结束的时间 时间戳（秒）
 */
const useCurrentTimeDayjs = (
  delay: number,
  startTime: number,
  endTime: number,
) => {
  const preTime = useRef(window.performance.now());
  const stopFrame = useRef<number>();
  // 开始时间
  const [startTimeDayjs, setStartTimeDayjs] = useState<Dayjs>(
    startTime ? dayjs.unix(startTime) : dayjs(),
  );
  // 结束时间
  const [endTimeDayjs, setEndTimeDayjs] = useState<Dayjs>(
    endTime
      ? dayjs.unix(endTime)
      : dayjs('2099-01-01 00:00:00').utcOffset(480, true).local(),
  );
  // 初次调用函数时的时候
  const [firstTime, setFirstTime] = useState<number>(
    Math.floor(window.performance.now()),
  );
  // 返回的当前时间
  const [currentTimeDayjs, setCurrentTimeDayjs] =
    useState<Dayjs>(startTimeDayjs);
  //  计时函数
  const func = (originTimestamp: number) => {
    let timestamp = Math.floor(originTimestamp);
    stopFrame.current = window.requestAnimationFrame(func);
    if (timestamp - preTime.current > delay) {
      preTime.current = timestamp;
      setCurrentTimeDayjs(dayjs(+startTimeDayjs + (timestamp - firstTime)));
    }
  };
  // 停止计时
  const stop = () => {
    if (stopFrame.current) {
      window.cancelAnimationFrame(stopFrame.current);
    }
  };
  // 页面 切换为活动状态时，开始计时
  const delayFunc = _.throttle(() => {
    if (document.visibilityState === 'visible') {
      stop();
      stopFrame.current = window.requestAnimationFrame(func);
    }
  }, 1000);

  // 当开始时间，修改时，重新计算计时
  useEffect(() => {
    setFirstTime(Math.floor(window.performance.now()));
    setStartTimeDayjs(dayjs.unix(startTime));
  }, [startTime]);
  // 结束时间修改
  useEffect(() => {
    setEndTimeDayjs(dayjs.unix(endTime));
  }, [endTime]);
  // 开始计时，和关闭计时
  useEffect(() => {
    if (+endTimeDayjs <= +currentTimeDayjs) {
      return;
    }
    window.document.onvisibilitychange = delayFunc;
    stopFrame.current = window.requestAnimationFrame(func);
    return () => {
      stop();
    };
  });
  // 如果当前时间大于目标结束时间，直接返回目标结束时间
  return +currentTimeDayjs >= +endTimeDayjs
    ? ([endTimeDayjs, stop] as [Dayjs, () => void])
    : ([currentTimeDayjs, stop] as [Dayjs, () => void]);
};

export default useCurrentTimeDayjs;
