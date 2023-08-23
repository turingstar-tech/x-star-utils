/**
 * 生成随机的字符串
 * @param len
 * @returns
 */
const randomString = (len: number) => {
  const chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return [...new Array(len)]
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join('');
};
export default randomString;
