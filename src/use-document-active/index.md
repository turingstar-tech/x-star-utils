# useDocumentActive

判断页面是否处于活动状态。

```jsx
import { useDocumentActive } from 'x-star-utils';

export default () => {
  const active = useDocumentActive();

  return <>Active: {active ? 'true' : 'false'}</>;
};
```
