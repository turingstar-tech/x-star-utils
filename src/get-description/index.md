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
