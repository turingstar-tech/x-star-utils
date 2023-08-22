/**
 * 选择语言
 * @param lang 语言
 * @param zhText 中文字段
 * @param enText 英文字段
 * @returns string
 */
const getTransResult = (
  lang: 'zh' | 'en',
  zhText: string | undefined,
  enText: string | undefined,
) => {
  if (zhText === undefined && enText === undefined) return '';
  if (lang === 'zh') return zhText ? zhText : enText;
  else return enText ? enText : zhText;
};
export default getTransResult;
