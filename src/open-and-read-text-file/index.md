# openAndReadTextFile

打开文件选择器，用户选择一个文本文件并读取其中的内容，然后返回一个 Promise 对象。

当成功读取到文件内容时，Promise 对象将会 resolved 并返回文件内容，

如果读取文件失败或用户取消选择文件，Promise 对象将会 rejected 并返回错误信息。

```
/**
 * @return {Promise<string>} - 一个 Promise 对象，用于返回读取到的文件内容或错误信息。
 */
```

```jsx
import { useState } from 'react';
import { openAndReadTextFile } from 'x-star-utils';
export default () => {
  const [text, setText] = useState('');
  return (
    <div>
      <div>{text}</div>
      <button
        onClick={async () => {
          const code = await openAndReadTextFile();
          setText(code);
        }}
      >
        {'读取文件'}
      </button>
    </div>
  );
};
```
