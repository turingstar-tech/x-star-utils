import React, { Suspense, lazy } from 'react';

/**
 * 用 `React.Suspense` 包装的 `React.lazy`
 *
 * @param factory 加载函数
 * @param fallback 加载占位符
 * @returns 懒加载组件
 */
const wrappedLazy = <T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  fallback: React.ReactNode = <div>Loading...</div>,
) => {
  const LazyComponent = lazy(factory);
  const WrappedComponent = React.forwardRef<
    React.ComponentRef<T>,
    React.ComponentPropsWithoutRef<T>
  >((props, ref) => (
    <Suspense fallback={fallback}>
      <LazyComponent
        {...({ ref, ...props } as React.ComponentPropsWithRef<T>)}
      />
    </Suspense>
  ));
  return WrappedComponent;
};

export default wrappedLazy;
