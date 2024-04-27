/**
 * 将 UploadFile 转换为 Base64 编码的字符串
 *
 * @param file 上传的文件
 * @returns Base64 编码的字符串
 */
const convertUploadFileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const base64String = event?.target?.result;
      // 移除编码头部
      const base64 = String(base64String).replace(/^data:(.*;base64,)?/, '');
      resolve(base64);
    };
  });

export default convertUploadFileToBase64;
