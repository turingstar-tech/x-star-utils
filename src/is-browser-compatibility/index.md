# isBrowserCompatibility

```
/**
 * 判断浏览器是否兼容
 *
 * @param minBrowserVersions 最低版本号
 * @returns 是否兼容
 */
```

```jsx
import { isBrowserCompatibility } from 'x-star-utils';

export default () => {
  return (
    <>
      {isBrowserCompatibility({
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
