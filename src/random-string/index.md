# randomString

```
/**
 * 生成随机的字符串
 *
 * @param length 字符串长度
 * @returns 随机字符串
 */
```

```jsx
import { randomString } from 'x-star-utils';

export default () => (
  <div style={{ display: 'flex', gap: 12 }}>
    <span>{randomString(8)}</span>
    <span>{randomString(4)}</span>
  </div>
);
```
