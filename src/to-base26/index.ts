/**
 * 将数字转换成 26 进制的字母字符串
 *
 * A B C ... AA AB AC ... BA BB BC ...
 *
 * @param num 数字
 * @returns 字母字符串
 */
const toBase26 = (num: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (num === 0) {
    return chars[0];
  }
  const result = [];
  for (let tmp = num; tmp > 0; tmp = Math.floor(tmp / chars.length)) {
    result.unshift(chars[tmp % chars.length]);
  }
  return result.join('');
};

export default toBase26;
