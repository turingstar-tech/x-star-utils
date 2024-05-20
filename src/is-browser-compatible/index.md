# isBrowserCompatible

```
/**
 * 判断浏览器是否兼容
 *
 * @param browserCompatibility 浏览器最低版本号
 * @returns 当前浏览器是否兼容
 */
```

```jsx
import { isBrowserCompatible } from 'x-star-utils';

export default () => {
  return (
    <>
      {isBrowserCompatible({
        ie: '9999.0',
        firefox: '80.0',
        chrome: '88.0',
        crios: '88.0',
        fxios: '80.0',
        opera: '80.0',
        safari: '14.1',
        wechat: '8.0',
      }) ? (
        <div>{'该浏览器通过了兼容性检测'}</div>
      ) : (
        <div>{'该浏览器未通过兼容性检测'}</div>
      )}
    </>
  );
};
```
