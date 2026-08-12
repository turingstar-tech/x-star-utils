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

export interface AWSMultipartUploadOptions {
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
 * 将Blob片段转换为Uint8Array以避免流处理错误
 * @param blob 文件片段
 * @returns Uint8Array格式的文件内容
 */
const blobToUint8Array = async (blob: Blob): Promise<Uint8Array> => {
  if (typeof blob.arrayBuffer === 'function') {
    return new Uint8Array(await blob.arrayBuffer());
  }

  // 兼容 jsdom 等缺少 Blob.arrayBuffer 的环境
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(blob);
  });
};

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
}: AWSMultipartUploadOptions) => {
  let uploadId;
  const s3Client = new S3Client({
    ...clientConfig,
    // 添加配置禁用校验和计算，解决 readableStream.getReader is not a function 错误
    requestChecksumCalculation: 'WHEN_REQUIRED',
  });
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
      const fileSlice = file.slice(start, end);

      // 将文件片段转换为Uint8Array以避免流处理错误
      const fileContent = await blobToUint8Array(fileSlice);

      uploadPromises.push(
        s3Client
          .send(
            new UploadPartCommand({
              Bucket: bucket,
              Key: key,
              UploadId: uploadId,
              Body: fileContent,
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
    console.error(error);
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
