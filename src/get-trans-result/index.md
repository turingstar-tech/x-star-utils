# getTransResult

```
/**
 * 根据语言选择文本
 *
 * @param lang 语言
 * @param zhText 中文文本
 * @param enText 英文文本
 * @returns 对应语言的文本
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
