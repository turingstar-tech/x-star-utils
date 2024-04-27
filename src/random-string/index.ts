/**
 * 生成随机的字符串
 *
 * @param length 字符串长度
 * @returns 随机字符串
 */
const randomString = (length: number) => {
  const chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return Array.from({ length })
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join('');
};

export default randomString;
