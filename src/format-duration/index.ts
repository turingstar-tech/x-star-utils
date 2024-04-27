/**
 * 格式化时间，将秒数转化为时分秒的格式 HH:MM:SS
 *
 * @param duration 秒数
 * @returns 时分秒字符串
 */
const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);
  const fix0 = (number: number) => (number >= 10 ? number : `0${number}`);
  return duration > 0
    ? `${fix0(hours)}:${fix0(minutes)}:${fix0(seconds)}`
    : `00:00:00`;
};

export default formatDuration;
