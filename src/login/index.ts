import randomString from '../random-string';

interface LoginProps {
  from: string;
  clientId: string;
  loginUrl: string;
}
/**
 * @description 登录
 * @param  from 登录前页面
 * @param  baseUrl 登录回调地址
 * @param  clientId 应用ID
 * @param  idAPI 登录地址
 */
const login = async ({ from, clientId, loginUrl }: LoginProps) => {
  const state = `${randomString(8)}${from}`;
  sessionStorage.setItem('local-state', state);
  const params = new URLSearchParams();
  params.append('response_type', 'code');
  params.append('state', state);
  params.append('redirect_uri', `${location.origin}/login/callback`);
  params.append('client_id', `${clientId}`);
  location.replace(`${loginUrl}?${params}`);
};
export default login;
