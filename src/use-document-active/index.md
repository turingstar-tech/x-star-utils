# useDocumentActive

```
/**
 * 判断页面是否处于活动状态
 *
 * 用 `document.visibilityState` 和 `visibilitychange` 事件判断页面是否可见
 *
 * 用 `document.hasFocus()`、`focus` 和 `blur` 事件判断页面是否有焦点
 *
 * 如果页面可见且有焦点，则页面处于活动状态
 *
 * @returns 是否处于活动状态
 */
```

```jsx
import { useDocumentActive } from 'x-star-utils';

export default () => {
  const active = useDocumentActive();

  return <>Active: {active ? 'true' : 'false'}</>;
};
```
