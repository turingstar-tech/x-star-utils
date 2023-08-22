# downloadTextFile

前端将字符串以文件形式导出即下载文件

```
/**
 * 前端将字符串以文件形式导出
 * @param content 文件内容字符串
 * @param filename 文件名
 */
```

```jsx
import { downloadTextFile } from 'x-star-utils';
export default () => {
  const download = () => {
    downloadTextFile(
      'welcome to xinyoudui & x-camp\nhttps://www.xinyoudui.com/',
      `welcome.txt`,
    );
  };
  return <button onClick={() => download()}>{'下载文件'}</button>;
};
```
