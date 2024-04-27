/**
 * 打开文件选择器，用户选择一个文本文件并读取其中的内容，然后返回一个 Promise 对象
 *
 * 当成功读取到文件内容时，Promise 对象将会 resolve 并返回文件内容
 *
 * 如果读取文件失败或用户取消选择文件，Promise 对象将会 reject 并返回错误信息
 *
 * @returns 文件内容或错误信息
 */
const openAndReadTextFile = () =>
  new Promise<string>((resolve, reject) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt,.cpp,.py,.java';

    // 选择文件后，读取文件并返回结果
    fileInput.onchange = () => {
      const file = fileInput.files ? fileInput.files[0] : null;
      const reader = new FileReader();
      reader.onerror = (error) => {
        reject(error); // 读取文件失败，返回错误信息
      };
      reader.onload = () => {
        const content = reader.result as string;
        resolve(content); // 成功读取文件，返回文件内容
      };

      if (file) {
        reader.readAsText(file);
      } else {
        reject(new Error('未选择文件或文件类型不符合要求！')); // 未选择文件或文件类型不符合要求，拒绝 Promise
      }
    };

    // 用户取消文件选择时，拒绝 Promise
    fileInput.onabort = () => {
      reject(new Error('用户取消文件选择！'));
    };

    // 打开文件选择器（不显示）
    fileInput.click();
  });

export default openAndReadTextFile;
