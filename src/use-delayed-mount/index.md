# useDelayedMount

```
/**
 * 控制组件是否挂载、是否可见的 Hook
 *
 * 当组件从不显示切换到显示时，应该先挂载组件，再将组件从不可见变成可见，以实现淡入效果
 *
 * 当组件从显示切换到不显示时，应该先将组件从可见变成不可见，再卸载组件，以实现淡出效果
 *
 * @param show 组件显示状态
 * @param delay 组件卸载延迟，一般与淡出效果时间相同
 * @returns 组件是否挂载、是否可见
 */
```

```jsx
import { useState } from 'react';
import { useDelayedMount } from 'x-star-utils';

export default () => {
  const [hover, setHover] = useState(false);
  const [mount, visible] = useDelayedMount(hover, 1000);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {mount && (
        <span
          style={{
            color: 'red',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s',
          }}
        >
          Don't{' '}
        </span>
      )}
      Hover me!
    </div>
  );
};
```
