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
      bucket: 'test-bucket',
      key: 'test-file.txt',
      file: mockFile,
      onProgress: jest.fn(),
    };
    const mockUploadId = 'mockUploadId';
    const mockETag = 'mockETag';
    // CreateMultipartUpload
    mockS3Client.send.mockResolvedValueOnce({
      UploadId: mockUploadId,
    });
    // UploadPart（两段）+ CompleteMultipartUpload
    mockS3Client.send.mockResolvedValue({ ETag: mockETag });

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
      bucket: 'test-bucket',
      key: 'test-file.txt',
      file: mockFile,
      onProgress: jest.fn(),
    };

    // Create 成功 -> UploadPart 失败 -> Abort
    mockS3Client.send
      .mockResolvedValueOnce({ UploadId: 'mockUploadId' })
      .mockRejectedValueOnce(new Error('Simulated failure'))
      .mockResolvedValueOnce({});

    expect(await awsMultipartUpload(mockParams)).toBeUndefined();
    expect(mockS3Client.send).toHaveBeenCalledTimes(3);

    // Create 即失败（无 uploadId，不走 Abort）
    mockS3Client.send.mockRejectedValueOnce(new Error('Simulated failure'));
    expect(await awsMultipartUpload(mockParams)).toBeUndefined();
    expect(mockS3Client.send).toHaveBeenCalledTimes(4);
  });

  test('uses blob.arrayBuffer when available', async () => {
    const mockS3Client = {
      send: jest.fn<() => Promise<any>>(),
    };
    (S3Client as any).mockImplementation(() => mockS3Client);
    mockS3Client.send.mockResolvedValue({ ETag: 'etag', UploadId: 'id' });

    const arrayBufferMock = jest.fn(
      async () => Uint8Array.from([104, 101, 108, 108, 111]).buffer,
    );
    const descriptor = Object.getOwnPropertyDescriptor(
      Blob.prototype,
      'arrayBuffer',
    );
    Object.defineProperty(Blob.prototype, 'arrayBuffer', {
      configurable: true,
      writable: true,
      value: arrayBufferMock,
    });

    try {
      const result = await awsMultipartUpload({
        clientConfig: { region: 'us-east-1' },
        bucket: 'test-bucket',
        key: 'test-file.txt',
        file: new Blob(['hello']),
      });
      expect(arrayBufferMock).toHaveBeenCalled();
      expect(result).toEqual({ ETag: 'etag', UploadId: 'id' });
    } finally {
      if (descriptor) {
        Object.defineProperty(Blob.prototype, 'arrayBuffer', descriptor);
      } else {
        delete (
          Blob.prototype as { arrayBuffer?: typeof Blob.prototype.arrayBuffer }
        ).arrayBuffer;
      }
    }
  });

  test('rejects when FileReader fails', async () => {
    const mockS3Client = {
      send: jest.fn<() => Promise<any>>(),
    };
    (S3Client as any).mockImplementation(() => mockS3Client);
    mockS3Client.send
      .mockResolvedValueOnce({ UploadId: 'id' })
      .mockResolvedValueOnce({});

    const descriptor = Object.getOwnPropertyDescriptor(
      Blob.prototype,
      'arrayBuffer',
    );
    // 确保走 FileReader 分支
    delete (
      Blob.prototype as { arrayBuffer?: typeof Blob.prototype.arrayBuffer }
    ).arrayBuffer;

    const OriginalFileReader = global.FileReader;
    class MockFileReader {
      onload: ((ev: ProgressEvent<FileReader>) => void) | null = null;
      onerror: ((ev: ProgressEvent<FileReader>) => void) | null = null;
      result: ArrayBuffer | null = null;
      error: DOMException | null = null;
      readAsArrayBuffer() {
        this.error = new DOMException('read failed');
        this.onerror?.({} as ProgressEvent<FileReader>);
      }
    }
    global.FileReader = MockFileReader as unknown as typeof FileReader;

    try {
      expect(
        await awsMultipartUpload({
          clientConfig: { region: 'us-east-1' },
          bucket: 'test-bucket',
          key: 'test-file.txt',
          file: new Blob(['hello']),
        }),
      ).toBeUndefined();
      expect(mockS3Client.send).toHaveBeenCalledTimes(2);
    } finally {
      global.FileReader = OriginalFileReader;
      if (descriptor) {
        Object.defineProperty(Blob.prototype, 'arrayBuffer', descriptor);
      }
    }
  });
});
