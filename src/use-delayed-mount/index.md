# useDelayedMount

This is an example hook.

```jsx
import { useState } from 'react';
import { useDelayedMount } from 'x-star-utils';

export default () => {
  const [hover, setHover] = useState(false);
  const [mount, visible] = useDelayedMount(hover, 1000);

  return (
    <>
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
      <span
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Hover me!
      </span>
    </>
  );
};
```
