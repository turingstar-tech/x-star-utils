# useResponsive

```
/**
 * 判断媒体查询是否匹配
 *
 * 可以使用某些字符串匹配屏幕宽度
 *
 * | 字符串 |        屏幕限制        |
 * | :----: | :--------------------: |
 * |   xs   |      宽度 < 576px      |
 * |   sm   |     宽度 >= 576px      |
 * |   md   |     宽度 >= 768px      |
 * |   lg   |     宽度 >= 992px      |
 * |   xl   |     宽度 >= 1200px     |
 * |  xxl   |     宽度 >= 1600px     |
 * |   mb   |     宽度 <= 575px      |
 * |  iPad  | 576px <= 宽度 <= 991px |
 * |   pc   |     宽度 >= 992px      |
 *
 * @param query 查询字符串
 * @returns 是否匹配
 */
```

```jsx
import { useResponsive } from 'x-star-utils';

export default () => {
  const isMobile = useResponsive('xs');
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
