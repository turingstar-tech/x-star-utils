# useResponsive

```
/**
 * 传入的参数只能是xs | sm | md | lg | xl | xxl
 * 默认参数是xs 即返回 <= 575px
 * xs 屏幕 <= 575px
 * sm 屏幕 >= 576px
 * md 屏幕 >= 768px
 * lg 屏幕 >= 992px
 * xl 屏幕 >= 1200px
 * xxl 屏幕 >= 1600px
 * mb 屏幕 <= 575px
 * iPad 576px <= 屏幕 <= 991px
 * pc 屏幕 >= 992px
 * @returns boolean
 */
```

```jsx
import { useResponsive } from 'x-star-utils';

export default () => {
  const isMobile = useResponsive();
  const isiPad = useResponsive('iPad');
  const isPC = useResponsive('pc');
  return (
    <div>
      {isMobile && <div>Only displayed on mobile</div>}
      {isiPad && <div>Only displayed on iPad</div>}
      {isPC && <div>Only displayed on PC</div>}
    </div>
  );
};
```
