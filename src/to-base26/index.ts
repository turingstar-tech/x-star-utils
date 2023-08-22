/**
 * 26进制 A B C ... BA BB BC ...
 * @param num
 * @returns
 */
const toBase26 = (num: number) => {
  let tempNum = num;
  const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const ben = base.length;
  const arr = [];
  if (tempNum === 0) {
    return base[0];
  }
  while (tempNum > 0) {
    arr.push(base[tempNum % ben]);
    tempNum = Math.floor(tempNum / ben);
  }
  return arr.reverse().join('');
};
export default toBase26;
