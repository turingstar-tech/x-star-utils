# getDescription

```
/**
 * 根据语言在文本后面加上冒号
 *
 * @param lang 语言
 * @param text 文本
 * @returns 带冒号的文本
 */
```

```jsx
import { getDescription } from 'x-star-utils';

export default () => {
  return (
    <div>
      <div>
        <span>{getDescription('zh', '赛制')}</span>
        <span>{'OI赛制'}</span>
      </div>
      <div>
        <span>{getDescription('en', 'Format')}</span>
        <span>{'OI'}</span>
      </div>
    </div>
  );
};
```
