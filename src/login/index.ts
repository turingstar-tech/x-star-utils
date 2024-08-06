import randomString from '../random-string';

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

/**
 * 重定向用户到登录页面，并附带必要的查询参数
 *
 * @param options 登录选项，包括登录页面 URL、客户端 ID 和来源页面地址
 */
const login = ({ loginUrl, clientId, from }: LoginOptions) => {
  // 生成一个随机状态字符串用于防止 CSRF 攻击，并存储在 sessionStorage 中
  const state = `${randomString(8)}${from}`;
  sessionStorage.setItem('login-state', state);

  // 创建登录页面的 URL，并添加查询参数
  const url = new URL(loginUrl);
  const params = url.searchParams;
  params.append('response_type', 'code'); // 指定 OAuth 2.0 授权类型
  params.append('client_id', clientId); // 客户端 ID
  params.append('redirect_uri', `${location.origin}/login/callback`); // 登录成功后的重定向 URI
  params.append('state', state); // 用于防止 CSRF 攻击的状态参数

  // 重定向到带有查询参数的登录页面
  location.replace(url);
};

export default login;
