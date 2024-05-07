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
          const selectedFile = e.target.files![0];
          await awsMultipartUpload({
            clientConfig: {
              region: 'region',
              credentials: {
                accessKeyId: 'access-key-id',
                secretAccessKey: 'secret-access-key',
                sessionToken: 'session-token',
              },
            },
            bucket: 'bucket-name',
            key: selectedFile.name,
            file: selectedFile,
          });
        }}
      />
    </>
  );
};
```

## API

```ts
interface AWSMultipartUploadOptions {
  /**
   * Client 配置
   */
  clientConfig: S3ClientConfig;

  /**
   * 创建上传配置
   */
  createConfig?: Omit<CreateMultipartUploadCommandInput, 'Bucket' | 'Key'>;

  /**
   * 后端给的桶名
   */
  bucket: string;

  /**
   * 文件标识，一般是文件名
   */
  key: string;

  /**
   * 文件
   */
  file: File | Blob;

  /**
   * 分段大小，最小 5MB，默认 5MB
   */
  partSize?: number;

  /**
   * 上传进度回调函数
   */
  onProgress?: (progress: number) => void;
}
```
