import {
  AbortMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  S3Client,
  UploadPartCommand,
} from '@aws-sdk/client-s3';
interface AwsMultipartUploadParams {
  clientConfig: {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
  }; //client 相关配置
  bucketName: string; // 后端给的桶名
  key: string; //一般是文件名
  file: File | Blob;
  partSize?: number; // 最小5MB 分片大小 默认为5MB
  onProgress?: (progress: number) => void; //上传进度回调函数
}
/**
 * aws分片上传文件并返回进度
 * @param param0
 * @returns
 */
const awsMultipartUpload = async ({
  clientConfig,
  bucketName,
  key,
  file,
  partSize = 5,
  onProgress,
}: AwsMultipartUploadParams) => {
  let uploadId;
  const s3Client = new S3Client({
    region: clientConfig.region,
    credentials: {
      accessKeyId: clientConfig.accessKeyId,
      secretAccessKey: clientConfig.secretAccessKey,
      sessionToken: clientConfig.sessionToken,
    },
  });
  try {
    const multipartUpload = await s3Client.send(
      new CreateMultipartUploadCommand({
        Bucket: bucketName,
        Key: key,
      }),
    );
    uploadId = multipartUpload.UploadId;
    const uploadPromises = [];
    const size = partSize * 1024 * 1024;
    //计算总共要分为几段
    const partNumber = Math.ceil(file.size / size);
    //上传了多少段
    let uploadedParts = 0;
    // 上传每个part
    for (let i = 0; i < partNumber; i++) {
      const start = i * size;
      const end = Math.min(file.size, start + size);
      uploadPromises.push(
        s3Client
          .send(
            new UploadPartCommand({
              Bucket: bucketName,
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
        Bucket: bucketName,
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
    //出现错误终止上传
    if (uploadId) {
      const abortCommand = new AbortMultipartUploadCommand({
        Bucket: bucketName,
        Key: key,
        UploadId: uploadId,
      });
      await s3Client.send(abortCommand);
    }
  }
};
export default awsMultipartUpload;
