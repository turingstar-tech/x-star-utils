import type {
  CreateMultipartUploadCommandInput,
  S3ClientConfig,
} from '@aws-sdk/client-s3';
import {
  AbortMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  S3Client,
  UploadPartCommand,
} from '@aws-sdk/client-s3';

interface AwsMultipartUploadOptions {
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

/**
 * AWS 分片上传文件并返回进度
 *
 * @param options 上传选项
 * @returns 上传结果
 */
const awsMultipartUpload = async ({
  clientConfig,
  createConfig,
  bucket,
  key,
  file,
  partSize = 5,
  onProgress,
}: AwsMultipartUploadOptions) => {
  let uploadId;
  const s3Client = new S3Client(clientConfig);
  try {
    const multipartUpload = await s3Client.send(
      new CreateMultipartUploadCommand({
        ...createConfig,
        Bucket: bucket,
        Key: key,
      }),
    );
    uploadId = multipartUpload.UploadId;
    const uploadPromises = [];
    const size = partSize * 1024 * 1024;
    // 计算总共要分为几段
    const partNumber = Math.ceil(file.size / size);
    // 上传了多少段
    let uploadedParts = 0;
    // 上传每个段
    for (let i = 0; i < partNumber; i++) {
      const start = i * size;
      const end = Math.min(file.size, start + size);
      uploadPromises.push(
        s3Client
          .send(
            new UploadPartCommand({
              Bucket: bucket,
              Key: key,
              UploadId: uploadId,
              Body: file.slice(start, end),
              PartNumber: i + 1,
            }),
          )
          // eslint-disable-next-line @typescript-eslint/no-loop-func
          .then((d) => {
            uploadedParts++;
            const progress = (uploadedParts / partNumber) * 100;
            onProgress?.(progress); // 调用进度更新回调函数
            return d;
          }),
      );
    }
    const uploadResults = await Promise.all(uploadPromises);
    const res = await s3Client.send(
      new CompleteMultipartUploadCommand({
        Bucket: bucket,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: uploadResults.map(({ ETag }, i) => ({
            ETag,
            PartNumber: i + 1,
          })),
        },
      }),
    );
    return res;
  } catch (error) {
    // 出现错误终止上传
    if (uploadId) {
      await s3Client.send(
        new AbortMultipartUploadCommand({
          Bucket: bucket,
          Key: key,
          UploadId: uploadId,
        }),
      );
    }
  }
};

export default awsMultipartUpload;
