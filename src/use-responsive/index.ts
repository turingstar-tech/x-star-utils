import { useEffect, useState } from 'react';

const gridMap = new Map([
  ['xs', '(max-width: 575px)'],
  ['sm', '(min-width: 576px)'],
  ['md', '(min-width: 768px)'],
  ['lg', '(min-width: 992px)'],
  ['xl', '(min-width: 1200px)'],
  ['xxl', '(min-width: 1600px)'],
  ['mb', '(max-width: 575px)'],
  ['iPad', '(min-width: 576px) and (max-width: 991px)'],
  ['pc', '(min-width: 992px)'],
]);

/**
 * 判断媒体查询是否匹配
 *
 * 可以使用某些字符串匹配屏幕宽度
 *
 * | 字符串 |        屏幕限制        |
 * | :----: | :--------------------: |
 * |   xs   |      宽度 < 576px      |
 * |   sm   |     宽度 >= 576px      |
 * |   md   |     宽度 >= 768px      |
 * |   lg   |     宽度 >= 992px      |
 * |   xl   |     宽度 >= 1200px     |
 * |  xxl   |     宽度 >= 1600px     |
 * |   mb   |     宽度 <= 575px      |
 * |  iPad  | 576px <= 宽度 <= 991px |
 * |   pc   |     宽度 >= 992px      |
 *
 * @param query 查询字符串
 * @returns 是否匹配
 */
const useResponsive = (query: string) => {
  const getMatches = () =>
    window.matchMedia(gridMap.get(query) ?? query).matches;

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const handler = () => requestAnimationFrame(() => setMatches(getMatches));

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return matches;
};

export default useResponsive;
