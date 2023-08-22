/**
 * 前端将字符串以文件形式导出
 * @param content 文件内容字符串
 * @param filename 文件名
 */
const downloadTextFile = (content: BlobPart, filename: string) => {
  const eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  const blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
};
export default downloadTextFile;
