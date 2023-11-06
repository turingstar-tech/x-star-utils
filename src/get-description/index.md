# getDescription

根据语言在文本后面加上冒号

```
/**
 * 选择语言
 * @param lang 语言
 * @param text 字段
 * @returns string
 */
```

```jsx
import { useState } from 'react';
import { getDescription } from 'x-star-utils';
export default () => {
  const [lang, setLang] = useState('zh');

  return (
    <div>
      <span>{getDescription(lang, '赛制')}</span>
      <span>{'OI赛制'}</span>
    </div>
  );
};
```
