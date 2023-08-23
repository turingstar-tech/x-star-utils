# useCurrentTimeDayjs

计时函数，从 startTime 时间开始，每隔 delay 毫秒返回一次当前时间。

如果当前时间 > 结束时间，返回结束时间，并终止计时

没有结束时间：表示计时永不结束

```
/**
 * @description 计时函数，从startTime时间开始，每隔delay毫秒返回一次当前时间。
 * 如果当前时间 > 结束时间，返回结束时间，并终止计时
 * 没有结束时间：表示计时永不结束
 * @param {number} delay:延迟时间
 * @param {number} startTime:计时开始的时间 时间戳 （秒）
 * @param {number} endTime?:计时结束的时间 时间戳（秒）
 */
```

```jsx
import { useState } from 'react';
import dayjs from 'dayjs';
import { useCurrentTimeDayjs } from 'x-star-utils';
export default () => {
  const [currentTimeDayjs, stop] = useCurrentTimeDayjs(
    1000,
    dayjs().unix(),
    dayjs().unix() + 1000,
  );
  return <div>{currentTimeDayjs.format('YYYY-MM-DD HH:mm:ss')}</div>;
};
```
