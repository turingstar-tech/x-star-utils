# loginCallback

```
/**
 * 登录回调函数，处理 OAuth 登录回调
 *
 * @param options 登录回调选项
 */
```

```jsx
import { loginCallback } from 'x-star-utils';
import { useEffect, useState } from 'react';
export default () => {
  const [content, setContent] = useState('');
  useEffect(() => {
    const newParams = 'code=123456&state=abcdefgh/';
    const newUrl =
      window.location.origin + window.location.pathname + '?' + newParams;
    history.replaceState(null, '', newUrl);
    sessionStorage.setItem('login-state', 'abcdefgh/');

    loginCallback({
      login: async (params) => {
        // 模拟 login 函数
        setContent(
          (content) =>
            `${content} Mock login function called with params: ${JSON.stringify(
              params,
            )}`,
        );
        console.log('Mock login function called with params: ', params);
        return 'mockedToken123';
      },
      setToken: async (token) => {
        // 模拟 setToken 函数
        setContent(
          (content) =>
            `${content} -----> Mock setToken function called with token: ${token} ----->`,
        );
        console.log('Mock setToken function called with token: ', token);
      },
      navigate: (pathname) => {
        // 模拟 navigate 函数
        setContent((content) => `${content} Navigating to: ${pathname}`);
        console.log('Navigating to: ', pathname);
      },
    });
  }, []);
  return <div>{content}</div>;
};
```

## API

```ts
interface LoginCallbackOptions {
  /**
   * 登录函数，用于获取 token
   * @param params 包含授权码和重定向 URI 的对象
   * @returns token 字符串
   */
  login: (params: { code: string; redirect_uri: string }) => Promise<string>;

  /**
   * 设置 token 函数，用于将 token 保存到 Cookie 中
   * @param token 要保存的 token 字符串
   */
  setToken: (token: string) => Promise<void>;

  /**
   * 跳转函数，用于导航到指定路径
   * @param pathname 要导航到的路径
   */
  navigate: (pathname: string) => void;
}
```
