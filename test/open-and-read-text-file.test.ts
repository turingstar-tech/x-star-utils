import { describe, expect, jest, test } from '@jest/globals';
import { openAndReadTextFile } from '../src';

describe('open and read text file test', () => {
  test('success test', async () => {
    const mockFile = new File(['test'], 'mock.txt', { type: 'text/plain' });
    const createElementMock = jest
      .spyOn(document, 'createElement')
      .mockImplementation(function () {
        return {
          type: 'file',
          accept: '.txt,.cpp,.py,.java',
          files: [mockFile],
          click: function () {
            this.onchange();
          },
        } as unknown as HTMLInputElement;
      });

    const result = await openAndReadTextFile();

    expect(createElementMock).toHaveBeenCalledWith('input');
    expect(createElementMock).toHaveBeenCalledTimes(1);
    expect(result).toBe('test');
    createElementMock.mockRestore();
  });
  //未选择文件或文件类型不符合要求的用例
  test('not choose or wrong type file error test', async () => {
    jest.spyOn(document, 'createElement').mockImplementation(function () {
      return {
        type: 'file',
        accept: '.txt,.cpp,.py,.java',
        files: null,
        click: function () {
          this.onchange();
        },
      } as unknown as HTMLInputElement;
    });
    await expect(openAndReadTextFile()).rejects.toThrowError(
      '未选择文件或文件类型不符合要求！',
    );
  });
  //用户取消文件的用例
  test('cancel read file error test', async () => {
    const mockFile = new File(['test'], 'mock.txt', { type: 'text/plain' });
    jest.spyOn(document, 'createElement').mockImplementation(function () {
      return {
        type: 'file',
        accept: '.txt,.cpp,.py,.java',
        files: [mockFile],
        click: function () {
          this.onabort();
        },
      } as unknown as HTMLInputElement;
    });
    await expect(openAndReadTextFile()).rejects.toThrowError(
      '用户取消文件选择！',
    );
  });
  //用户读取文件的失败用例
  test('read file error test', async () => {
    const mockFile = new File(['test'], 'mock.txt', { type: 'text/plain' });
    jest.spyOn(document, 'createElement').mockImplementation(function () {
      return {
        type: 'file',
        accept: '.txt,.cpp,.py,.java',
        files: [mockFile],
        click: function () {
          this.onchange();
        },
      } as unknown as HTMLInputElement;
    });
    jest
      .spyOn(FileReader.prototype, 'readAsText')
      .mockImplementation(function (this: FileReader) {
        this.onerror?.(new Error('File Reading error') as any);
      });
    await expect(openAndReadTextFile()).rejects.toThrowError(
      'File Reading error',
    );
  });
});
