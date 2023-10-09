//完成将 toChineseNum， 可以将数字转换成中文大写的表示，处理到万级别，例如 toChineseNum(12345)，返回 一万二千三百四十五。
/**
 *
 * @param originNum
 * @returns
 */
const toChineseNum = (originNum: number | string) => {
  let num = originNum;
  const changeNum = [
    '零',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
  ]; //changeNum[0] = "零"
  const unit = ['', '十', '百', '千', '万'];
  if (typeof num === 'string') num = parseInt(num);
  const getWan = (temp: string | number) => {
    const strArr = temp.toString().split('').reverse();
    let newNum = '';
    for (let i = 0; i < strArr.length; i++) {
      newNum =
        (i === 0 && strArr[i] === '0'
          ? ''
          : i > 0 && strArr[i] === '0' && strArr[i - 1] === '0'
          ? ''
          : changeNum[strArr[i] as unknown as number] +
            (strArr[i] === '0' ? unit[0] : unit[i])) + newNum;
    }
    return newNum;
  };
  const overWan = Math.floor(num / 10000);
  let noWan = (num % 10000).toString();
  if (noWan.toString().length < 4) noWan = '0' + noWan;
  return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num);
};
export default toChineseNum;
