# isDST

```
/**
 * 判断时间是否为夏令时
 *
 * @param base 时间
 * @returns 是否为夏令时
 */
```

```jsx
import { useState } from 'react';
import { isDST } from 'x-star-utils';
export default () => {
  return <div>当前时间是否为夏令时:{isDST().toString()}</div>;
};
```
