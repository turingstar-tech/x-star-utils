# isDST

```
/**
 * 判断时间是否为夏令时
 *
 * @param date 时间，默认为当前时间
 * @param timeZone 时区，默认为 `dayjs.tz.guess()`
 * @returns 是否为夏令时
 */
```

```jsx
import { useState } from 'react';
import { isDST } from 'x-star-utils';

export default () => {
  return (
    <>
      <div>当前时区时间是否为夏令时:{isDST().toString()}</div>
      <div>
        美国2024-7-1是否为夏令时:
        {isDST(1719763200000, 'America/New_York').toString()}
      </div>
      <div>
        澳大利亚2024-7-1是否为夏令时:
        {isDST(1719763200000, 'Australia/Sydney').toString()}
      </div>
      <div>
        美国2024-12-1是否为夏令时:
        {isDST(1732982400000, 'America/New_York').toString()}
      </div>
      <div>
        澳大利亚2024-12-1是否为夏令时:
        {isDST(1732982400000, 'Australia/Sydney').toString()}
      </div>
    </>
  );
};
```
