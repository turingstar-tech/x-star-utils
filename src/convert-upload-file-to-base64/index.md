# convertUploadFileToBase64

```
/**
 * 将 UploadFile 转换为 Base64 编码的字符串
 *
 * @param file 上传的文件
 * @returns Base64 编码的字符串
 */
```

```jsx
import { useState } from 'react';
import { convertUploadFileToBase64 } from 'x-star-utils';

export default () => {
  const [text, setText] = useState('');
  return (
    <>
      <div>{text}</div>
      <input
        type={'file'}
        onChange={async (e) => {
          const selectedFile = e.target.files[0];
          const base64 = await convertUploadFileToBase64(selectedFile);
          setText(base64);
        }}
      ></input>
    </>
  );
};
```
