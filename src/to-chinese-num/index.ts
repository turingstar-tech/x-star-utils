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

  if (num === 0) {
    return '零';
  } else if (num > 99999) {
    throw new Error('只支持十万以下的数字转换');
  }

  const getWan = (temp: string | number) => {
    const strArr = temp.toString().split('').reverse();
    let newNum = '';
    for (let i = 0; i < strArr.length; i++) {
      if (strArr[i] === '0') {
        if (i > 0 && strArr[i - 1] !== '0') {
          newNum = changeNum[strArr[i] as unknown as number] + newNum;
        }
      } else {
        newNum = changeNum[strArr[i] as unknown as number] + unit[i] + newNum;
      }
    }
    return newNum;
  };

  if (num >= 10 && num < 20) {
    return '十' + getWan(num % 10);
  } else {
    return getWan(num);
  }
};

export default toChineseNum;
