# formatDate

日期根据语言环境统一格式化

```
/**
 * 选择语言
 * @param lang 语言
 * @param dateRange 日期范围
 * @param separatorCH 中文环境下年月日分隔符
 * @returns React.ReactNode
 */
```

```jsx
import { useState } from 'react';
import { formatDate } from 'x-star-utils';
export default () => {
  const [lang, setLang] = useState('zh');
  return (
    <>
      <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}>
        {'切换语言'}
      </button>
      <div>
        {formatDate({
          lang: lang,
          dateRange: [new Date()],
        })}
      </div>
      <div>
        {formatDate({
          lang: lang,
          dateRange: [1713922083000, 1714008483000],
          separatorCH: '-',
        })}
      </div>
    </>
  );
};
```
