/**
 * 将 Base64 字符串转换为文件并下载
 *
 * 后端 RPC 设置的 bytes 类型，请求接收到 Base64 格式的字符串，转成文件下载
 *
 * @param base64String Base64 字符串
 * @param fileName 要保存的文件名
 */
const downloadFileFromBase64 = (base64String: string, fileName: string) => {
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
};

export default downloadFileFromBase64;
