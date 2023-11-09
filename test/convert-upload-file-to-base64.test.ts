import { describe, expect, test } from '@jest/globals';
import { convertUploadFileToBase64 } from '../src';
describe('convert-upload-file-to-base64 test', () => {
  test('success test', async () => {
    // 创建一个虚拟的 File 对象
    const file = new File(['Test content'], 'test.txt', { type: 'text/plain' });
    // 调用 convertUploadFileToBase64 函数并等待 Promise 结果
    const base64String = await convertUploadFileToBase64(file);

    // 验证返回的字符串是否是 Base64 编码的
    expect(base64String).toMatch(/^([A-Za-z0-9+/=])+$/);
  });

  test('error test', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    FileReader.prototype.readAsDataURL = function () {
      this.onerror?.(new Error('File Reading error'));
    };
    await expect(convertUploadFileToBase64(file)).rejects.toThrowError(
      'File Reading error',
    );
  });
});
