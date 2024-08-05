# login

```
/**
 * 重定向用户到登录页面，并附带必要的查询参数
 *
 * @param options 登录选项，包括登录页面 URL、客户端 ID 和来源页面地址
 */
```

```jsx
import { useEffect } from 'react';
import { login } from 'x-star-utils';
export default () => {
  const loginUrl = 'https://example.com';
  const clientId = 'test123';
  const from = '/test';
  return (
    <button onClick={() => login({ loginUrl, clientId, from })}>登录</button>
  );
};
```

## API

```ts
interface LoginOptions {
  /**
   * 登录页面的 URL
   */
  loginUrl: string;

  /**
   * 分配给客户端的唯一标识符
   */
  clientId: string;

  /**
   * 登录请求的来源页面地址
   */
  from: string;
}
```
