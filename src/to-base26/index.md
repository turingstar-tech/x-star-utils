# toBase26

将数组转化为 26 进制 A B C ... BA BB BC ...

```
/**
 * 26进制 A B C ... BA BB BC ...
 * @param num
 * @returns
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
