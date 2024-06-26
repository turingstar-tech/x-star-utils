import { describe, expect, jest, test } from '@jest/globals';
import downloadTextFile from '../src/download-text-file';

describe('download text file test', () => {
  test('success test', async () => {
    const mockContent = 'Hello, World!';
    const mockFilename = 'test.txt';
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
          style: { display: 'none' },
        } as any),
    );
    document.body.appendChild = jest.fn() as any;
    document.body.removeChild = jest.fn() as any;
    downloadTextFile(mockContent, mockFilename);
    // 验证 document.createElement 被调用
    expect(document.createElement).toHaveBeenCalledTimes(1);
    expect(document.createElement).toHaveBeenCalledWith('a');
    // 验证 URL.createObjectURL 被调用
    expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    // 验证模拟的 DOM 方法被调用
    expect(mockLinkClick).toHaveBeenCalledTimes(1);
    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
    expect(document.body.removeChild).toHaveBeenCalledTimes(1);
  });
});
