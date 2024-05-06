# awsMultipartUpload

```
/**
 * AWS 分片上传文件并返回进度
 *
 * @param options 上传选项
 * @returns 上传结果
 */
```

```jsx
import { awsMultipartUpload } from 'x-star-utils';

export default () => {
  return (
    <>
      <input
        type="file"
        onChange={async (e) => {
          const selectedFile = e.target.files[0];
          await awsMultipartUpload({
            clientConfig: {
              region: 'region',
              accessKeyId: 'access-key-id',
              secretAccessKey: 'secret-access-key',
              sessionToken: 'session-token',
            },
            bucketName: 'bucket-name',
            key: selectedFile.name,
            file: selectedFile,
          });
        }}
      />
    </>
  );
};
```
