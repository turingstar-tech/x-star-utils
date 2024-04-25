# formatDate

```
/**
 * 根据语言环境格式化时间
 *
 * @param date 时间
 * @param options 格式化选项
 * @returns 时间 JSX
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
