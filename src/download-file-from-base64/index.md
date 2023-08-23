# downloadFileFromBase64

将 Base64 字符串转换为文件并下载

```
/**
 * 将 Base64 字符串转换为文件并下载
 * @param {string} base64String - Base64 字符串
 * @param {string} fileName - 要保存的文件名
 * 后端rpc设置的bytes类型，请求接收到base64格式的字符串，转成文件下载
 */
```

```jsx
import { useState } from 'react';
import {
  convertUploadFileToBase64,
  downloadFileFromBase64,
} from 'x-star-utils';
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
      />
      <button onClick={() => downloadFileFromBase64(text)}>{'文件下载'}</button>
    </>
  );
};
```
