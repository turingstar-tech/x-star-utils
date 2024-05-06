# awsMultipartUpload

```
/**
 * aws分片上传文件并返回进度
 * @param param0
 * @returns
 */
```

```jsx
import { awsMultipartUpload } from 'x-star-utils';

export default () => {
  return (
    <>
      <input
        type={'file'}
        onChange={async (e) => {
          const selectedFile = e.target.files[0];
          await awsMultipartUpload({
            clientConfig: {
              region: 'cn-northwest-1',
              accessKeyId: '',
              secretAccessKey: '',
              sessionToken: '',
            },
            bucketName: 'x',
            key: selectedFile.name,
            file: selectedFile,
          });
        }}
      />
    </>
  );
};
```
