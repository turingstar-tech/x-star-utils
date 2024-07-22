# loginCallback

```
loginCallback函数是一个用于处理登录回调的函数。
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
    sessionStorage.setItem('local-state', 'abcdefgh/');

    loginCallback({
      login: async (params_0) => {
        // 模拟 login 函数
        setContent(
          (content) =>
            `${content}Mock login function called with params:${params_0}`,
        );
        console.log('Mock login function called with params:', params_0);
        return 'mockedToken123';
      },
      setToken: async (token) => {
        // 模拟 setToken 函数
        setContent(
          (content) =>
            `${content}----->Mock setToken function called with token:${token}----->`,
        );
        console.log('Mock setToken function called with token:', token);
      },
      navigate: (pathname) => {
        // 模拟 navigate 函数
        setContent((content) => `${content}Navigating to:${pathname}`);
        console.log('Navigating to:', pathname);
      },
      baseUrl: 'https://example.com',
    });
  }, []);
  return <div>{content}</div>;
};
```
