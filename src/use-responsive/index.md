# useResponsive

```
/**
 * 判断媒体查询是否匹配
 *
 * 可以使用某些字符串匹配屏幕宽度
 *
 * | 字符串  |       屏幕限制        |
 * | :-----: | :-------------------: |
 * |   xs    |     宽度 < 576px      |
 * |   sm    |     宽度 >= 576px     |
 * |   md    |     宽度 >= 768px     |
 * |   lg    |     宽度 >= 992px     |
 * |   xl    |    宽度 >= 1200px     |
 * |   xxl   |    宽度 >= 1600px     |
 * |  phone  |     宽度 < 576px      |
 * | tablet  | 576px <= 宽度 < 992px |
 * | desktop |     宽度 >= 992px     |
 *
 * @param query 查询字符串
 * @returns 是否匹配
 */
```

```jsx
import { useResponsive } from 'x-star-utils';

export default () => {
  const isPhone = useResponsive('phone');
  const isTablet = useResponsive('tablet');
  const isDesktop = useResponsive('desktop');
  return (
    <div>
      {isPhone && <div>Only displayed on phone</div>}
      {isTablet && <div>Only displayed on tablet</div>}
      {isDesktop && <div>Only displayed on desktop</div>}
    </div>
  );
};
```
