# toBase26

```
/**
 * 将数字转换成 26 进制的字母字符串
 *
 * A B C ... AA AB AC ... BA BB BC ...
 *
 * @param num 数字
 * @returns 字母字符串
 */
```

```jsx
import { toBase26 } from 'x-star-utils';

export default () => (
  <div style={{ display: 'flex', gap: 12 }}>
    <span>{toBase26(0)}</span>
    <span>{toBase26(26)}</span>
    <span>{toBase26(27)}</span>
  </div>
);
```
