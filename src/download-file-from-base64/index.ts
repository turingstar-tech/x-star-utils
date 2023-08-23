/**
 * 将 Base64 字符串转换为文件并下载
 * @param {string} base64String - Base64 字符串
 * @param {string} fileName - 要保存的文件名
 * 后端rpc设置的bytes类型，请求接收到base64格式的字符串，转成文件下载
 */
function downloadFileFromBase64(base64String: string, fileName: string) {
  // 将 Base64 字符串转换为字节数组
  const byteCharacters = atob(base64String);
  const byteArray = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i);
  }

  // 将字节数组转换为 blob 对象
  const blob = new Blob([byteArray]);

  // 创建 URL
  const url = URL.createObjectURL(blob);

  // 创建链接并模拟点击
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export default downloadFileFromBase64;
