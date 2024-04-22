# formatDate

日期根据语言环境统一格式化

```
/**
 * 选择语言
 * @param lang 语言
 * @param date 日期
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
          region: 'US',
        })}
      </div>
    </>
  );
};
```
