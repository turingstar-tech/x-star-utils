/**
 * 根据语言在文本后面加上冒号
 *
 * @param lang 语言
 * @param text 文本
 * @returns 带冒号的文本
 */
const getDescription = (lang: 'zh' | 'en', text: string | undefined) =>
  `${text ?? ''}${lang === 'zh' ? '：' : ': '}`;

export default getDescription;
