import { describe, expect, jest, test } from '@jest/globals';
import { openAndReadTextFile } from '../src';

describe('open and read text file test', () => {
  test('success test', async () => {
    const mockFile = new File(['test'], 'mock.txt', { type: 'text/plain' });
    document.createElement = jest.fn(function () {
      return {
        type: 'file',
        accept: '.txt,.cpp,.py,.java',
        files: [mockFile],
        click: function () {
          this.onchange();
        },
      } as any;
    });

    const result = await openAndReadTextFile();

    expect(document.createElement).toHaveBeenCalledWith('input');
    expect(document.createElement).toHaveBeenCalledTimes(1);
    expect(result).toBe('test');
  });
  //未选择文件或文件类型不符合要求的用例
  test('not choose or wrong type file error test', async () => {
    document.createElement = function () {
      return {
        type: 'file',
        accept: '.txt,.cpp,.py,.java',
        files: null,
        click: function () {
          this.onchange();
        },
      } as any;
    };
    await expect(openAndReadTextFile()).rejects.toThrowError(
      '未选择文件或文件类型不符合要求！',
    );
  });
  //用户取消文件的用例
  test('cancel read file error test', async () => {
    const mockFile = new File(['test'], 'mock.txt', { type: 'text/plain' });
    document.createElement = function () {
      return {
        type: 'file',
        accept: '.txt,.cpp,.py,.java',
        files: [mockFile],
        click: function () {
          this.onabort();
        },
      } as any;
    };
    await expect(openAndReadTextFile()).rejects.toThrowError(
      '用户取消文件选择！',
    );
  });
  //用户读取文件的失败用例
  test('read file error test', async () => {
    const mockFile = new File(['test'], 'mock.txt', { type: 'text/plain' });
    document.createElement = function () {
      return {
        type: 'file',
        accept: '.txt,.cpp,.py,.java',
        files: [mockFile],
        click: function () {
          this.onchange();
        },
      } as any;
    };
    FileReader.prototype.readAsText = function () {
      this.onerror?.(new Error('File Reading error') as any);
    };
    await expect(openAndReadTextFile()).rejects.toThrowError(
      'File Reading error',
    );
  });
});
