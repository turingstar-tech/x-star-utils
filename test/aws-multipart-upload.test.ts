import { S3Client } from '@aws-sdk/client-s3';
import { describe, expect, jest, test } from '@jest/globals';
import awsMultipartUpload from '../src/aws-multipart-upload';

jest.mock('@aws-sdk/client-s3');

describe('aws multipart upload test', () => {
  test('success test', async () => {
    const mockS3Client = {
      send: jest.fn<() => Promise<any>>(),
    };
    (S3Client as any).mockImplementation(() => mockS3Client);
    const mockFile = new Blob(['a'.repeat(1024 * 1024 * 10)]); // 10MB 文件
    const mockParams = {
      clientConfig: {
        region: 'us-east-1',
        accessKeyId: 'fakeAccessKeyId',
        secretAccessKey: 'fakeSecretAccessKey',
        sessionToken: 'fakeSessionToken',
      },
      bucketName: 'test-bucket',
      key: 'test-file.txt',
      file: mockFile,
      onProgress: jest.fn(),
    };
    const mockUploadId = 'mockUploadId';
    const mockETag = 'mockETag';
    // 模拟 AWS S3 CreateCommand 响应
    mockS3Client.send.mockResolvedValueOnce({
      UploadId: mockUploadId,
    });
    // 模拟 AWS S3 UploadPartCommand 响应
    mockS3Client.send.mockResolvedValue({ ETag: mockETag });

    // 模拟 AWS S3 CompleteMultipartUploadCommand 响应
    mockS3Client.send.mockResolvedValueOnce({
      Key: 'test-file.txt',
      Bucket: 'test-bucket',
    });
    const result = await awsMultipartUpload(mockParams);
    expect(result).toEqual({
      ETag: mockETag,
    });
    expect(mockS3Client.send).toHaveBeenCalledTimes(4);
    expect(mockParams.onProgress).toHaveBeenCalled();
  });

  test('error test', async () => {
    const mockS3Client = {
      send: jest.fn<() => Promise<any>>(),
    };
    (S3Client as any).mockImplementation(() => mockS3Client);
    const mockFile = new Blob(['error case data'], { type: 'text/plain' });
    const mockParams = {
      clientConfig: {
        region: 'us-east-1',
        accessKeyId: 'fakeAccessKeyId',
        secretAccessKey: 'fakeSecretAccessKey',
        sessionToken: 'fakeSessionToken',
      },
      bucketName: 'test-bucket',
      key: 'test-file.txt',
      file: mockFile,
      onProgress: jest.fn(),
    };
    let mockUploadId = 'mockUploadId';
    // 模拟 AWS S3 CreateCommand 响应
    mockS3Client.send.mockResolvedValueOnce({
      UploadId: mockUploadId,
    });
    // 模拟抛出错误
    mockS3Client.send.mockRejectedValueOnce(new Error('Simulated failure'));

    expect(await awsMultipartUpload(mockParams)).toBeUndefined();
    expect(mockS3Client.send).toHaveBeenCalledTimes(3);
    // 模拟 uploadId 为空的情况
    mockUploadId = '';
    expect(await awsMultipartUpload(mockParams)).toBeUndefined();
    expect(mockS3Client.send).toHaveBeenCalledTimes(4);
  });
});
