# isBrowserCompatibility

主流浏览器兼容检测函数

```
/**
 *
 * @param minBrowserVersion
  ie?: string;
  firefox?: string;
  chrome?: string;
  fxios?: string;
  crios?: string;
  opera?: string;
  safari?: string;
 * @returns 浏览器是否兼容
 */

 默认版本检测
 minBrowserVersion: SysInterface = {
  ie: '9999.0',
  firefox: '80.0',
  chrome: '88.0',
  fxios: '80.0',
  crios: '88.0',
  opera: '80.0',
  safari: '14.1',
 }
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
      }) ? (
        <div>{'该浏览器通过了兼容性检测'}</div>
      ) : (
        <div>{'该浏览器未通过兼容性检测'}</div>
      )}
    </>
  );
};
```
