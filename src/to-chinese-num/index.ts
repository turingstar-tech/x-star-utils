/**
 * 将数字转换成中文表示，处理到万级别
 *
 * `toChineseNum(12345)` 返回`一万二千三百四十五`
 *
 * @param value 数字
 * @returns 中文表示
 */
const toChineseNum = (value: number | string) => {
  const chars = '零一二三四五六七八九';
  const units = ['', '十', '百', '千', '万'];

  const num = Number(value);

  if (num >= 100000) {
    throw new Error('只支持十万以下的数字转换');
  }

  if (num === 0) {
    return chars[0];
  }

  const convert = (num: number) =>
    num
      .toString()
      .split('')
      .reverse()
      .reduce((prev, digit, index) => {
        if (digit !== '0') {
          return `${chars[digit as unknown as number]}${units[index]}${prev}`;
        }
        if (prev && prev[0] !== chars[0]) {
          return `${chars[0]}${prev}`;
        }
        return prev;
      }, '');

  if (num >= 10 && num < 20) {
    return `${units[1]}${convert(num % 10)}`;
  }

  return convert(num);
};

export default toChineseNum;
