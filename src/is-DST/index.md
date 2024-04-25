# isDST

判断是否夏令时

```
/**
 * 判断是否夏令时
 * @param Date | Dayjs | string | number | undefined
 * @returns boolean
 */
```

```jsx
import { useState } from 'react';
import { isDST } from 'x-star-utils';
export default () => {
  return <div>当前时间是否为夏令时:{isDST().toString()}</div>;
};
```
