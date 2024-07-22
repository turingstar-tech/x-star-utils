# login

```
login函数的作用是处理登录，并调用相应的函数来处理登录逻辑。
/**
 * @description 登录
 * @param  from 登录前页面
 * @param  baseUrl 登录回调地址
 * @param  appID 应用ID
 * @param  idAPI 登录地址
 */
```

```jsx
import { login } from 'x-star-utils';
import { useEffect } from 'react';
export default () => {
  const from = '/test';
  useEffect(() => {
    const baseUrl = 'http://localhost:8001';
    const appID = 'test123';
    const idAPI = 'https://example.com';

    login({ from, baseUrl, appID, idAPI });
  }, [from]);
  return <></>;
};
```
