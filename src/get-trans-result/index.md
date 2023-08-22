# getTransResult

中英文翻译函数

```
/**
 * 选择语言
 * @param lang 语言
 * @param zhText 中文字段
 * @param enText 英文字段
 * @returns string
 */
```

```jsx
import { useState } from 'react';
import { getTransResult } from 'x-star-utils';
export default () => {
  const [lang, setLang] = useState('zh');
  return (
    <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}>
      {getTransResult(lang, '中文', 'English')}
    </button>
  );
};
```
