/**
 * 根据语言选择文本
 *
 * @param lang 语言
 * @param zhText 中文文本
 * @param enText 英文文本
 * @returns 对应语言的文本
 */
const getTransResult = (
  lang: 'zh' | 'en',
  zhText: string | undefined,
  enText: string | undefined,
) => (lang === 'zh' ? zhText || enText : enText || zhText) ?? '';

export default getTransResult;
