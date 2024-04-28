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
      <div>{formatDate(undefined, { lang })}</div>
      <div>{formatDate('2024-04-28T01:15:00Z', { lang, separator: '/' })}</div>
      <div>
        {formatDate([1713922083000, 1714008483000], {
          timeZone: 'America/New_York',
          lang,
          separator: '-',
          dateRangeSeparator: '~',
          showSecond: true,
        })}
      </div>
      <div>
        {formatDate([1714289899000, 1714300699000], {
          timeZone: 'America/New_York',
          lang,
          separator: '-',
          showDate: false,
        })}
      </div>
      <div>
        {formatDate([1714316400000, 1714323600000], {
          lang,
          separator: '-',
          showDate: false,
        })}
      </div>
      <div>
        {formatDate(1714289899000, {
          timeZone: 'America/New_York',
          lang,
          separator: '-',
          showDate: false,
        })}
      </div>
    </>
  );
};
```
