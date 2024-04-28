# wrappedLazy

```
/**
 * 用 `React.Suspense` 包装的 `React.lazy`
 *
 * @param factory 加载函数
 * @param fallback 加载占位符
 * @returns 懒加载组件
 */
```

```jsx
import { useRef } from 'react';
import { wrappedLazy } from 'x-star-utils';

const Component = wrappedLazy(
  () =>
    new Promise<any>((resolve) => {
      setTimeout(
        () =>
          resolve({
            default: React.forwardRef<HTMLDivElement, { text: string }>(
              ({ text }, ref) => <div ref={ref}>{text}</div>,
            ),
          }),
        1000,
      );
    }),
);

export default () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Component ref={ref} text="123" />
  );
};
```
