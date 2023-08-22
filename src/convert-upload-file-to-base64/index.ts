/**
 * 将 UploadFile 转换为 Base64 编码的字符串
 * @param {File} file - 上传的文件
 * @returns {Promise<string>} Base64 编码的字符串
 */
function convertUploadFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const base64String = event?.target?.result;
      // 移除编码头部
      const base64 = String(base64String).replace(/^data:(.*;base64,)?/, '');
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}
export default convertUploadFileToBase64;
