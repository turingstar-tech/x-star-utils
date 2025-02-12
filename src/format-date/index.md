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
      <div>
        {formatDate('2024-04-28T01:15:00Z', {
          lang,
          separator: '/',
          showDayOfWeek: true,
          showSecond: true,
        })}
      </div>
      <div>
        {formatDate('2024-04-28T01:15:00Z', {
          lang,
          showDayOfWeek: true,
          showSecond: true,
          showDate: false,
        })}
      </div>
      <div>
        {formatDate(['2024-04-28T01:15:00Z', '2024-04-28T03:15:00Z'], {
          lang,
          showDayOfWeek: true,
          showSecond: true,
          showDate: false,
        })}
      </div>
      <div>
        {formatDate(['2024-04-28T01:15:00Z', '2024-04-29T03:15:00Z'], {
          lang,
          showDayOfWeek: true,
          showSecond: true,
          showDate: false,
        })}
      </div>
      <div>
        {formatDate(['2024-04-28T01:15:00Z', '2024-04-28T13:15:00Z'], {
          lang,
          showSecond: true,
        })}
      </div>
      <div>
        {formatDate([1713922083000, 1714008483000], {
          timeZone: 'America/New_York',
          lang,
          separator: '-',
          durationIndicator: '~',
          showDayOfWeek: true,
        })}
      </div>
      <div>
        {formatDate([1714289899000, 1714300699000], {
          timeZone: 'America/New_York',
          lang,
          showDate: false,
        })}
      </div>
      <div>
        {formatDate([1714316400000, 1714323600000], { lang, showDate: false })}
      </div>
      <div>
        {formatDate(1714289899000, {
          timeZone: 'America/New_York',
          lang,
          showDate: false,
        })}
      </div>
      <div>
        {formatDate(['2024-09-29T00:00:00.000Z', '2024-12-15T02:00:00.000Z'], {
          lang,
          showDate: false,
          showDayOfWeek: true,
        })}
      </div>
      <div>
        {formatDate(['2024-09-28T22:00:00.000Z', '2024-12-15T00:00:00.000Z'], {
          lang,
          showDate: false,
          showDayOfWeek: true,
          isWeekDay: true,
        })}
      </div>
      <div>
        {formatDate([1713922083000, 1714008483000], {
          timeZone: 'America/New_York',
          lang,
          separator: '-',
          durationIndicator: '~',
          showDayOfWeek: true,
          showDate: false,
          isWeekDay: true,
        })}
      </div>
    </>
  );
};
```

## API

```ts
interface FormatDateOptions {
  /**
   * 时区
   */
  timeZone?: string;

  /**
   * 语言
   */
  lang?: 'zh' | 'en';

  /**
   * 中文环境下日期格式分隔符
   */
  separator?: string;

  /**
   * 时间范围指示符
   */
  durationIndicator?: string;

  /**
   * 是否显示日期
   */
  showDate?: boolean;

  /**
   * 是否显示星期几
   */
  showDayOfWeek?: boolean;

  /**
   * 是否显示秒
   */
  showSecond?: boolean;

  /**
   * 是否替换星期几为 `工作日`
   */
  isWeekDay?: boolean;
}
```
