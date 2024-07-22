interface LoginCallbackProps {
  login: (params_0: {
    code: string;
    redirect_uri: string;
    xmode?: 'notredirect';
  }) => Promise<string>;
  setToken: (token: string) => Promise<void>;
  navigate: (pathname: string) => void;
  baseUrl: string;
}
/**
 * @description 登录回调
 * @param  login 登录函数
 * @param  setToken 设置token函数
 * @param  navigate 跳转函数
 * @param  baseUrl 登录地址
 */
const loginCallback = async ({
  login,
  setToken,
  navigate,
  baseUrl,
}: LoginCallbackProps) => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code') || '';
  const state = urlParams.get('state') || '';
  const originalState = sessionStorage.getItem('local-state');

  if (state !== originalState) {
    navigate('/403');
    return;
  }
  const token = await login({
    code,
    redirect_uri: `${baseUrl}/login/callback`,
  });
  await setToken(token);
  navigate(originalState.slice(8));
};
export default loginCallback;
