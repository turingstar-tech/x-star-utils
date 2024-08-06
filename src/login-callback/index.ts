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

/**
 * 登录回调函数，处理 OAuth 登录回调
 *
 * @param options 登录回调选项
 */
const loginCallback = async ({
  login,
  setToken,
  navigate,
}: LoginCallbackOptions) => {
  // 从 URL 查询参数中获取授权码和状态值
  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const state = params.get('state');

  // 检查授权码和状态值是否存在，并且状态值是否匹配
  if (!code || !state || state !== sessionStorage.getItem('login-state')) {
    // 如果校验失败，跳转到 403 页面
    navigate('/403');
    return;
  }

  // 调用登录函数获取 token
  const token = await login({
    code,
    redirect_uri: `${location.origin}/login/callback`,
  });

  // 将 token 保存到 Cookie 中
  await setToken(token);

  // 从状态值中提取原始路径并进行导航
  navigate(state.slice(8));
};

export default loginCallback;
