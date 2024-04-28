import React, { Suspense, lazy } from 'react';

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
