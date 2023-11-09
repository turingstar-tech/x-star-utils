import { describe, expect, jest, test } from '@jest/globals';
import { downloadFileFromBase64 } from '../src';
describe('download file from base64 test', () => {
  test('success test', async () => {
    const base64String = 'SGVsbG8gd29ybGQ=';
    const fileName = 'test.txt';

    // 模拟 URL.createObjectURL 方法
    URL.createObjectURL = jest.fn(() => 'mock-url');

    // 创建模拟的 DOM 方法
    const mockLinkClick = jest.fn();
    document.createElement = jest.fn(
      () =>
        ({
          href: '',
          download: '',
          click: mockLinkClick,
        } as any),
    );
    document.body.appendChild = jest.fn() as any;
    document.body.removeChild = jest.fn() as any;

    // 执行被测试函数
    downloadFileFromBase64(base64String, fileName);

    // 验证 URL.createObjectURL 被调用
    expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));

    // 验证 document.createElement 被调用
    expect(document.createElement).toHaveBeenCalledTimes(1);
    expect(document.createElement).toHaveBeenCalledWith('a');

    // 验证模拟的 DOM 方法被调用
    expect(mockLinkClick).toHaveBeenCalledTimes(1);
    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
    expect(document.body.removeChild).toHaveBeenCalledTimes(1);
  });
});
